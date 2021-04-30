import units
    from "../model/units.mjs";

export default class UnitsFactory {
    constructor(scene, delay, direction) {
        this.unitsList = [];
        this.loop = scene.time.addEvent({
            delay: delay,
            callback: this.produce(scene, direction),
            callbackScope: this,
            loop: true
        });
    }

    produce(scene, direction) {
        if (direction === 'left') {
            this.unitsList.push(new units(scene, scene.game.config.width * 0.15, scene.game.config.height * 0.6, 'human01', direction));
        } else {
            this.unitsList.push(new units(scene, scene.game.config.width * 0.85, scene.game.config.height * 0.6, 'human01', direction));
        }
    }

    update() {
        for (let i = 0; i < this.unitsList.length; i++) {
            this.unitsList[i].move();
        }
    }
}