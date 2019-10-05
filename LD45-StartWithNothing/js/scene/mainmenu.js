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
        let btnPlay = this.addButton(this, 0, 0);
        let txtPlay = this.add.text(btnPlay.x + btnPlay.width/2, btnPlay.y + 8, playTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        txtPlay.setOrigin(0.5, 0.0);

        let optionsTranslation = this.translator.getTranslationFor(this, "MainMenuScene","options");
        let btnOptions = this.addButton(this, 0, 38);
        let txtOptions = this.add.text(btnOptions.x + btnOptions.width/2, btnOptions.y + 8, optionsTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        txtOptions.setOrigin(0.5, 0.0);
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