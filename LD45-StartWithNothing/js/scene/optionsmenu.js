import { Button } from "../utils/button.js";
import { Dropdown } from "../utils/dropdown.js";

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

        // SCENE TITLE
        let titleTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","title");
        this.title = this.add.text(widthCenter, 50, titleTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.title.x = this.title.x - this.title.width/2;


        let controlsTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","controls");
        this.btnControls = new Button(this, widthCenter, heightCenter, 'button', controlsTranslation, 20, '#ffffff');
        this.btnControls.moveAt(this.btnControls.image.x - this.btnControls.image.width/2, this.btnControls.image.y - this.btnControls.image.height);
        this.btnControls.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'ControlsMenuScene');
        }, this);

        let leftColPosX = widthCenter - 10;
        let rightColPosX = widthCenter + 10;

        let languageTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","language");
        this.textLanguage = this.add.text(leftColPosX, this.btnControls.image.y + 38 + 8, languageTranslation, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        this.textLanguage.setOrigin(1.0, 0.0);

        let languagesCode = this.managerScene.languages;
        let currentLanguage = null;
        let languages = [];
        for(let language in languagesCode){
            let translation = this.translator.getTranslationFor(this, "OptionsMenuScene", language);
            if(this.managerScene.langCode === languagesCode[language]){
                currentLanguage = translation;
            }
            languages.push(translation);
        }

        this.dropdownLanguages = new Dropdown(this, rightColPosX, this.btnControls.image.y + 38, 'dropdown', 26, currentLanguage, 20, '#ffffff', 'dropdownList', languages, 20, '#ffffff');
        for(let i=0;i<this.dropdownLanguages.choicesImages.length;i++){
            this.dropdownLanguages.choicesImages[i].on('pointerdown', function(pointer){
                let key = this.translator.getTranslationKey(this, "OptionsMenuScene", this.dropdownLanguages.choicesTexts[i].text);
                if(key !== null){
                    this.managerScene.langCode = this.managerScene.languages[key];
                }
                else{
                    this.managerScene.langCode = this.managerScene.languages["english"];
                }
                this.updateTexts();
            }, this);
        }

        // BUTTON RETURN
        let returnTranslation = this.translator.getTranslationFor(this, "OptionsMenuScene","return");
        this.btnReturn = new Button(this, widthCenter, this.game.config.height - 50, 'button', returnTranslation, 20, '#ffffff');
        this.btnReturn.moveAt(this.btnReturn.image.x - this.btnReturn.image.width/2, this.btnReturn.image.y - this.btnReturn.image.height);
        this.btnReturn.image.on('pointerdown', function(pointer){
            this.managerScene.startScene(this, 'MainMenuScene');
        }, this);
    }

    update(time, delta) {

    }

    updateTexts(){
        this.title.text = this.translator.getTranslationFor(this, "OptionsMenuScene","title");
        this.btnControls.text.text = this.translator.getTranslationFor(this, "OptionsMenuScene","controls");
        this.textLanguage.text = this.translator.getTranslationFor(this, "OptionsMenuScene","language");

        let languagesCode = this.managerScene.languages;
        let currentLanguage = null;
        let languages = [];
        for(let language in languagesCode){
            let translation = this.translator.getTranslationFor(this, "OptionsMenuScene", language);
            if(this.managerScene.langCode === languagesCode[language]){
                currentLanguage = translation;
            }
            languages.push(translation);
        }

        this.dropdownLanguages.textDefault.text = currentLanguage;

        for(let i=0;i<this.dropdownLanguages.choicesTexts.length;i++){
            this.dropdownLanguages.choicesTexts[i].text = languages[i];
        }

        this.btnReturn.text.text = this.translator.getTranslationFor(this, "OptionsMenuScene","return");
    }
}