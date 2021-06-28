import ProgressBar from "./ProgressBar.mjs";
import Pool from "./Pool.mjs";
import Bin from "./Bin.mjs";
import Piece from "../models/Piece.js";

export default class Panel {
    constructor(scene) {
        let t = this;
        this.scene = scene;

        this.panel = scene.add.image(scene.game.config.width * 0.5, scene.game.config.height * 0.875, 'panel');

        this.dice = {
            image: scene.add.image(scene.game.config.width * 0.05, scene.game.config.height * 0.875, 'Dice_1').setScale(0.75),
            number: 1
        };

        this.bar = new ProgressBar(scene, scene.game.config.width * 0.095, scene.game.config.height * 0.94, scene.game.config.width * 0.431);

        this.pool = new Pool(scene, scene.game.config.width * 0.55, scene.game.config.height * 0.80, 110, 165);

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

        this.pieces = [];
        this.onRefresh(t);
        this.pool.drawPiecesSpace(t.pieces);

        this.bin = new Bin(scene, scene.game.config.width * 0.8, scene.game.config.height * 0.875, 128, 256);
    }

    onRefresh(t) {
        for (let i = 0; i < t.pieces.length; i++) {
            if (!t.pieces[i].putInPool) {
                t.pieces[i].destroy();
            }
        }
        t.pieces = [];
        for (let i = 0; i < 6; i++) {
            let key = t.randomPiece();
            let x = t.scene.game.config.width * (0.12 + 0.075 * i);
            let y = t.scene.game.config.height * 0.85;
            t.pieces.push(new Piece(t.scene, x, y, 0.4, key, 1, i));
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
        return "Savage";
    }
}