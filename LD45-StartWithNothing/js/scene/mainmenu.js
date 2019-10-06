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
        let widthCenter = this.game.config.width/2;
        let heightCenter = this.game.config.height/2;

        let playTranslation = this.translator.getTranslationFor(this, "MainMenuScene","play");
        let btnPlay = new Button(this, widthCenter, heightCenter, 'button', playTranslation, 20, '#ffffff');
        btnPlay.moveAt(btnPlay.image.x - btnPlay.image.width/2, btnPlay.image.y - btnPlay.image.height);
        btnPlay.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'GameScene');
        }, this);

        let optionsTranslation = this.translator.getTranslationFor(this, "MainMenuScene","options");
        let btnOptions = new Button(this, btnPlay.image.x, btnPlay.image.y + 38, 'button', optionsTranslation, 20, '#ffffff');
        btnOptions.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'OptionsMenuScene');
        }, this);
    }

    update(time, delta) {

    }
}