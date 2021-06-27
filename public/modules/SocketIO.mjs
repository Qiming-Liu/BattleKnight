export default class SocketIO {
    constructor() {
        this.socket = io.connect(window.location.href, {reconnection: false});

        this.socket.on('connect', () => {
            console.log(this.socket.id);
        });
        this.socket.on('disconnect', () => {
            console.log(this.socket.id);
        });
        this.socket.on('error', error => {
            console.log([this.socket.id, error]);
        });

        this.socket.on("room", msg => {
            switch (msg) {
                case 'exist':{
                    window.vue.vueObject.$bvToast.toast(`The room number is already exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    })
                    break;
                }
                case 'unexist':{
                    window.vue.vueObject.$bvToast.toast(`The room number is not exist.`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 3000
                    })
                    break;
                }
            }
        });

        this.socket.on('gameStart', game => {
            window.vue.hide('vue');
            window.gameStart(game);
        });

        this.socket.on('allFinishLoading', () => {
            window.game.scene.scenes[0].start();
        });
    }

    finishLoading() {
        this.socket.emit('finishLoading', window.gameInfo.roomNumber);
    }
}