export default class ProgressBar {
    constructor(scene, x, y, width) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.text = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.max = 550;
        this.value = 0;
        this.draw(scene);
        this.barTimer = scene.time.addEvent();
        scene.add.existing(this.bar);
    }

    draw(scene) {
        //clear
        this.bar.clear();
        for (let i = 0; i < this.text.length; i++) {
            this.text[i].destroy();
        }

        //black
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.width, 20);

        //white
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 4, this.y + 4, this.width - 8, 10);

        //color
        this.bar.fillStyle(0xf6d04d);
        this.bar.fillRect(this.x + 2, this.y + 2, (this.width - 4) * this.value / this.max, 10);

        //mark
        this.bar.lineStyle(2, 0x000000);
        this.bar.beginPath();
        for (let i = 0; i < 11; i++) {
            this.bar.moveTo(this.x + 50 * i + 1, this.y - 1);
            this.bar.lineTo(this.x + 50 * i + 1, this.y + 9);
            this.text.push(scene.add.text(this.x + 50 * i - 4, this.y - 20, i));
        }
        this.text.push(scene.add.text(this.x + 525, this.y - 20, 'Max'));
        this.bar.closePath();
        this.bar.strokePath();
    }

    start(scene) {
        let t = this;
        this.barTimer.remove();
        this.barTimer = scene.time.addEvent({
            delay: 1100 / t.max * 10,
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
        this.bar.destroy();
        this.bar.destroy();
    }
}