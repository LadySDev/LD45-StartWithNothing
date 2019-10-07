export class Character {
    constructor() {
        this.sprite = null;

        this.statesObjects = [];
        this.currentStateObject = null;

        this.velocity = 0;
    }

    addSprite(scene, posX, posY, texture, frame) {
        this.sprite = scene.physics.add.sprite(posX, posY, texture, frame);
        this.sprite.setOrigin(0.0, 0.0);
        this.sprite.setSize(26, 8).setOffset(52, 120);
    }

    addStateObject(name, animation, sound) {
        this.statesObjects.push({state: name, animation: animation, sound: sound});
    }

    getStateObject(name){
        for(let object in this.statesObjects){
            if(this.statesObjects[object].state === name){
                return this.statesObjects[object];
            }
        }
        return null;
    }

    setCurrentStateObject(name){
        if(this.currentStateObject === null || this.currentStateObject.state !== name){
            this.currentStateObject = this.getStateObject(name);

            if(this.currentStateObject.animation !== null && !this.currentStateObject.animation.isPlaying){
                this.sprite.play(this.currentStateObject.animation);
            }

            if(this.currentStateObject.sound !== null && !this.currentStateObject.sound.isPlaying){
                this.currentStateObject.sound.play();
            }
        }
    }

    setVelocity(velocity){
        this.velocity = velocity;
    }
}