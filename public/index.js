import BattleScene
    from "./scenes/BattleScene.mjs";
import VueUI
    from "./modules/VueUI.mjs";
import SocketIO
    from "./modules/SocketIO.mjs";

let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    scene: [BattleScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    }
};
window.game = new Phaser.Game(config);
window.vue = new VueUI();
window.io = new SocketIO();
