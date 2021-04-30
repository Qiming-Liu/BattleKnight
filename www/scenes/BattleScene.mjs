import BaseScene from "./BaseScene.mjs";
import UnitsFactory
    from "../tools/UnitsFactory.mjs";
import Loader
    from "../units/Loader.mjs";

export default class BattleScene extends BaseScene{
    constructor() {
        super('BattleScene');
        this.ground = null;
        this.left = null;
    }

    preload() {
        //加载游戏资源
        this.load.setBaseURL('./assets/');
        this.load.image('background', 'scenes/battle/background.png');
        this.load.image('ground', 'scenes/battle/ground.png');
        Loader.LoadHuman(this);
    }

    create() {
        //background
        this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5 * 0.75, 'background');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.game.config.width * 0.5, this.game.config.height * 0.7, 'ground', null, false, true);

        //刷兵
        this.left = new UnitsFactory(this, 1000, 'left');
        this.right = new UnitsFactory(this, 1000, 'right');
        this.physics.add.overlap(this.left.unitsList, this.right.unitsList, this.battle, null, this)
    }

    update(time, delta) {
        this.left.update();
        this.right.update();
    }

    battle(left, right){
        left.battle(right);
        right.battle(left);
    }
}