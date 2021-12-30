export default class Skill {
    constructor(power, cd) {
        this.power = power;
        this.cd = cd;
        this.interval = 0;
    }

    tick(target, delta) {
        this.interval += delta;
        if (this.interval > this.cd && target.current.battle.power >= this.power) {
            this.spell(target);
        }
    }

    attack(target) {
        if (this.interval > this.cd && target.current.battle.power >= this.power) {
            this.spell(target);
        }
    }

    beAttacked(target) {
        if (this.interval > this.cd && target.current.battle.power >= this.power) {
            this.spell(target);
        }
    }

    spell(target) {
        target.current.battle.power -= this.power;
        this.interval = 0;
    }
}