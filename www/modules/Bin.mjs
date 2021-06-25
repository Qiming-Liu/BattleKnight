export default class Bin {
    constructor(scene, x, y, height, width) {
        this.graphics = new Phaser.GameObjects.Graphics(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = scene.add.image(x, y, 'Bin').setScale(0.4);
        this.image.setVisible(false);
        scene.add.existing(this.graphics);
        window.Bin = this;
    }

    show() {
        this.graphics.fillStyle(0x414141, 100);
        this.graphics.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.graphics.strokePath();
        this.scene.panel.refresh.setVisible(false);
        this.scene.panel.upgrade.setVisible(false);
        this.scene.panel.skill.setVisible(false);
        this.image.setVisible(true);
    }

    hide() {
        this.graphics.clear();
        this.scene.panel.refresh.setVisible(true);
        this.scene.panel.upgrade.setVisible(true);
        this.scene.panel.skill.setVisible(true);
        this.image.setVisible(false);
    }

    inBin(point) {
        return ((point.x > this.x - this.width / 2) && (point.x < this.x + this.width / 2) && (point.y > this.y - this.height / 2) && (point.y < this.y + this.height / 2))
    }
}