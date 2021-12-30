import HPBar
    from "./HPBar.mjs";

export default class UnitHPBar extends HPBar {
    constructor(scene, x, y, width, maxHealth, maxPower) {
        super(scene, x, y, width, maxHealth, maxPower);
    }

    draw(x, y) {
        //offset
        x = x - 32;
        y = y - 54;
        super.draw(x, y);
    }
}