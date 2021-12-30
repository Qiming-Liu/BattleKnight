import BattleScene
    from "./scenes/BattleScene.mjs";
import VueUI
    from "./modules/VueUI.mjs";
import SocketIO
    from "./modules/SocketIO.mjs";

const PieceLevelList = {
    1: ['Savage', 'Knight', 'Mage', 'Militia', 'Archer'],
    2: ['IronKnight', 'CrystalKnight', 'Explorer'],
    3: ['UnicornKnight', 'WindArcher'],
    4: ['EliteKnight'],
    5: ['HolyKnight'],
    6: ['DoomKnight']
}
const PieceLevelProbability = {
    1: [0.7, 0.3, 0, 0, 0, 0],
    2: [0.5, 0.4, 0.1, 0, 0, 0],
    3: [0.3, 0.3, 0.3, 0.1, 0, 0],
    4: [0.2, 0.2, 0.3, 0.3, 0, 0],
    5: [0.1, 0.2, 0.2, 0.3, 0.2, 0],
    6: [0.1, 0.1, 0.2, 0.2, 0.3, 0.1]
}

window.randomPieces = function (level) {
    let value = Phaser.Math.FloatBetween(0, 1);
    let pieceLevel = 0;
    while (value > 0) {
        value -= PieceLevelProbability[level][pieceLevel];
        pieceLevel++;
    }
    return PieceLevelList[pieceLevel][Phaser.Math.Between(0, PieceLevelList[pieceLevel].length - 1)];
}

window.config = {
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
            }
        }
    }
};
window.vue = new VueUI();
window.vue.hide('game');
window.io = new SocketIO();
window.gameStart = function (gameInfo) {
    window.gameInfo = gameInfo;
    window.targetID = 0;
    window.game = new Phaser.Game(window.config);
}
