export class Button {
    constructor(scene, posX, posY, texture, text, fontSize, fontColor){

        this.image = scene.add.image(posX, posY, texture, 0);
        this.image.setOrigin(0.0, 0.0);
        this.image.setInteractive();
        this.image.on('pointerover', function(pointer){
            this.image.setFrame(1);
        }, this);
        this.image.on('pointerout', function(pointer){
            this.image.setFrame(0);
        }, this);
        this.image.on('pointerdown', function(pointer){
            this.image.setFrame(2);
        }, this);

        this.text = scene.add.text(this.image.x + this.image.width/2, this.image.y + 8, text, { fontFamily: 'Arial', fontSize: fontSize, color: fontColor });
        this.text.setOrigin(0.5, 0.0);
    }

    moveAt(posX, posY){
        this.image.x = posX;
        this.image.y = posY;
        this.text.x = this.image.x + this.image.width/2;
        this.text.y = this.image.y + 8;
    }
}