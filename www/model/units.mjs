import HealthPowerBar
    from "../tools/HealthPowerBar.mjs";

import human01
    from "../units/human/01.mjs"
import Loader
    from "../units/Loader.mjs";

export default class units extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, direction) {
        super(scene, x, x, key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //设置单位的位置
        this.setPosition(x, y);
        //通过key得到此单位的默认数据
        this.default = Loader.getDefault(key);
        if (this.default === undefined) {
            throw '找不到此单词的数据'
        }
        //复制一遍数据当作实例的当前值
        this.current = JSON.parse(JSON.stringify(this.default));
        //方向
        this.direction = direction
        //生命条 能量条
        this.bar = new HealthPowerBar(scene, x, y, 64, this.default.battle.health, this.default.battle.power);
        //负值表示翻转, 小数表示缩小
        let scale = 0.5;
        if (this.direction === 'left') {
            this.setScale(scale, scale);
        } else {
            this.setScale(-1 * scale, scale);
            this.setOffset(128 * scale * 2, 0)
        }
        //落地弹跳值
        this.setBounce(0.2);
        //不会掉出地图
        this.setCollideWorldBounds(true);
        //刷新
        this.refreshBody();
        //与地面的碰撞
        scene.physics.add.collider(this, scene.ground);


    }

    battle(unit) {
        let damage;
        if (this.current.battle.armor.shield > 0) {
            damage = 1;
        } else {
            damage = unit.current.battle.attack.atk - this.current.battle.armor.shield;
            if (damage < 0) damage = 1;
        }
        this.current.battle.health -= damage;
        this.bar.setHealth(this.current.battle.health);
        unit.current.battle.power += damage;
        unit.bar.setPower(unit.current.battle.power);
    }

    move() {
        this.setVelocityX((this.direction === 'left' ? 1 : -1) * this.current.move.speed);
        this.bar.draw(this.x, this.y);
    }
}