import HealthPowerBar
    from "../tools/HealthPowerBar.mjs";
import Loader
    from "../objects/Loader.mjs";

export default class Unit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, direction) {
        super(scene, x, x, key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //获取地面
        this.ground = scene.ground;
        //设置位置
        this.setPosition(x, y);
        //通过key得到默认数据
        this.default = Loader.getDefault(key);
        if (this.default === undefined) {
            throw ['找不到Loader.getDefault(key)', this]
        }
        //复制一遍数据当作实例的当前值
        this.current = JSON.parse(JSON.stringify(this.default));
        //初始能量
        this.current.battle.power = 0;
        //方向
        this.direction = direction
        //生命条 能量条
        this.bar = new HealthPowerBar(scene, x, y, this.displayWidth / 2, this.default.battle.health, this.default.battle.power);
        //负值表示翻转, 小数表示缩小
        let scale = 0.5;
        if (this.direction === 'left') {
            this.setScale(scale, scale);
        } else {
            this.setScale(-1 * scale, scale);
            this.setOffset(128 * scale * 2, 0)
        }
        //落地弹跳值
        this.setBounce(0.4);
        //不会掉出地图
        this.setCollideWorldBounds(true);
        //刷新
        this.refreshBody();
        //与地面的碰撞
        scene.physics.add.collider(this, scene.ground);
        //用来取消单位之间的碰撞
        this.collider = null;
        //预处理攻击方式
        switch (this.current.battle.attack.projectile) {
            case "shake":{
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

        if (this.current.battle.health > 0) {//自己没死
            if (this.attackTarget !== null) {//有攻击目标
                if (this.attackTarget.current.battle.health > 0) {//目标活着
                    let distance = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.attackTarget.body.x, this.attackTarget.body.y);
                    if (distance <= this.current.battle.attack.range) {//在攻击范围内
                        //停止移动
                        this.setVelocityX(0);
                        //攻击
                        this.attack();
                    } else {//打不着
                        this.attackTarget = null;
                    }
                } else {//目标是死人
                    this.attackTarget = null;
                }
            } else {//没有攻击目标
                this.attackTarget = this.getAttackTarget(enemy);
                if (this.attackTarget === null) {//找不到攻击目标
                    //开始移动
                    this.setVelocityX((this.direction === 'left' ? 1 : -1) * this.current.move.speed);
                }
            }
        } else {//自己是死人 播放死亡旋转
            if (this.angle < 90) {
                this.angle += 2;
            }
        }
    }

    attack() {
        if (this.attackTime >= this.current.battle.attack.interval) {//可以攻击
            //伤害计算
            let damage;
            if (this.current.battle.armor.shield > 0) {//圣盾
                damage = 1;
            } else {
                damage = this.attackTarget.current.battle.attack.atk - this.current.battle.armor.reduce;//护甲
                if (damage <= 0) damage = 1;
            }
            //攻击动画
            switch (this.current.battle.attack.projectile) {
                case "shake":{
                    this.shake.shake(100, 10);
                    break;
                }
                default: {

                }
            }
            //扣血
            if (damage > this.attackTarget.current.battle.health) {//这一下会把目标打死
                this.attackTarget.current.battle.health = 0;
                //取消死亡单位碰撞
                this.attackTarget.collider.destroy();
                //取消死亡单位移动
                this.attackTarget.setVelocityX(0);
                let t = this.attackTarget;
                setTimeout(function () {
                    t.destroy();
                }, 1500);
            } else {
                this.attackTarget.current.battle.health -= damage;
            }
            this.attackTarget.bar.setHealth(this.attackTarget.current.battle.health);

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
                if (this.current.battle.attack.range > Phaser.Math.Distance.Between(this.body.x, this.body.y, enemy[i].body.x, enemy[i].body.y)) {//可以攻击到
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
                return Phaser.Math.Distance.Between(t.body.x, t.body.y, a.body.x, a.body.y) - Phaser.Math.Distance.Between(t.body.x, t.body.y, b.body.x, b.body.y)
            });
            return attackAbleList[0];
        }
    }

    destroy() {
        super.destroy();
        this.bar.destroy();
    }
}