import Target
    from "./Target.js";
import HealthPowerBarBuilding
    from "../tools/HealthPowerBarBuilding.mjs";

export default class Building extends Target {
    constructor(scene, x, y, key, direction) {
        super(scene, x, y, key, direction);
        //缩放翻转
        let scale = 0.6;
        if (this.direction === 'left') {
            this.setScale(-1 * scale, scale);
            this.setOffset(256, 0)
        } else {
            this.setScale(scale, scale);
        }
        //血条
        this.bar = new HealthPowerBarBuilding(scene, x, y, this.displayWidth, this.default.battle.health, this.default.battle.power);
        //建筑死亡淡出
        this.fade = scene.plugins.get('rexfadeplugin');
        //落地弹跳值
        this.setBounce(0);
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
                        distance = Phaser.Math.Distance.Between(this.body.x, 0, this.attackTarget.body.x, 0);
                    } else {
                        distance = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.attackTarget.x, this.attackTarget.y);
                    }
                    if (distance <= this.current.battle.attack.range) {//在攻击范围内
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
            }
        }
    }
}