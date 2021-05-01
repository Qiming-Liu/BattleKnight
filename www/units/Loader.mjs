import human01 from '../units/human/01.mjs'
import humanbase from '../units/human/base.mjs'

export default class Loader {
    static LoadHuman(scene){
        let frameConfig = {
            frameWidth: 128,
            frameHeight: 128
        };
        for (let i = 1; i < 21; i++) {
            scene.load.spritesheet('human' + num2(i), 'units/human/' + num2(i) + '.png', frameConfig);
        }
        scene.load.plugin('rexshakepositionplugin', '../rexshakepositionplugin.min.js', true);
    }
    static getDefault(key){
        switch (key){
            case 'humanbase':
                return humanbase;
            case 'human01':
                return human01;
        }
    }
}
function num2(n) {
    if (n < 10) return '0' + n;
    return '' + n;
}