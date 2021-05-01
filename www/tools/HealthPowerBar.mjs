export default class HealthPowerBar {
    constructor(scene, x, y, width, maxHealth, maxPower) {
        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        this.powerBar = new Phaser.GameObjects.Graphics(scene);
        this.width = width;

        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxPower = maxPower;
        this.power = maxPower;

        this.draw(x, y);
        scene.add.existing(this.healthBar);
        scene.add.existing(this.powerBar);
    }

    setHealth(health) {
        this.health = health;
    }

    setPower(power) {
        this.power = power;
    }

    draw(x, y) {
        this.healthBar.clear();
        this.powerBar.clear();

        //offset
        x = x - 32;
        y = y - 64;

        //Health
        this.healthBar.fillStyle(0x000000);//bg
        this.healthBar.fillRect(x, y, this.width, 14);
        this.healthBar.fillStyle(0xffffff);
        this.healthBar.fillRect(x + 2, y + 2, this.width - 4, 10);
        if (this.health < 0.2 * this.maxHealth) {
            this.healthBar.fillStyle(0xff0000);
        } else if (this.health < 0.5 * this.maxHealth) {
            this.healthBar.fillStyle(0xffff00);
        } else {
            this.healthBar.fillStyle(0x00ff00);
        }
        this.healthBar.fillRect(x + 2, y + 2, (this.width - 4) * this.health / this.maxHealth, 10);

        //Power
        if (this.maxPower !== 0) {
            this.powerBar.fillStyle(0x000000);//bg
            this.healthBar.fillRect(x - 18, y - 18, this.width, 14);
            this.healthBar.fillStyle(0xffffff);
            this.healthBar.fillRect(x + 14, y + 14, this.width - 4, 10);
            if (this.power < this.maxPower) {
                this.healthBar.fillStyle(0xffd700);
            } else {
                this.healthBar.fillStyle(0xff0000);
            }
            this.healthBar.fillRect(x + 2, y + 2, this.width - 4 * this.power / this.maxPower, 10);
        }
    }

    destroy() {
        this.healthBar.destroy();
        this.healthBar.destroy();
    }
}