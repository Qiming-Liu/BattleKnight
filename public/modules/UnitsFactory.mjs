import Unit
    from "../models/Unit.mjs";
import Loader
    from "../objects/Loader.mjs";

export default class UnitsFactory {// need 400 units limitation
    constructor(scene, direction) {
        this.direction = direction;
        this.UnitsList = [];
    }

    createTimer(scene, key, direction) {
        let t = this;
        t.produce(scene, key, direction);
        return scene.time.addEvent({
            delay: Loader.getDefault(key).interval,
            callback: function () {
                t.produce(scene, key);
            },
            loop: true
        });
    }

    produce(scene, key) {
        if (this.direction === 'left') {
            let unit = new Unit(scene, scene.game.config.width * 0.14, scene.game.config.height * 0.6, key, this.direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);

        } else {
            let unit = new Unit(scene, scene.game.config.width * 0.86, scene.game.config.height * 0.6, key, this.direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);
        }
    }

    tick(enemy, delta) {
        let enemyList = enemy.UnitsFactory.UnitsList.concat(enemy.Base);
        for (let i = 0; i < this.UnitsList.length; i++) {
            this.UnitsList[i].tick(enemyList, delta);
        }
    }
}