export class Character {
    constructor() {
        this.sprite = null;
        this.states = [];
        this.currentState = null;
        this.animations = [];
        this.currentAnimation = null;
    }

    addSprite(scene, posX, posY, texture, frame) {
        this.sprite = scene.add.sprite(posX, posY, texture, frame);
        this.sprite.setOrigin(0.0, 0.0);
    }

    addState(name, animation) {
        this.states.push(name);

        if(animation !== null){
            this.animations.push(animation);
        }
    }

    getState(name){
        for(let state in this.states){
            if(this.states[state] === name){
                return this.states[state];
            }
        }
        return null;
    }

    setCurrentState(state){
        this.currentState = state;
        let currentAnimation = null;
        for(let animation in this.animations){
            if(this.animations[animation].key === state){
                currentAnimation = this.animations[animation];
                break;
            }
        }

        if(currentAnimation !== null){
            this.sprite.play(currentAnimation);
        }
    }
}