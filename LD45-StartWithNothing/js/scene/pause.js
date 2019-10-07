import {Button} from "../utils/button";

export class PauseScene  extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    init() {
        this.managerScene = this.scene.get('ManagerScene');
        this.translator = this.managerScene.translator;
    }

    preload() {
    }

    create() {
        let widthCenter = this.game.config.width/2;
        let heightCenter = this.game.config.height/2;

        let titleTranslation = this.translator.getTranslationFor(this, "PauseScene","title");
        this.title = this.add.text(widthCenter, 50, titleTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.title.x = this.title.x - this.title.width/2;

        let resumeTranslation = this.translator.getTranslationFor(this, "PauseScene","resume");
        let btnResume = new Button(this, widthCenter, heightCenter, 'button', resumeTranslation, 20, '#ffffff');
        btnResume.moveAt(btnResume.image.x - btnResume.image.width/2, btnResume.image.y - btnResume.image.height);
        btnResume.image.on('pointerdown', function(pointer){
            this.managerScene.hidePauseScene(this);
        }, this);

        let quitTranslation = this.translator.getTranslationFor(this, "PauseScene","quit");
        let btnQuit = new Button(this, widthCenter, heightCenter, 'button', quitTranslation, 20, '#ffffff');
        btnQuit.moveAt(btnResume.image.x, btnResume.image.y + 38);
        btnQuit.image.on('pointerdown', function(pointer){
            this.managerScene.quitGameScene(this);
        }, this);
    }

    update(time, delta) {

    }
}