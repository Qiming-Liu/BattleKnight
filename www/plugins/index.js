import StartScene
    from "../scenes/StartScene.mjs";
import BattleScene
    from "../scenes/BattleScene.mjs";

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    let config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
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
    };

    new Phaser.Game(config);
}
//用于js调试
let config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
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
};

window.game = new Phaser.Game(config);
