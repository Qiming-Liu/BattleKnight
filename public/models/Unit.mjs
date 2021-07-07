import Target
    from "./Target.mjs";
import UnitHPBar
    from "../modules/UnitHPBar.mjs";

export default class Unit extends Target {
    constructor(scene, x, y, key, level, direction) {
        super(scene, x, y, key, level, direction);
        //缩放翻转
        let scale = 0.45 + 0.05 * level;
        if (this.direction === 'left') {
            this.setScale(scale, scale);
        } else {
            this.setScale(-1 * scale, scale);
            this.setOffset(128, 0)
        }
        //血条
        this.bar = new UnitHPBar(scene, x, y, this.displayWidth, this.default.battle.health, this.default.battle.power);
        //落地弹跳值
        this.setBounce(0.4);
        //刷新
        this.refreshBody();
    }

    tick(enemy, delta) {
        super.tick(enemy, delta);

        if (this.current.battle.health > 0) {//自己没死
            if (this.attackTarget !== null) {//有攻击目标
                if (this.attackTarget.current.battle.health > 0) {//目标活着
                    let distance;
                    if (this.attackTarget.current.description.type === 'building') {//如果目标是建筑, 不计算高度
                        distance = Phaser.Math.Distance.Between(this.body.x, 0, this.attackTarget.x, 0);
                    } else {
                        distance = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.attackTarget.body.x, this.attackTarget.body.y);
                    }
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
            try {
                this.setVelocityX(0);
            } catch (e) {
            }
            if (this.angle < 90 && this.angle > -90) {
                this.setOrigin(0.5, 1);
                this.angle += (this.direction === 'left' ? -1 : 1) * 2;
            }
        }
    }
}