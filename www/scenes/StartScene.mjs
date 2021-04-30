import BaseScene from "./BaseScene.mjs";

export default class StartScene extends BaseScene{
    constructor() {
        super('StartScene');
    }

    preload() {
    }

    create() {
        this.scene.start('BattleScene');
    }

    update() {
    }
}