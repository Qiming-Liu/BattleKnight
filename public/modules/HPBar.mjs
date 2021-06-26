export default class HPGraphics {
    constructor(scene, x, y, width, maxHealth, maxPower) {
        this.healthGraphics = new Phaser.GameObjects.Graphics(scene);
        this.powerGraphics = new Phaser.GameObjects.Graphics(scene);
        this.width = width;

        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxPower = maxPower;
        this.power = maxPower;

        this.draw(x, y);
        scene.add.existing(this.healthGraphics);
        scene.add.existing(this.powerGraphics);
    }

    setHealth(health) {
        this.health = health;
    }

    setPower(power) {
        this.power = power;
    }

    draw(x, y) {
        this.healthGraphics.clear();
        this.powerGraphics.clear();

        //Health
        this.healthGraphics.fillStyle(0x000000);//bg
        this.healthGraphics.fillRect(x, y, this.width, 14);
        this.healthGraphics.fillStyle(0xffffff);
        this.healthGraphics.fillRect(x + 2, y + 2, this.width - 4, 10);
        if (this.health < 0.2 * this.maxHealth) {
            this.healthGraphics.fillStyle(0xff0000);
        } else if (this.health < 0.5 * this.maxHealth) {
            this.healthGraphics.fillStyle(0xffff00);
        } else {
            this.healthGraphics.fillStyle(0x00ff00);
        }
        this.healthGraphics.fillRect(x + 2, y + 2, (this.width - 4) * this.health / this.maxHealth, 10);

        //Power
        if (this.maxPower !== 0) {
            this.powerGraphics.fillStyle(0x000000);//bg
            this.powerGraphics.fillRect(x - 18, y - 18, this.width, 14);
            this.powerGraphics.fillStyle(0xffffff);
            this.powerGraphics.fillRect(x + 14, y + 14, this.width - 4, 10);
            if (this.power < this.maxPower) {
                this.powerGraphics.fillStyle(0xffd700);
            } else {
                this.powerGraphics.fillStyle(0xff0000);
            }
            this.powerGraphics.fillRect(x + 2, y + 2, this.width - 4 * this.power / this.maxPower, 10);
        }
    }

    destroy() {
        this.healthGraphics.destroy();
        this.healthGraphics.destroy();
    }
}