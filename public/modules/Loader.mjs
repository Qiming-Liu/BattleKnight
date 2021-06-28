import Base01 from "../objects/Base01.mjs";
import Savage from "../objects/Savage.mjs";

export default class Loader {
    static preload(scene) {
        this.loadKey(scene, 'Base01');
        this.loadKey(scene, 'Savage');
    }

    static getDefault(key, level) {
        switch (key) {
            case 'Base01':
                return Base01(level);
            case 'Savage':
                return Savage(level);
        }
    }

    static loadKey(scene, key) {
        let context = this.getDefault(key, 0);
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
        scene.load.spritesheet(key, context.description.image, frameConfig);
    }
}