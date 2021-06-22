import StartScene
    from "../scenes/StartScene.mjs";
import BattleScene
    from "../scenes/BattleScene.mjs";
import VueUI
    from "../modules/VueUI.mjs";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'game',
        width: 1280,
        height: 720,
        scene: [StartScene, BattleScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: true
            }
        }
    });
    window.vue = new VueUI();
}

//development
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
    scene: [StartScene, BattleScene],
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
// window.vue = new VueUI();