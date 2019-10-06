export class Character {
    constructor() {
        this.sprite = null;

        this.states = [];
        this.currentState = null;

        this.animations = [];
        this.currentAnimation = null;

        this.sounds = [];
        this.currentSound = null;

        this.velocity = 0;
    }

    addSprite(scene, posX, posY, texture, frame) {
        this.sprite = scene.physics.add.sprite(posX, posY, texture, frame);
        this.sprite.setOrigin(0.0, 0.0);
    }

    addState(name, animation, sound) {
        this.states.push(name);

        if(animation !== null){
            this.animations.push(animation);
        }

        if(sound !== null){
            this.sounds.push(sound);
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
        if(this.currentState !== state){
            this.currentState = state;
            for(let animation in this.animations){
                if(this.animations[animation].key === state){
                    this.currentAnimation = this.animations[animation];
                    break;
                }
            }

            if(this.currentAnimation !== null && !this.currentAnimation.isPlaying){
                this.sprite.play(this.currentAnimation);
            }
        }
    }

    setVelocity(velocity){
        this.velocity = velocity;
    }
}