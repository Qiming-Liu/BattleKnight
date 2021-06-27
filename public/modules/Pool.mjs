export default class Pool {
    constructor(scene, x, y, height, width) {
        this.graphics = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.pieces = [];
        this.draw();
        scene.add.existing(this.graphics);
    }

    draw() {
        this.graphics.fillStyle(0x414141);
        this.graphics.fillRoundedRect(this.x, this.y, this.width, this.height, 14);
        this.graphics.strokePath();
    }

    drawPiecesSpace(pieces) {
        for (let i = 0; i < 6; i++) {
            this.graphics.fillStyle(0x414141);
            this.graphics.fillRoundedRect(pieces[i].image.x - 36, pieces[i].image.y - 42, 72, 72, 14);
            this.graphics.strokePath();
        }
    }

    inArea(pieces, x, y, index) {
        if (this.inRect({x: x, y: y}, this.x, this.y, this.width, this.height)) {
            return 'pool';
        }
        for (let i = 0; i < 6; i++) {
            if (i !== index) {
                let psx = pieces[i].image.x - 36;
                let psy = pieces[i].image.y - 42;
                let psw = 72;
                let psh = 72;
                if ((this.inRect({x: x, y: y}, psx, psy, psw, psh))) {
                    return i;
                }
            }
        }
        return 'no';
    }

    inRect(point, x, y, width, height) {
        return ((point.x > x && point.x < x + width && point.y > y && point.y < y + height));
    }

    putPiece(t, pay) {
        let flag = true;
        //level up once
        for (let i = 0; i < this.pieces.length; i++) {
            if ((this.pieces[i].key === t.key) && (this.pieces[i].level === t.level)) {
                if(!pay){
                    t.destroy();
                    this.pieces[i].level++;
                    t.textCreate(this.pieces[i], 0.015, 0.045);
                    flag = false;
                } else if (t.costEnough(t)){
                    t.costThatValue(t);
                    t.destroy();
                    this.pieces[i].level++;
                    t.textCreate(this.pieces[i], 0.015, 0.045);
                    flag = false;
                }
            }
        }
        if (flag) {
            if (this.pieces.length < 6) {
                let yDown = -8;
                switch (this.pieces.length) {
                    case 0: {
                        t.changePosition(t, this.x + 1 / 6 * this.width, this.y + 1 / 4 * this.height - yDown);
                        break;
                    }
                    case 1: {
                        t.changePosition(t, this.x + 1 / 2 * this.width, this.y + 1 / 4 * this.height - yDown);
                        break;
                    }
                    case 2: {
                        t.changePosition(t, this.x + 5 / 6 * this.width, this.y + 1 / 4 * this.height - yDown);
                        break;
                    }
                    case 3: {
                        t.changePosition(t, this.x + 1 / 6 * this.width, this.y + 3 / 4 * this.height - yDown);
                        break;
                    }
                    case 4: {
                        t.changePosition(t, this.x + 1 / 2 * this.width, this.y + 3 / 4 * this.height - yDown);
                        break;
                    }
                    case 5: {
                        t.changePosition(t, this.x + 5 / 6 * this.width, this.y + 3 / 4 * this.height - yDown);
                        break;
                    }
                }
                t.image.setScale(0.275);
                t.textCreate(t, 0.015, 0.045);
                this.pieces.push(t);
                t.putInPool = true;
            } else {
                t.onDragend(t);
            }
        } else {
            this.checkPieces();
        }
    }

    deletePiece(t) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (t === this.pieces[i]) {
                t = i;
            }
        }
        let temp = this.pieces;
        temp[t].destroy();
        this.pieces = [];
        for (let i = 0; i < temp.length; i++) {
            if (i !== t) {
                this.putPiece(temp[i], false);
            }
        }
    }

    checkPieces() {
        let combine = true;
        while (combine) {
            combine = false;
            for (let i = 0; i < this.pieces.length; i++) {
                for (let j = i + 1; j < this.pieces.length; j++) {
                    if ((this.pieces[i].key === this.pieces[j].key) && (this.pieces[i].level === this.pieces[j].level)) {
                        this.pieces[j].destroy();
                        this.pieces[i].level++;
                        this.pieces[i].textCreate(this.pieces[i], 0.015, 0.045);
                        combine = true;
                        break;
                    }
                }
                if (combine) {
                    break;
                }
            }
            if (combine) {//clean
                let temp = [];
                for (let i = 0; i < this.pieces.length; i++) {
                    if (this.pieces[i].level !== 0) {
                        temp.push(this.pieces[i]);
                    }
                }
                this.pieces = temp;
            }
        }
    }
}