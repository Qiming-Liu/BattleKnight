const fs = require("fs");
const path = require("path");

let list = [];

function listFile(dir) {
    let arr = fs.readdirSync(dir);
    arr.forEach(function (item) {
        let fullPath = path.join(dir, item);
        let stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            listFile(fullPath);
        } else if (parser(fullPath).name !== 'example') {
            list.push(fullPath);
        }
    });
}

function parser(path) {
    let name = path.substring(path.lastIndexOf('\\') + 1).replace('.mjs', '');
    let filePath = path.replace(/\\/g, '/').replace('public', '..');
    return {
        name: name,
        path: filePath
    };
}

listFile("./public/objects");

let content = '';
for (let i = 0; i < list.length; i++) {
    let file = parser(list[i]);
    content += 'import ' + file.name + ' from ' + '\"' + file.path + '\";\n';
}
content += '\n';
content += `export default class Loader {
    static preload(scene) {\n`;
for (let i = 0; i < list.length; i++) {
    let file = parser(list[i]);
    content += '        this.loadKey(scene, \'' + file.name + '\');\n';
}
content += `    }

    static getDefault(key, level) {
        switch (key) {\n`;
for (let i = 0; i < list.length; i++) {
    let file = parser(list[i]);
    content += '            case \'' + file.name + '\':\n                return ' + file.name + '(level);\n';
}
content += `        }
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
}`;

exports.create = function () {
    fs.writeFileSync('./public/modules/Loader.mjs', content);
};