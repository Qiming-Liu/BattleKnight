import Target from "../models/Target.mjs";

export default class SocketIO {
    constructor() {
        this.socket = io.connect(window.location.href, {reconnection: false});
        this.socket.on("room", msg => {
            switch (msg) {
                case 'exist': {
                    window.vue.toast(`The room number is already exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    });
                    break;
                }
                case 'unexist': {
                    window.vue.toast(`The room number is not exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    });
                    break;
                }
                case 'created': {
                    window.vue.toast(`The room is ready.`, {
                        title: 'Ready',
                        variant: 'success',
                        autoHideDelay: 3000
                    });
                    window.vue.vueObject.showOverlay = true;
                    break;
                }
            }
        });

        this.socket.on('gameStart', game => {
            window.gameStart(game);
        });

        this.socket.on('gameOver', () => {
            window.vue.toast(`Your opponent left the game.`, {
                title: 'Game Over',
                variant: 'success',
                autoHideDelay: 3000
            });
        });

        this.socket.on('allFinishLoading', () => {
            window.vue.hide('vue');
            window.vue.show('game');
            window.scene = window.game.scene.scenes[0];
            window.scene.started = true;
        });

        this.socket.on('produce', piece => {
            window.scene[piece.direction].UnitsFactory.produce(window.scene, piece.key, piece.level);
        });

        //for skills
        this.socket.on('setHealth', list => {
            for (let i = 0; i < list.length; i++) {
                Target.getTargetByID(list[i].id).current.battle.health = list[i].health;
            }
        });
        this.socket.on('letDie', list => {
            for (let i = 0; i < list.length; i++) {
                Target.getTargetByID(list[i]).letDie();
            }
        });

        //tick
        this.socket.on('tick', tick => {
            if (window.gameInfo.direction === 'right') {
                for (let i = 0; i < tick.length; i++) {
                    let target = Target.getTargetByID(tick[i].id);
                    if (target !== null) {
                        target.setData(tick[i]);
                    }
                }
            }
        });
    }

    finishLoading() {
        this.socket.emit('finishLoading', window.gameInfo.roomNumber);
    }

    setHealth(list) {
        this.socket.emit('setHealth', {
            roomNumber: window.gameInfo.roomNumber,
            list: list
        });
    }

    letDie(list) {
        this.socket.emit('letDie', {
            roomNumber: window.gameInfo.roomNumber,
            list: list
        });
    }

    tick(left, right) {
        let data = [];
        data.push(left.Base.getData());
        data.push(right.Base.getData());
        for (let i = 0; i < left.UnitsFactory.UnitsList.length; i++) {
            data.push(left.UnitsFactory.UnitsList[i].getData());
        }
        for (let i = 0; i < right.UnitsFactory.UnitsList.length; i++) {
            data.push(right.UnitsFactory.UnitsList[i].getData());
        }
        this.socket.emit('tick', {
            roomNumber: window.gameInfo.roomNumber,
            tick: data
        });
    }
}