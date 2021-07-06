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
              class="mb-2">
            <div class="form-group">
                <input v-model="roomNumber" maxlength="20" type="number" placeholder="Enter Room Number Here" class="form-control form-control-lg" />
            </div>
            <b-row style="margin: 0">
                <b-button class="p-3" size="lg" variant="outline-primary" v-on:click="Create()">Create Room</b-button>
                <b-button class="ml-auto p-3" size="lg" variant="outline-success" v-on:click="Enter()">Enter Room</b-button>
                <b-button block  style="margin-top: 1rem" variant="outline-danger" v-on:click="Setting()">Setting</b-button>
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
                },
                Setting() {
                    window.vue.settingObject.Toggle();
                }
            }
        });

        document.getElementById('setting').innerHTML = `
        <template>
          <div>
            <b-sidebar v-model="sidebar" title="Setting" shadow>
              <div class="px-3 py-2">
                <b-row style="margin: 0">
                    <b-button block  style="margin-top: 1rem" variant="outline-danger" v-on:click="Music()">Background Music</b-button>
                </b-row>
              </div>
            </b-sidebar>
          </div>
        </template>
        `

        this.settingObject = new Vue({
            el: '#setting',
            data: function () {
                return {
                    sidebar: false
                };
            },
            methods: {
                Toggle() {
                    this.sidebar = !this.sidebar;
                },
                Music() {
                    try {
                        window.scene.music.setMute(!window.scene.music.mute);
                    } catch (e) {

                    }
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

    toast(text, config) {
        window.vue.vueObject.$bvToast.toast(text, config);
    }
}