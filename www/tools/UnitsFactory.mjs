import Unit
    from "../models/Unit.mjs";

export default class UnitsFactory {
    constructor(scene, delay, direction) {
        this.UnitsList = [];
        let t = this;
        //这会导致窗口失去焦点时仍计算时间
        setInterval(function () {
           t.produce(scene, direction);
        }, delay);
    }

    produce(scene, direction) {
        if (direction === 'left') {
            let unit = new Unit(scene, scene.game.config.width * 0.14, scene.game.config.height * 0.6, 'knightSavage', direction);
            unit.collider = scene.physics.add.collider(unit, this.UnitsList);
            this.UnitsList.push(unit);

        } else {
            let unit = new Unit(scene, scene.game.config.width * 0.86, scene.game.config.height * 0.6, 'knightSavage', direction);
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