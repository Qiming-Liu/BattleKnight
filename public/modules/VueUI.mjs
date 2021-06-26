export default class VueUI {
    constructor() {
        this.vueDiv = document.getElementById('vue');
        this.vueDiv.innerHTML = `
        `
        this.vueObject = new Vue({
            el: '#vue',
            data: function () {
                return {
                };
            },
            methods: {
            }
        });
    }

    onSettingInBattle(){

    }
}