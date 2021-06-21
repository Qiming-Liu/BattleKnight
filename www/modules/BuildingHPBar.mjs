import HPBar
    from "./HPBar.mjs";

export default class BuildingHPBar extends HPBar {
    constructor(scene, x, y, width, maxHealth, maxPower) {
        super(scene, x, y, width, maxHealth, maxPower);
    }

    draw(x, y) {
        //offset
        x = x - 75;
        y = y + 241;
        super.draw(x, y);
    }
}