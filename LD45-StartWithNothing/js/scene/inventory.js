export class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
    }

    init(){
        this.managerScene = this.scene.get('ManagerScene');
        this.translator = this.managerScene.translator;
        this.controls = this.managerScene.controls;
    }

    preload() {
        this.load.audio('bagcrunch', 'asset/object-paperbagcrunch01.wav');
    }

    create() {
        let widthCenter = this.game.config.width/2;
        let heightCenter = this.game.config.height/2;

        this.background = this.add.image(80, 40, 'inventory');
        this.background.setOrigin(0.0, 0.0);

        let titleTranslation = this.translator.getTranslationFor(this, "InventoryScene","title");
        this.title = this.add.text(widthCenter, 50, titleTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.title.x = this.title.x - this.title.width/2;

        this.inventoryKey = this.input.keyboard.addKey(this.controls.inventoryKey);

        this.sound.add('bagcrunch', { loop: false, volume: 0.10}).play();
    }

    update(time, delta) {
        if(Phaser.Input.Keyboard.JustDown(this.inventoryKey)){
            this.managerScene.hideInventoryScene(this);
        }
    }
}