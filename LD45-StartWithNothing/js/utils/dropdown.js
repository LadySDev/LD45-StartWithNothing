export class Dropdown {
    constructor(scene, posX, posY, textureDropdown, arrowPartSize, defaultChoice, defaultFontSize, defaultFontColor, textureChoiceList, choiceList, fontSize, fontColor){
        this.image = scene.add.image(posX, posY, textureDropdown, 0);
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
            this.showChoiceList();
        }, this);

        this.textDefault = scene.add.text(this.image.x + (this.image.width - arrowPartSize)/2, this.image.y + 8, defaultChoice, { fontFamily: 'Arial', fontSize: defaultFontSize, color: defaultFontColor });
        this.textDefault.setOrigin(0.5, 0.0);

        this.choicesImages = [];
        this.choicesTexts = [];
        for(let i=0;i<choiceList.length;i++){
            let frame = 0;
            if(i === choiceList.length-1){
                frame = 2;
            }

            let choiceImage = scene.add.image(this.image.x, this.image.y + ((i + 1) * 38), textureChoiceList, frame);
            choiceImage.setOrigin(0.0, 0.0);
            choiceImage.setInteractive();
            choiceImage.on('pointerover', function(pointer){
                if(choiceImage.frame.name === 0){
                    choiceImage.setFrame(1);
                }
                else if(choiceImage.frame.name === 2){
                    choiceImage.setFrame(3);
                }
            }, this);
            choiceImage.on('pointerout', function(pointer){
                if(choiceImage.frame.name === 1){
                    choiceImage.setFrame(0);
                }
                else if(choiceImage.frame.name === 3){
                    choiceImage.setFrame(2);
                }
            }, this);

            choiceImage.on('pointerdown', function(pointer){
                let index = this.choicesImages.indexOf(choiceImage);
                this.textDefault.text = this.choicesTexts[index].text;
                this.hideChoiceList();
            }, this);

            choiceImage.setVisible(false);
            this.choicesImages.push(choiceImage);

            let choiceText = scene.add.text(choiceImage.x + (choiceImage.width - arrowPartSize)/2, choiceImage.y + 8, choiceList[i], { fontFamily: 'Arial', fontSize: fontSize, color: fontColor });
            choiceText.setOrigin(0.5, 0.0);

            choiceText.setVisible(false);
            this.choicesTexts.push(choiceText);
        }
    }

    showChoiceList(){
        for(let i=0;i<this.choicesImages.length;i++){
            this.choicesImages[i].setVisible(true);
            this.choicesTexts[i].setVisible(true);
        }
    }

    hideChoiceList(){
        for(let i=0;i<this.choicesImages.length;i++){
            this.choicesImages[i].setVisible(false);
            this.choicesTexts[i].setVisible(false);
        }
    }
}