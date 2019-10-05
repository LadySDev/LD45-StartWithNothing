import { Button } from "../utils/button.js";

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    init(){
        this.managerScene = this.scene.get('ManagerScene');
        this.translator = this.managerScene.translator;
    }

    preload() {

    }

    create() {
        let playTranslation = this.translator.getTranslationFor(this, "MainMenuScene","play");
        let btnPlay = new Button(this, 0, 0, 'button', playTranslation, 20, '#ffffff');

        let optionsTranslation = this.translator.getTranslationFor(this, "MainMenuScene","options");
        let btnOptions = new Button(this, 0, 38, 'button', optionsTranslation, 20, '#ffffff');
    }

    update(time, delta) {

    }
}