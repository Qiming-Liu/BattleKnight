export default class HealthPowerBar {
    constructor(scene, x, y, width, maxHealth, maxPower) {
        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        this.powerBar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.width = width;

        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxPower = maxPower;
        this.power = maxPower;

        this.draw();
        scene.add.existing(this.healthBar);
        scene.add.existing(this.powerBar);
    }

    setHealth(health) {
        this.health = health;
    }

    setPower(power) {
        this.power = power;
    }

    draw() {
        this.healthBar.clear();
        this.powerBar.clear();

        //Health
        if (this.health !== 0) {
            this.healthBar.fillStyle(0x000000);//bg
            this.healthBar.fillRect(this.x, this.y, this.width, 16);
            this.healthBar.fillStyle(0xffffff);
            this.healthBar.fillRect(this.x + 2, this.y + 2, this.width - 4, 12);
            if (this.health < 0.2 * this.maxHealth) {
                this.healthBar.fillStyle(0xff0000);
            } else if (this.health < 0.5 * this.maxHealth) {
                this.healthBar.fillStyle(0xffff00);
            } else {
                this.healthBar.fillStyle(0x00ff00);
            }
            this.healthBar.fillRect(this.x + 2, this.y + 2, this.width - 4 * this.health / this.maxHealth, 12);
        }

        //Power
        if (this.power !== 0) {
            this.powerBar.fillStyle(0x000000);//bg
            this.healthBar.fillRect(this.x - 18, this.y - 18, this.width, 16);
            this.healthBar.fillStyle(0xffffff);
            this.healthBar.fillRect(this.x + 16, this.y + 16, this.width - 4, 12);
            if (this.power < this.maxPower) {
                this.healthBar.fillStyle(0xffd700);
            } else {
                this.healthBar.fillStyle(0xff0000);
            }
            this.healthBar.fillRect(this.x + 2, this.y + 2, this.width - 4 * this.power / this.maxPower, 12);
        }
    }
}