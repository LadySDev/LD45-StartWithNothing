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
        // let btnOptions = this.addButton(this, 0, 38);
        // let txtOptions = this.add.text(btnOptions.x + btnOptions.width/2, btnOptions.y + 8, optionsTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        // txtOptions.setOrigin(0.5, 0.0);
    }

    update(time, delta) {

    }

    addButton(scene, posX, posY){
        let button = scene.add.image(posX, posY, 'button', 0);
        button.setOrigin(0.0, 0.0);
        button.setInteractive();
        button.on('pointerover', function(pointer){
            button.setFrame(1);
        }, this);
        button.on('pointerout', function(pointer){
            button.setFrame(0);
        }, this);
        button.on('pointerdown', function(pointer){
            button.setFrame(2);
        }, this);
        return button;
    }
}