import units
    from "../model/units.mjs";

export default class UnitsFactory {
    constructor(scene, delay, direction) {
        this.unitsList = [];
        let t = this;
        setInterval(function () {
           t.produce(scene, direction);
        }, delay);
    }

    produce(scene, direction) {
        if (direction === 'left') {
            let unit = new units(scene, scene.game.config.width * 0.14, scene.game.config.height * 0.6, 'human01', direction);
            unit.collider = scene.physics.add.collider(unit, this.unitsList);
            scene.physics.add.collider(unit, scene.rightBase);
            this.unitsList.push(unit);

        } else {
            let unit = new units(scene, scene.game.config.width * 0.86, scene.game.config.height * 0.6, 'human01', direction);
            unit.collider = scene.physics.add.collider(unit, this.unitsList);
            scene.physics.add.collider(unit, scene.leftBase);
            this.unitsList.push(unit);
        }
    }

    tick(enemy, delta) {
        for (let i = 0; i < this.unitsList.length; i++) {
            this.unitsList[i].tick(enemy, delta);
        }
    }
}