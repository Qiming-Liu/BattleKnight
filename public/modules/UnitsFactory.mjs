import Unit
    from "../models/Unit.mjs";

export default class UnitsFactory {// need 400 units limitation
    constructor(scene, direction) {
        this.direction = direction;
        this.UnitsList = [];
    }

    produce(scene, key, level) {
        if (this.direction === 'left') {
            let unit = new Unit(scene, scene.game.config.width * 0.14, scene.game.config.height * 0.6, key, level, this.direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);

        } else {
            let unit = new Unit(scene, scene.game.config.width * 0.86, scene.game.config.height * 0.6, key, level, this.direction);
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