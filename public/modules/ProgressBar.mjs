export default class ProgressBar {
    constructor(scene, x, y, width) {
        this.graphics = new Phaser.GameObjects.Graphics(scene);
        this.text = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.max = 1100;
        this.value = 0;
        this.draw(scene);
        this.graphicsTimer = scene.time.addEvent();
        scene.add.existing(this.graphics);
    }

    draw(scene) {
        //clear
        this.graphics.clear();
        for (let i = 0; i < this.text.length; i++) {
            this.text[i].destroy();
        }

        //black
        this.graphics.fillStyle(0x000000);
        this.graphics.fillRect(this.x, this.y, this.width, 20);

        //white
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillRect(this.x + 4, this.y + 4, this.width - 8, 10);

        //color
        this.graphics.fillStyle(0xf6d04d);
        this.graphics.fillRect(this.x + 2, this.y + 2, (this.width - 4) * this.value / this.max, 10);

        //mark
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.beginPath();
        for (let i = 0; i < 11; i++) {
            this.graphics.moveTo(this.x + 50 * i + 1, this.y - 1);
            this.graphics.lineTo(this.x + 50 * i + 1, this.y + 9);
            this.text.push(scene.add.text(this.x + 50 * i - 4, this.y - 20, i));
        }
        this.text.push(scene.add.text(this.x + 540, this.y - 20, 'Max'));
        this.graphics.closePath();
        this.graphics.strokePath();
    }

    start(scene) {
        let t = this;
        this.graphicsTimer.remove();
        this.graphicsTimer = scene.time.addEvent({
            delay: 40,
            callback: function () {
                if (t.value !== t.max) {
                    t.value++;
                    t.draw(scene, t.x, t.y);
                }
            },
            loop: true
        });
    }

    getValue() {
        return Math.floor(this.value / this.max * 11);
    }

    costValue(cost) {
        this.value -= cost / 11 * this.max;
    }

    destroy() {
        this.graphics.destroy();
        this.graphics.destroy();
    }
}