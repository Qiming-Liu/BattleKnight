import Unit
    from "../models/Unit.mjs";
import Loader
    from "../objects/Loader.mjs";

export default class UnitsFactory {
    constructor(scene, direction) {
        this.UnitsList = [];
        this.timer = scene.time.addEvent();
        if (direction === 'left') {
            this.change(scene, 'knightSavage', direction);
        } else {
            this.change(scene, 'knightKnightLV1', direction);
        }
    }

    change(scene, key, direction) {
        let t = this;
        this.timer.remove();
        this.timer = scene.time.addEvent({
            delay: Loader.getDefault(key).cost.interval,
            callback: function () {
                t.produce(scene, key, direction);
            },
            loop: true
        });
    }

    produce(scene, key, direction) {
        if (direction === 'left') {
            let unit = new Unit(scene, scene.game.config.width * 0.14, scene.game.config.height * 0.6, key, direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);

        } else {
            let unit = new Unit(scene, scene.game.config.width * 0.86, scene.game.config.height * 0.6, key, direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);
        }
    }

    tick(enemy, delta) {
        for (let i = 0; i < this.UnitsList.length; i++) {
            this.UnitsList[i].tick(enemy, delta);
        }
    }
}