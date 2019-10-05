export class Translator {
    constructor(managerScene){
        this.managerScene = managerScene;
    }

    getTranslationFor(scene, sceneName, variable){
        let langCode = this.managerScene.langCode;
        let data = scene.cache.json.get(langCode);
        return data[sceneName][variable];
    }

    getTranslationKey(scene, sceneName, value){
        let langCode = this.managerScene.langCode;
        let data = scene.cache.json.get(langCode);
        for(let key in data[sceneName]){
            if(data[sceneName][key] === value){
                return key;
            }
        }
        return null;
    }
}