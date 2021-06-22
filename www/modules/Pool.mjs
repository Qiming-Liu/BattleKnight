export default class Pool {
    constructor(scene, x, y, height, width) {
        this.border = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.draw();
        scene.add.existing(this.border);
    }

    draw() {
        this.border.lineStyle(4, 0xffffff, 10.0);
        this.border.beginPath();

        //左上
        this.border.moveTo(this.x - 2, this.y);
        this.border.lineTo(this.x + this.width + 2, this.y);
        this.border.moveTo(this.x, this.y);
        this.border.lineTo(this.x, this.y + this.height);
        //右下
        this.border.moveTo(this.x + this.width - 2, this.y + this.height);
        this.border.lineTo(this.x + this.width, this.y);
        this.border.moveTo(this.x + this.width, this.y + this.height);
        this.border.lineTo(this.x, this.y + this.height);

        this.border.closePath();
        this.border.strokePath();
    }
}