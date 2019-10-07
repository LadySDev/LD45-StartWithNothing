import {Button} from "../utils/button";

export class ControlsMenuScene extends Phaser.Scene {
    constructor(){
        super('ControlsMenuScene');
    }

    init(){
        this.managerScene = this.scene.get('ManagerScene');
        this.translator = this.managerScene.translator;
        this.controls = this.managerScene.controls;

        this.moveUpKeyIsChanging = false;
        this.moveDownKeyIsChanging = false;
        this.moveLeftKeyIsChanging = false;
        this.moveRightKeyIsChanging = false;
        this.actionKeyIsChanging = false;
        this.menuKeyIsChanging = false;
        this.inventoryKeyIsChanging = false;
    }

    preload() {

    }

    create() {
        let widthCenter = this.game.config.width/2;

        // Scene Title
        let titleTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","title");
        this.title = this.add.text(widthCenter, 50, titleTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.title.x = this.title.x - this.title.width/2;

        let colsPosY = this.title.y + 100;
        let leftColPosX = widthCenter - 10;
        let rightColPosX = widthCenter + 10;

        // Left Column
        let moveUpTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","moveUp");
        this.textMoveUp = this.add.text(leftColPosX, colsPosY + 0 + 8, moveUpTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textMoveUp.setOrigin(1.0, 0.0);

        let moveDownTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","moveDown");
        this.textMoveDown = this.add.text(this.textMoveUp.x, this.textMoveUp.y +38, moveDownTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textMoveDown.setOrigin(1.0, 0.0);

        let moveLeftTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","moveLeft");
        this.textMoveLeft = this.add.text(this.textMoveDown.x, this.textMoveDown.y +38, moveLeftTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textMoveLeft.setOrigin(1.0, 0.0);

        let moveRightTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","moveRight");
        this.textMoveRight = this.add.text(this.textMoveLeft.x, this.textMoveLeft.y +38, moveRightTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textMoveRight.setOrigin(1.0, 0.0);

        let menuTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","menu");
        this.textMenu = this.add.text(this.textMoveRight.x, this.textMoveRight.y +38, menuTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textMenu.setOrigin(1.0, 0.0);

        let actionTranslation  = this.translator.getTranslationFor(this, "ControlsMenuScene","action");
        this.textAction = this.add.text(this.textMenu.x, this.textMenu.y +38, actionTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textAction.setOrigin(1.0, 0.0);

        let inventoryTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","inventory");
        this.textInventory = this.add.text(this.textAction.x, this.textAction.y +38, inventoryTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textInventory.setOrigin(1.0, 0.0);

        // Right Column
        this.getControlsKey();

        this.btnMoveUpKey = new Button(this, rightColPosX, colsPosY +0, 'button', this.moveUpKey, 20, '#ffffff');
        this.btnMoveUpKey.image.on('pointerdown', function(pointer){
            this.controls.moveUpKey = "...";
            this.moveUpKeyIsChanging = true;
        }, this);

        this.btnMoveDownKey = new Button(this, this.btnMoveUpKey.image.x, this.btnMoveUpKey.image.y +38, 'button', this.moveDownKey, 20, '#ffffff');
        this.btnMoveDownKey.image.on('pointerdown', function(pointer){
            this.controls.moveDownKey = "...";
            this.moveDownKeyIsChanging = true;
        }, this);

        this.btnMoveLeftKey = new Button(this, this.btnMoveDownKey.image.x, this.btnMoveDownKey.image.y +38, 'button', this.moveLeftKey, 20, '#ffffff');
        this.btnMoveLeftKey.image.on('pointerdown', function(pointer){
            this.controls.moveLeftKey = "...";
            this.moveLeftKeyIsChanging = true;
        }, this);

        this.btnMoveRightKey = new Button(this, this.btnMoveLeftKey.image.x, this.btnMoveLeftKey.image.y +38, 'button', this.moveRightKey, 20, '#ffffff');
        this.btnMoveRightKey.image.on('pointerdown', function(pointer){
            this.controls.moveRightKey = "...";
            this.moveRightKeyIsChanging = true;
        }, this);

        this.btnMenuKey = new Button(this, this.btnMoveRightKey.image.x, this.btnMoveRightKey.image.y +38, 'button', this.menuKey, 20, '#ffffff');
        this.btnMenuKey.image.on('pointerdown', function(pointer){
            this.controls.menuKey = "...";
            this.menuKeyIsChanging = true;
        }, this);

        this.btnActionKey = new Button(this, this.btnMenuKey.image.x, this.btnMenuKey.image.y +38, 'button', this.actionKey, 20, '#ffffff');
        this.btnActionKey.image.on('pointerdown', function(pointer){
            this.controls.actionKey = "...";
            this.actionKeyIsChanging = true;
        }, this);

        this.btnInventoryKey = new Button(this, this.btnActionKey.image.x, this.btnActionKey.image.y +38, 'button', this.inventoryKey, 20, '#ffffff');
        this.btnInventoryKey.image.on('pointerdown', function(pointer){
            this.controls.inventoryKey = "...";
            this.inventoryKeyIsChanging = true;
        }, this);


        let returnTranslation = this.translator.getTranslationFor(this, "ControlsMenuScene","return");
        this.btnReturn = new Button(this, widthCenter, this.game.config.height - 50, 'button', returnTranslation, 20, '#ffffff');
        this.btnReturn.moveAt(this.btnReturn.image.x - this.btnReturn.image.width/2, this.btnReturn.image.y - this.btnReturn.image.height);
        this.btnReturn.image.on('pointerdown', function(pointer){
            if(this.controls.moveUpKey !== "..."
                && this.controls.moveDownKey !== "..."
            && this.controls.moveLeftKey !== "..."
            && this.controls.moveRightKey !== "..."
            && this.controls.menuKey !== "..."
            && this.controls.actionKey !== "..."
            && this.controls.inventoryKey !== "..."){
                this.managerScene.startScene(this, 'OptionsMenuScene');
            }
        }, this);

        this.input.keyboard.on('keydown', function (event) {

            let keycodes = Phaser.Input.Keyboard.KeyCodes;
            let keyCode = event.keyCode;

            if(this.moveUpKeyIsChanging === true) {
                this.controls.moveUpKey = this.searchKey(keycodes, keyCode);
                if(this.controls.moveUpKey === null){
                    this.controls.moveUpKey = "Z";
                }
                this.moveUpKeyIsChanging = false;
            }
            else if(this.moveDownKeyIsChanging === true){
                this.controls.moveDownKey = this.searchKey(keycodes, keyCode);
                if(this.controls.moveDownKey === null){
                    this.controls.moveDownKey = "S";
                }
                this.moveDownKeyIsChanging = false;
            }
            else if(this.moveLeftKeyIsChanging === true){
                this.controls.moveLeftKey = this.searchKey(keycodes, keyCode);
                if(this.controls.moveLeftKey === null){
                    this.controls.moveLeftKey = "Q";
                }
                this.moveLeftKeyIsChanging = false;
            }
            else if(this.moveRightKeyIsChanging === true){
                this.controls.moveRightKey = this.searchKey(keycodes, keyCode);
                if(this.controls.moveRightKey === null){
                    this.controls.moveRightKey = "D";
                }
                this.moveRightKeyIsChanging = false;
            }
            else if(this.menuKeyIsChanging === true){
                this.controls.menuKey = this.searchKey(keycodes, keyCode);
                if(this.controls.menuKey === null){
                    this.controls.menuKey = "ESC";
                }
                this.menuKeyIsChanging = false;
            }
            else if(this.actionKeyIsChanging === true){
                this.controls.actionKey = this.searchKey(keycodes, keyCode);
                if(this.controls.actionKey === null){
                    this.controls.actionKey = "SPACE";
                }
                this.menuKeyIsChanging = false;
            }
            else if(this.inventoryKeyIsChanging === true){
                this.controls.inventoryKey = this.searchKey(keycodes, keyCode);
                if(this.controls.inventoryKey === null){
                    this.controls.inventoryKey = "I";
                }
                this.inventoryKeyIsChanging = false;
            }
        }, this);
    }

    update(time, delta) {
        this.getControlsKey();

        this.btnMoveUpKey.text.text = this.moveUpKey;
        this.btnMoveDownKey.text.text = this.moveDownKey;
        this.btnMoveLeftKey.text.text = this.moveLeftKey;
        this.btnMoveRightKey.text.text = this.moveRightKey;
        this.btnMenuKey.text.text = this.menuKey;
        this.btnActionKey.text.text = this.actionKey;
        this.btnInventoryKey.text.text = this.inventoryKey;
    }

    getControlsKey(){
        this.moveUpKey = this.controls.moveUpKey;
        this.moveDownKey = this.controls.moveDownKey;
        this.moveLeftKey = this.controls.moveLeftKey;
        this.moveRightKey = this.controls.moveRightKey;
        this.menuKey = this.controls.menuKey;
        this.actionKey = this.controls.actionKey;
        this.inventoryKey = this.controls.inventoryKey;
    }

    searchKey(keycodes, keyCode){
        for(let object in keycodes){
            if(keycodes[object] === keyCode){
                return object;
            }
        }
        return null;
    }
}