import { Translator }  from "../localization/translator.js";
import { MainMenuScene }  from "./mainmenu.js";

export class ManagerScene extends Phaser.Scene {

    constructor() {
        super('ManagerScene');

        const languages = {
            "english": "en-gb",
            "french": "fr-fr"
        };
        this.langCode = languages["english"];
        this.translator = new Translator(this);
    }

    preload() {
        this.load.spritesheet('button', 'asset/button.png', { frameWidth: 100, frameHeight: 38 });
        this.load.json('en-gb', 'translations/en-gb.json');
        this.load.json('fr-fr', 'translations/fr-fr.json');
    }

    create() {
        this.scene.add('MainMenuScene', MainMenuScene, true);
    }

    update(time, delta) {

    }
}