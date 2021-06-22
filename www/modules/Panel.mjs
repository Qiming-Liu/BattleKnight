import ProgressBar from "./ProgressBar.mjs";
import Pool from "./Pool.mjs";

export default class Panel {
    constructor(scene) {
        let t = this;
        this.scene = scene;
        this.panel = scene.add.image(scene.game.config.width * 0.5, scene.game.config.height * 0.875, 'panel');
        this.dice = {
            image: scene.add.image(scene.game.config.width * 0.05, scene.game.config.height * 0.875, 'Dice_1').setScale(0.75),
            number: 1
        };
        this.pieces = [];
        this.onRefresh(t);
        this.bar = new ProgressBar(scene, scene.game.config.width * 0.095, scene.game.config.height * 0.94, scene.game.config.width * 0.431);
        this.pool = new Pool(scene, scene.game.config.width * 0.6, scene.game.config.height * 0.8, 100, 200);
        this.refresh = scene.add.image(scene.game.config.width * 0.72, scene.game.config.height * 0.875, 'Refresh').setScale(0.75).setInteractive();
        this.refresh.on('pointerup', function () {
            t.onRefresh(t);
        }, scene);
        this.upgrade = scene.add.image(scene.game.config.width * 0.79, scene.game.config.height * 0.875, 'Upgrade').setScale(0.75).setInteractive();
        this.upgrade.on('pointerup', function () {
            t.onUpgrade(t);
        }, scene);
        this.skill = scene.add.image(scene.game.config.width * 0.86, scene.game.config.height * 0.875, 'Skill').setScale(0.75).setInteractive();
        this.skill.on('pointerup', function () {
            t.onSkill(t);
        }, scene);
        this.setting = scene.add.image(scene.game.config.width * 0.95, scene.game.config.height * 0.875, 'Setting').setScale(0.75).setInteractive();
        this.setting.on('pointerup', function () {
            t.onSetting(t);
        }, scene);
    }

    onRefresh(t) {
        for (let i = 0; i < 6; i++) {
            try {
                t.pieces[i].image.destroy();
            } catch (e) {
            }
            let piece = t.randomPiece();
            t.pieces.push({
                image: t.scene.add.image(t.scene.game.config.width * (0.12 + 0.075 * i), t.scene.game.config.height * 0.84, piece).setScale(0.6),
                key: piece
            })
        }
    }

    onUpgrade(t) {
        if (t.dice.number < 6) {
            if (t.bar.getValue() >= 10) {
                try {
                    t.dice.image.destroy();
                } catch (e) {
                }
                t.bar.costValue(10);
                t.dice.number++;
                t.dice.image = t.scene.add.image(t.scene.game.config.width * 0.05, t.scene.game.config.height * 0.875, 'Dice_' + t.dice.number).setScale(0.75);
            }
        }
    }

    onSkill(t) {

    }

    onSetting(t) {
        // window.v.onSettingInBattle();
    }

    randomPiece() {
        return "knightSavage";
    }
}