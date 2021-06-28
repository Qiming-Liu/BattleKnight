export default class SocketIO {
    constructor() {
        this.socket = io.connect(window.location.href, {reconnection: false});

        this.socket.on("room", msg => {
            switch (msg) {
                case 'exist':{
                    window.vue.vueObject.$bvToast.toast(`The room number is already exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    });
                    break;
                }
                case 'unexist':{
                    window.vue.vueObject.$bvToast.toast(`The room number is not exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    });
                    break;
                }
                case 'created':{
                    window.vue.vueObject.$bvToast.toast(`The room is ready.`, {
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
            window.vue.vueObject.$bvToast.toast(`Your opponent left the game.`, {
                title: 'Game Over',
                variant: 'success',
                autoHideDelay: 3000
            });
        });

        this.socket.on('allFinishLoading', () => {
            window.vue.hide('vue');
            window.vue.show('game');
            window.game.scene.scenes[0].started = true;
        });

        this.socket.on('produce', piece => {
            window.game.scene.scenes[0][piece.direction].UnitsFactory.produce(window.game.scene.scenes[0], piece.key, piece.level);
        });
    }

    finishLoading() {
        this.socket.emit('finishLoading', window.gameInfo.roomNumber);
    }
}