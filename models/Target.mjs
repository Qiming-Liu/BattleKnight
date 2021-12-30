import Loader from "../modules/Loader.mjs";

export default class Target extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, level, direction) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //获取地面
        this.ground = scene.ground;
        //设置位置
        this.setPosition(x, y);
        //通过key得到默认数据
        this.default = Loader.getDefault(key, level);
        if (this.default === undefined) {
            throw ['找不到Loader.getDefault(key)', key]
        }
        //复制一遍数据当作实例的当前值
        this.current = JSON.parse(JSON.stringify(this.default));
        //初始能量
        this.current.battle.power = 0;
        //方向
        this.direction = direction
        //不会掉出地图
        this.setCollideWorldBounds(true);
        //与地面的碰撞
        scene.physics.add.collider(this, scene.ground);
        //预处理攻击方式
        switch (this.current.battle.attack.projectile) {
            case "shake": {
                this.shake = scene.plugins.get('rexshakepositionplugin').add(this);
                break;
            }
            default: {

            }
        }
        this.attackTarget = null;
        this.attackTime = this.current.battle.attack.interval;
        this.id = window.targetID++;
        this.skills = [];
        for (let i = 0; i < this.default.skills.length; i++) {
            this.skills.push(this.default.skills[i])
        }
    }

    tick(enemy, delta) {
        this.bar.draw(this.x, this.y);
        this.attackTime += delta;

        //tick skill
        for (let i = 0; i < this.skills.length; i++) {
            this.skills[i].tick(this, delta);
        }
    }

    attack() {
        let attackTarget = this.attackTarget;
        if (this.attackTime >= this.current.battle.attack.interval) {//可以攻击
            //触发攻击的技能
            for (let i = 0; i < this.skills.length; i++) {
                this.skills[i].attack(this);
            }
            //触发受到攻击的技能
            for (let i = 0; i < this.attackTarget.skills.length; i++) {
                this.attackTarget.skills[i].beAttacked(this);
            }
            //伤害计算
            let damage;
            if (attackTarget.current.battle.armor.shield > 0) {//圣盾
                damage = 1;
            } else {
                damage = this.current.battle.attack.atk - attackTarget.current.battle.armor.reduce;//护甲
                if (damage <= 0) damage = 1;
            }
            //攻击动画
            switch (this.current.battle.attack.projectile) {
                case "shake": {
                    this.shake.shake(100, 10);
                    break;
                }
                default: {

                }
            }
            //扣血
            attackTarget.current.battle.health -= damage;
            if (attackTarget.current.battle.health <= 0) {//目标死亡
                attackTarget.current.battle.health = 0;
                window.io.letDie([attackTarget.id]);
            }

            attackTarget.bar.setHealth(attackTarget.current.battle.health);

            //加能量
            this.current.battle.power += damage;
            if (this.current.battle.power > this.default.battle.power) {
                this.current.battle.power = this.default.battle.power;
                //触发能量技能
            }
            this.bar.setPower(this.current.battle.power);

            //攻击冷却
            this.attackTime = 0;
        }
    }

    getAttackTarget(enemy) {
        let attackAbleList = [];
        for (let i = 0; i < enemy.length; i++) {
            if (enemy[i].current.battle.health > 0 && enemy[i].scene !== undefined) {//目标活着
                let distance;
                if (enemy[i].current.description.type === 'building') {//如果目标是建筑, 不计算高度
                    distance = Phaser.Math.Distance.Between(this.body.x, 0, enemy[i].body.x, 0);
                } else {
                    distance = Phaser.Math.Distance.Between(this.body.x, this.body.y, enemy[i].body.x, enemy[i].body.y);
                }
                if (distance <= this.current.battle.attack.range) {//在攻击范围内
                    //加入可攻击列表
                    attackAbleList.push(enemy[i]);
                }
            }
        }
        if (attackAbleList.length === 0) {
            return null;
        } else if (attackAbleList.length === 1) {
            return attackAbleList[0];
        } else {
            let t = this;
            attackAbleList.sort(function (a, b) {
                return Phaser.Math.Distance.Between(t.body.x, t.body.y, a.body.x, a.body.y) - Phaser.Math.Distance.Between(t.body.x, t.body.y, b.body.x, b.body.y);
            });
            return attackAbleList[0];
        }
    }

    letDie() {
        this.bar.destroy();
        if (this.current.description.type === 'building') {//建筑死亡
            //淡出
            this.fade.fadeOutDestroy(this, 1500);

            //游戏结束
            if (this.current.description.base) {//是基地
                window.scene.started = false;
                window.scene.add.text(game.config.width / 2 - 64 * 5.5, game.config.height / 2 - 64, 'GAME OVER', {
                    fontSize: '128px',
                    fill: '#fff'
                });
            }
        } else {//非建筑死亡
            let t = this;
            setTimeout(function () {
                t.destroy();
            }, 1500);
            //取消死亡单位移动
            this.setVelocityX(0);
        }
    }

    getData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            attackTime: this.attackTime,
            current: JSON.parse(JSON.stringify(this.current))
        };
    }

    setData(target) {
        if (this.current.battle.health > 0 && this.scene !== undefined) {
            this.setPosition(target.x, target.y);
            this.attackTime = target.attackTime;
            this.current = target.current;
        }
    }

    destroy() {
        super.destroy();
        window.scene[this.direction].UnitsFactory.UnitsList = window.scene[this.direction].UnitsFactory.UnitsList.filter(target => target.scene !== undefined);
    }

    static getTargetByID(id) {
        if (window.scene.left.Base.id === id) {
            return window.scene.left.Base;
        } else if (window.scene.right.Base.id === id) {
            return window.scene.right.Base;
        }
        for (let i = 0; i < window.scene.left.UnitsFactory.UnitsList.length; i++) {
            if (window.scene.left.UnitsFactory.UnitsList[i].id === id) {
                return window.scene.left.UnitsFactory.UnitsList[i]
            }
        }
        for (let i = 0; i < window.scene.right.UnitsFactory.UnitsList.length; i++) {
            if (window.scene.right.UnitsFactory.UnitsList[i].id === id) {
                return window.scene.right.UnitsFactory.UnitsList[i]
            }
        }
        return null;
    }
}