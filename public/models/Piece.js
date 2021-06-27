import Loader from "../objects/Loader.mjs";

export default class Piece {
    constructor(scene, x, y, scale, key, level, i) {
        let t = this;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.level = level;
        this.i = i;
        this.image = scene.add.image(x, y, this.key).setScale(scale).setInteractive();
        this.image.drag = scene.plugins.get('rexdragplugin').add(this.image);
        this.textCreate(this, 0.015, 0.055);
        this.putInPool = false;
        this.onDrag(t);
    }

    onDrag(t) {
        this.image.on('dragstart', function (pointer, dragX, dragY) {
            if (t.putInPool) {
                t.scene.panel.bin.show();
            }
        });
        this.image.on('dragend', function (pointer, dragX, dragY, dropped) {
            if (t.putInPool) {
                t.scene.panel.bin.hide();
                if (t.scene.panel.bin.inBin({x: pointer.x, y: pointer.y})) {
                    t.scene.panel.pool.deletePiece(t);
                } else {
                    t.onDragend(t);
                }
            } else {
                let area = t.scene.panel.pool.inArea(t.scene.panel.pieces, pointer.x, pointer.y, t.i);
                switch (area) {
                    case 'no': {
                        t.onDragend(t);
                        break;
                    }
                    case 'pool': {
                        t.scene.panel.pool.putPiece(t, true);
                        break;
                    }
                    default: {
                        let targetPiece = t.scene.panel.pieces[area];
                        if ((targetPiece.key === t.key) && (targetPiece.level === t.level)) {//level up
                            t.destroy();
                            targetPiece.level++;
                            t.textCreate(targetPiece, 0.015, 0.055);
                        } else {
                            t.onDragend(t);
                        }
                    }
                }
            }
        });
    }

    onDragend(t) {
        t.image.x = t.x;
        t.image.y = t.y;
    }

    changePosition(t, x, y) {
        t.x = x;
        t.y = y;
        t.image.x = t.x;
        t.image.y = t.y;
    }

    textCreate(t, ws, hs) {
        try {
            t.text.destroy();
        } catch (e) {
        }
        t.text = t.scene.add.text(t.x - t.scene.game.config.width * ws, t.y - t.scene.game.config.height * hs, 'Lv ' + t.level);
    }

    costEnough(t) {
        return t.scene.panel.bar.getValue() > Loader.getDefault(t.key).cost;
    }

    costThatValue(t) {
        t.scene.panel.bar.costValue(Loader.getDefault(t.key).cost);
    }

    destroy() {
        this.image.destroy();
        this.text.destroy()
        this.level = 0;
    }
}