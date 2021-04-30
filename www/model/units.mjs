import HealthPowerBar
    from "../tools/HealthPowerBar.mjs";

import Militia
    from "../assets/units/json/human/militia.mjs"

export default class units extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, direction) {
        super(scene, x, x, name);
        //设置单位的位置
        this.setPosition(x, y);
        //通过name得到此单位的默认数据
        this.default = getData(name);
        //复制一遍数据当作实例的当前值
        this.current = JSON.parse(JSON.stringify(this.default));
        //面朝的方向 left right
        this.direction = direction;
        //生命条 能量条
        this.bar = new HealthPowerBar(scene, x - 100, y - 1000, 80, this.default.battle.health, this.default.battle.power);
        //负值表示翻转, 小数表示缩小
        this.setScale(this.direction === 'left' ? 1 : -1 * 0.4);
        //落地弹跳值
        this.setBounce(0.2);
        //不会掉出地图
        this.setCollideWorldBounds(true);
        //刷新
        this.refreshBody();
        //显示
        scene.add.existing(this);
    }
}

function getData(name) {
    switch (name) {
        case 'militia':
            return Militia;
    }
}