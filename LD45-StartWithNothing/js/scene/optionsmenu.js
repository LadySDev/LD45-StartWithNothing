import { Button } from "../utils/button.js";

export class OptionsMenuScene extends Phaser.Scene {
    constructor() {
        super('OptionsMenuScene');
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

        // Scene Title
        let titleTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","title");
        this.title = this.add.text(widthCenter, 50, titleTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.title.x = this.title.x - this.title.width/2;

        let controlsTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","controls");
        let btnControls = new Button(this, widthCenter, heightCenter, 'button', controlsTranslation, 20, '#ffffff');
        btnControls.moveAt(btnControls.image.x - btnControls.image.width/2, btnControls.image.y - btnControls.image.height/2);
        btnControls.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'ControlsMenuScene');
        }, this);

        let returnTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","return");
        this.btnReturn = new Button(this, widthCenter, this.game.config.height - 50, 'button', returnTranslation, 20, '#ffffff');
        this.btnReturn.moveAt(this.btnReturn.image.x - this.btnReturn.image.width/2, this.btnReturn.image.y - this.btnReturn.image.height);
        this.btnReturn.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'MainMenuScene');
        }, this);
    }

    update(time, delta) {

    }
}