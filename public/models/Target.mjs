import Loader
    from "../modules/Loader.mjs";

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
        //用来取消单位之间的碰撞
        this.collider = null;
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
    }

    tick(enemy, delta) {
        this.bar.draw(this.x, this.y);
        this.attackTime += delta;
    }

    attack() {
        let attackTarget = this.attackTarget;
        if (this.attackTime >= this.current.battle.attack.interval) {//可以攻击
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
                if (attackTarget.current.description.type === 'building') {//建筑死亡
                    //淡出
                    attackTarget.fade.fadeOutDestroy(attackTarget, 1500);
                    attackTarget.bar.destroy();
                } else {//非建筑死亡
                    //取消死亡单位碰撞
                    attackTarget.collider.destroy();
                    //取消死亡单位移动
                    attackTarget.setVelocityX(0);
                    setTimeout(function () {
                        attackTarget.destroy();
                    }, 1500);
                }
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
            if (enemy[i].current.battle.health > 0) {//目标活着
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

    destroy() {
        super.destroy();
        this.bar.destroy();
    }
}