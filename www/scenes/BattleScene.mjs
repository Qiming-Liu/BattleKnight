import BaseScene from "./BaseScene.mjs";

export default class BattleScene extends BaseScene{
    constructor() {
        super('BattleScene');
        this.ground = null;
    }

    preload() {
        //加载游戏资源
        this.load.setBaseURL('./assets/');
        this.load.image('background', 'scenes/battle/background.png');
        this.load.image('ground', 'scenes/battle/ground.png');
        this.load.spritesheet('a01', 'units/human/a01.png', {
            frameWidth: 128,
            frameHeight: 128
        });

    }

    create() {
        //background
        this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5 * 0.75, 'background');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.game.config.width * 0.5, this.game.config.height * 0.7, 'ground', null, false, true);
        let player = this.physics.add.sprite(100, 100, 'a01');

        this.physics.add.collider(player, ground);
    }

    update() {
    }
}