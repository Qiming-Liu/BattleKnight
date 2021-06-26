export default class SocketIO {
    constructor() {
    }

    connect(url) {
        this.socket = io.connect(url, {reconnection: false});

        this.socket.on('connect', (connection) => {
            connection.socket.on("disconnect", () => {

            });
        });
        this.socket.on("disconnect", () => {

        });
        this.socket.on("error", () => {

        });
    }

}