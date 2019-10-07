import { Translator }  from "../localization/translator.js";
import { Controls } from "../controls.js";
import { MainMenuScene }  from "./mainmenu.js";
import { OptionsMenuScene }  from "./optionsmenu.js";
import { ControlsMenuScene }  from "./controlsmenu.js";
import { GameScene }  from "./game.js";
import { PauseScene }  from "./pause.js";

export class ManagerScene extends Phaser.Scene {

    constructor() {
        super('ManagerScene');

        this.languages = {
            "english": "en-gb",
            "french": "fr-fr"
        };
        this.langCode = this.languages["english"];
        this.translator = new Translator(this);

        this.controls = new Controls();
    }

    preload() {
        this.load.spritesheet('button', 'asset/button.png', { frameWidth: 100, frameHeight: 38 });
        this.load.spritesheet('dropdown', 'asset/dropdown.png', { frameWidth: 132, frameHeight: 38 });
        this.load.spritesheet('dropdownList', 'asset/dropdownList.png', { frameWidth: 132, frameHeight: 38 });

        this.load.spritesheet('player', 'asset/player.png', { frameWidth: 128, frameHeight: 128 });

        this.load.json('en-gb', 'translations/en-gb.json');
        this.load.json('fr-fr', 'translations/fr-fr.json');
    }

    create() {
        this.scene.add('MainMenuScene', MainMenuScene, true);
        this.scene.add('OptionsMenuScene', OptionsMenuScene, false);
        this.scene.add('ControlsMenuScene', ControlsMenuScene, false);
        this.scene.add('GameScene', GameScene, false);
        this.scene.add('PauseScene', PauseScene, false);
    }

    update(time, delta) {

    }

    startScene(scene, sceneToStart){
        scene.scene.start(sceneToStart);
        scene.scene.stop(scene);
    }

    showPauseScene(scene) {
        scene.scene.launch('PauseScene');
        scene.scene.pause('GameScene');
    }

    hidePauseScene(scene){
        scene.scene.run('GameScene');
        scene.scene.stop('PauseScene');
    }

    quitGameScene(scene){
        scene.scene.start('MainMenuScene');
        scene.scene.stop('GameScene');
        scene.scene.stop('PauseScene');
    }
}