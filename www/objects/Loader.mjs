import knightBase01
    from '../objects/knight/Base01.mjs'
import knightSavage
    from '../objects/knight/Savage.mjs'
import knightKnightLV1
    from '../objects/knight/KnightLV1.mjs'


export default class Loader {
    static Load(scene) {
        scene.load.plugin('rexshakepositionplugin', '../rexshakepositionplugin.min.js', true);
        scene.load.plugin('rexfadeplugin', '../rexfadeplugin.min.js', true);

        this.loadKey(scene, 'knightBase01');
        this.loadKey(scene, 'knightSavage');
        this.loadKey(scene, 'knightKnightLV1');
    }

    static getDefault(key) {
        switch (key) {
            case 'knightBase01':
                return knightBase01;
            case 'knightSavage':
                return knightSavage;
            case 'knightKnightLV1':
                return knightKnightLV1;
        }
    }

    static loadKey(scene, key) {
        let context = this.getDefault(key);
        let frameConfig = {};
        switch (context.description.type) {
            case 'unit': {
                frameConfig = {
                    frameWidth: 128,
                    frameHeight: 128
                }
                break;
            }
            case 'building': {
                frameConfig = {
                    frameWidth: 256,
                    frameHeight: 787
                }
                break;
            }
        }
        scene.load.spritesheet(key, this.getDefault(key).description.image, frameConfig);
        scene.load.spritesheet(key + '.icon', this.getDefault(key).description.icon, frameConfig);
    }
}