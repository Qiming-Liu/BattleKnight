import BaseScene
    from "./BaseScene.mjs";
import UnitsFactory
    from "../modules/UnitsFactory.mjs";
import Loader
    from "../objects/Loader.mjs";
import Building
    from "../models/Building.mjs";

export default class BattleScene extends BaseScene {
    constructor() {
        super('BattleScene');
        this.left = {}
        this.right = {}
    }

    preload() {
        //加载游戏资源
        this.load.setBaseURL('./assets/');
        this.load.image('background', 'scenes/battle/background.png');
        this.load.image('ground', 'scenes/battle/ground.png');
        Loader.Load(this);
    }

    create() {
        //background
        this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5 * 0.75, 'background');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.game.config.width * 0.5, this.game.config.height * 0.69, 'ground', null, false, true);

        //基地
        this.left.Base = new Building(this, this.game.config.width * 0.08, 0, 'knightBase01', 'left');
        this.right.Base = new Building(this, this.game.config.width * 0.92, 0, 'knightBase01', 'right');

        //刷兵
        this.left.UnitsFactory = new UnitsFactory(this, 'left');
        this.right.UnitsFactory = new UnitsFactory(this, 'right');
    }

    update(time, delta) {
        if (this.right.UnitsFactory.UnitsList.length > this.left.UnitsFactory.UnitsList.length) {
            this.left.UnitsFactory.tick(this.right, delta);
            this.right.UnitsFactory.tick(this.left, delta);
        } else if (this.right.UnitsFactory.UnitsList.length < this.left.UnitsFactory.UnitsList.length) {
            this.right.UnitsFactory.tick(this.left, delta);
            this.left.UnitsFactory.tick(this.right, delta);
        } else {
            if (Phaser.Math.Between(0, 1) === 0) {
                this.left.UnitsFactory.tick(this.right, delta);
                this.right.UnitsFactory.tick(this.left, delta);
            } else {
                this.right.UnitsFactory.tick(this.left, delta);
                this.left.UnitsFactory.tick(this.right, delta);
            }
        }
        this.left.Base.tick(this.right.UnitsFactory.UnitsList, delta);
        this.right.Base.tick(this.left.UnitsFactory.UnitsList, delta);
    }
}