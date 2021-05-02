import knightBase01 from '../objects/knight/Base01.mjs'
import knightSavage from '../objects/knight/Savage.mjs'


export default class Loader {
    static Load(scene){
        scene.load.plugin('rexshakepositionplugin', '../rexshakepositionplugin.min.js', true);

        this.loadKey(scene, 'knightBase01');
        this.loadKey(scene, 'knightSavage');
    }

    static getDefault(key){
        switch (key){
            case 'knightBase01':
                return knightBase01;
            case 'knightSavage':
                return knightSavage;
        }
    }

    static loadKey(scene, key){
        let context = this.getDefault(key);
        let frameConfig = {};
        switch (context.description.type) {
            case "unit":{
                frameConfig = {
                    frameWidth: 128,
                    frameHeight: 128
                }
            }
            case "building":{
                frameConfig = {
                    frameWidth: 256,
                    frameHeight: 787
                }
            }
        }
        scene.load.spritesheet(key, this.getDefault(key).description.image, frameConfig);
    }
}