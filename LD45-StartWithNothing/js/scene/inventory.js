export class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
        this.cells = [];
        this.itemsImages = [];
        this.itemsTexts = [];
    }

    init(){
        this.managerScene = this.scene.get('ManagerScene');
        this.translator = this.managerScene.translator;
        this.controls = this.managerScene.controls;
        this.gameScene = this.scene.get('GameScene');
        this.inventory = this.gameScene.inventory;
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

        // CELLS
        let cellStartX = 80+77;
        let cellStartY = 40+75;

        for(let y=0;y<3;y++){
            this.cells[y] = [];
            this.itemsImages[y] = [];
            this.itemsTexts[y] = [];
            for(let x=0;x<8;x++){

                let cell = this.add.image(cellStartX + (x * (64 + 19)), cellStartY + (y * (64 + 19)), 'inventoryCell').setInteractive();
                cell.setOrigin(0.0, 0.0);
                cell.on('pointerover', function(pointer){
                    if(cell.alpha !== 0.1){
                        cell.alpha = 0.1;
                    }
                }, this);
                cell.on('pointerout', function(pointer){
                    if(cell.alpha !== 1.0){
                        cell.alpha = 1.0;
                    }
                }, this);
                this.cells[y][x] = cell;

                if(this.inventory.objects[x + (y * 8)] !== undefined){
                    let objectName = this.inventory.objects[x + (y * 8)].object.name;
                    if(objectName === "wood"){
                        this.itemsImages[y][x] = this.add.image(cellStartX + (x * (64 + 19)), cellStartY + (y * (64 + 19)), 'woodCell');
                        this.itemsImages[y][x].setOrigin(0.0, 0.0);

                        this.itemsTexts[y][x] = this.add.text(this.itemsImages[y][x].x + 64, this.itemsImages[y][x].y + 64, this.inventory.objects[x + (y * 8)].quantity, 20, '#ffffff');
                        this.itemsTexts[y][x].setOrigin(1.0, 1.0);
                    }
                }
            }
        }

        this.inventoryKey = this.input.keyboard.addKey(this.controls.inventoryKey);

        this.sound.add('bagcrunch', { loop: false, volume: 0.10}).play();
    }

    update(time, delta) {
        if(Phaser.Input.Keyboard.JustDown(this.inventoryKey)){
            this.managerScene.hideInventoryScene(this);
        }
    }
}