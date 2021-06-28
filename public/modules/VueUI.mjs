export default class VueUI {
    constructor() {
        document.getElementById('vue').innerHTML = `
        <b-overlay :show="showOverlay" rounded="sm">
            <b-card
              title="Battle Knight"
              img-src="./assets/scenes/background.png"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem;"
              class="mb-2"
            >
       
            <div class="form-group">
                <input v-model="roomNumber" maxlength="20" type="number" placeholder="Enter Room Number Here" class="form-control form-control-lg" />
            </div>
            <b-row style="margin: 0">
            <b-button class="p-3" size="lg" variant="primary" v-on:click="Create()">Create Room</b-button>
            <b-button class="ml-auto p-3" size="lg" variant="primary" v-on:click="Enter()">Enter Room</b-button>
            </b-row>
            
            </b-card>
        </b-overlay>
        `
        this.vueObject = new Vue({
            el: '#vue',
            data: function () {
                return {
                    showOverlay: false,
                    roomNumber: ''
                };
            },
            methods: {
                Create() {
                    window.io.socket.emit('createRoom', window.vue.vueObject.roomNumber);
                },
                Enter() {
                    window.io.socket.emit('enterRoom', window.vue.vueObject.roomNumber);
                }
            }
        });
    }

    hide(id) {
        document.getElementById(id).style.display = 'none';
    }
    show(id) {
        document.getElementById(id).style.display = 'block';
    }
}