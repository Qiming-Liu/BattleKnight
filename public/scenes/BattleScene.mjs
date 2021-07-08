import Loader
    from "../modules/Loader.mjs";
import UnitsFactory
    from "../modules/UnitsFactory.mjs";
import Building
    from "../models/Building.mjs";
import Panel
    from "../modules/Panel.mjs";

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene');
        this.left = {}
        this.right = {}
        this.started = false;
    }

    preload() {
        //Noop
        this.game.registry.events._events.blur = [];
        this.game.registry.events._events.focus = [];
        this.game.registry.events._events.hidden = [];

        function noop(nothing) {
        }

        this.game.onBlur = () => noop("blur");
        this.game.onFocus = () => noop("focus");
        this.game.onPause = () => noop("pause");
        this.focusLoss = () => noop("focusloss");
        this.focusGain = () => noop("focusgain");

        this.load.setBaseURL('./assets/');

        //scenes
        this.load.image('background', 'scenes/background.png');
        this.load.image('panel', 'scenes/panel.png');
        this.load.image('ground', 'scenes/ground.png');

        //panel
        this.load.image('Dice_1', 'panel/Dice_1.png');
        this.load.image('Dice_2', 'panel/Dice_2.png');
        this.load.image('Dice_3', 'panel/Dice_3.png');
        this.load.image('Dice_4', 'panel/Dice_4.png');
        this.load.image('Dice_5', 'panel/Dice_5.png');
        this.load.image('Dice_6', 'panel/Dice_6.png');
        this.load.image('Refresh', 'panel/Refresh.png');
        this.load.image('Skill', 'panel/Skill.png');
        this.load.image('Upgrade', 'panel/Upgrade.png');
        this.load.image('Setting', 'panel/Setting.png');
        this.load.image('Bin', 'panel/Bin.png');

        //plugin
        this.load.plugin('rexshakepositionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshakepositionplugin.min.js', true);
        this.load.plugin('rexfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfadeplugin.min.js', true);
        this.load.plugin('rexdragplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdragplugin.min.js', true);

        //music
        this.load.audio('bgm', 'bgm.mp3');

        //objects
        Loader.preload(this);

        this.physics.world.setFPS(60);
    }

    create() {
        //Background
        this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.375, 'background');

        //Panel
        this.panel = new Panel(this);

        //Ground
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.game.config.width * 0.5, this.game.config.height * 0.71, 'ground', null, false, true);

        //基地
        this.left.Base = new Building(this, this.game.config.width * 0.08, 0, 'Base01', 'left');
        this.right.Base = new Building(this, this.game.config.width * 0.92, 0, 'Base01', 'right');

        //刷兵
        this.left.UnitsFactory = new UnitsFactory(this, 'left');
        this.right.UnitsFactory = new UnitsFactory(this, 'right');

        //Music
        this.music = this.sound.add('bgm', {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        //Finish loading
        window.io.finishLoading();
    }

    update(time, delta) {
        if (this.started) {
            this.right.UnitsFactory.tick(this.left, delta);
            this.left.UnitsFactory.tick(this.right, delta);
            this.left.Base.tick(this.right.UnitsFactory.UnitsList, delta);
            this.right.Base.tick(this.left.UnitsFactory.UnitsList, delta);
            this.panel.bar.tick(delta);
            for (let i = 0; i < this.panel.pool.pieces.length; i++) {
                this.panel.pool.pieces[i].tick(delta);
            }
            if (!this.music.isPlaying) {
                this.music.play();
            }
            if (window.gameInfo.direction === 'left') {
                window.io.tick(this.left, this.right);
            }
        }
    }
}