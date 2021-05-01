import BaseScene
    from "./BaseScene.mjs";
import UnitsFactory
    from "../tools/UnitsFactory.mjs";
import Loader
    from "../units/Loader.mjs";
import units
    from "../model/units.mjs";
import building
    from "../model/building.mjs";

export default class BattleScene extends BaseScene {
    constructor() {
        super('BattleScene');
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

        //基地
        this.leftBase = new building(this, 0, 0, 'humanbase', 'left');
        this.leftBase.setDisplaySize(this.game.config.width * 0.17, this.game.config.height * 0.5);
        this.leftBase.visible = false;
        this.rightBase = new building(this, this.game.config.width, 0, 'humanbase', 'right');
        this.rightBase.setDisplaySize(this.game.config.width * 0.17, this.game.config.height * 0.5);
        this.rightBase.visible = false;

        //刷兵
        this.left = new UnitsFactory(this, 10000, 'left');
        this.right = new UnitsFactory(this, 10000, 'right');
    }

    update(time, delta) {
        if (Phaser.Math.Between(0, 1) === 0) {
            this.left.tick(this.right.unitsList, delta);
            this.right.tick(this.left.unitsList, delta);
        } else {
            this.right.tick(this.left.unitsList, delta);
            this.left.tick(this.right.unitsList, delta);
        }
    }
}