import { Character } from '../utils/character.js';
import { Moves } from "../utils/moves.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');

        this.player = new Character();
        this.player.setVelocity(100);

        this.moves = new Moves();
    }

    init(){
        this.managerScene = this.scene.get('ManagerScene');
        this.controls = this.managerScene.controls;
    }

    preload() {
        this.load.audio('squelch', 'asset/action-squelch06.wav');
    }

    create() {
        // PLAYER SPRITE
        this.player.addSprite(this, 0, 0, 'player', 0);

        // PLAYER ANIMATION & STATE IDLE DOWN
        let playerAnimIdleDown = this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0, first: 0 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleDown', playerAnimIdleDown, null);

        // PLAYER ANIMATION & STATE WALK DOWN
        let playerAnimWalkDown = this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7, first: 4 }),
            frameRate: 8,
            repeat: -1
        });

        let playerSoundSquelch = this.sound.add('squelch', { loop: true});

        this.player.addState('walkDown', playerAnimWalkDown, playerSoundSquelch);

        // PLAYER ANIMATION & STATE IDLE UP
        let playerAnimIdleUp = this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8, first: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleUp', playerAnimIdleUp, null);

        // PLAYER ANIMATION & STATE WALK UP
        let playerAnimWalkUp = this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15, first: 12 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkUp', playerAnimWalkUp, null);

        // PLAYER ANIMATION & STATE IDLE LEFT
        let playerAnimIdleLeft = this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 16, first: 16 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleLeft', playerAnimIdleLeft, null);

        // PLAYER ANIMATION & STATE WALK LEFT
        let playerAnimWalkLeft = this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23, first: 20 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkLeft', playerAnimWalkLeft, null);

        // PLAYER ANIMATION & STATE IDLE RIGHT
        let playerAnimIdleRight = this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 24, first: 24 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleRight', playerAnimIdleRight, null);

        // PLAYER ANIMATION & STATE WALK RIGHT
        let playerAnimWalkRight = this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 31, first: 28 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkRight', playerAnimWalkRight, null);

        // SET CURRENT STATE
        this.player.setCurrentState(this.player.getState('idleDown'));

        this.addControlKeys(this);
    }

    addControlKeys(scene){
        this.moveUpKey = scene.input.keyboard.addKey(this.controls.moveUpKey);
        this.moveDownKey = scene.input.keyboard.addKey(this.controls.moveDownKey);
        this.moveLeftKey = scene.input.keyboard.addKey(this.controls.moveLeftKey);
        this.moveRightKey = scene.input.keyboard.addKey(this.controls.moveRightKey);
    }

    update(time, delta) {

        if(this.moveUpKey.isDown){
            this.player.setCurrentState(this.player.getState('walkUp'));
            this.moves.moveUp(this.player.sprite, this.player.velocity);
        }
        else if(this.moveDownKey.isDown){
            this.player.setCurrentState(this.player.getState('walkDown'));
            this.moves.moveDown(this.player.sprite, this.player.velocity);
            if(!this.player.sounds[0].isPlaying){
                this.player.sounds[0].play();
            }
        }
        else if(this.moveLeftKey.isDown){
            this.player.setCurrentState(this.player.getState('walkLeft'));
            this.moves.moveLeft(this.player.sprite, this.player.velocity);
        }
        else if(this.moveRightKey.isDown){
            this.player.setCurrentState(this.player.getState('walkRight'));
            this.moves.moveRight(this.player.sprite, this.player.velocity);
        }
        else{
            let currentAnimation = this.player.currentAnimation;

            if(currentAnimation.key === 'walkUp'){
                this.player.setCurrentState(this.player.getState('idleUp'));
            }
            else if(currentAnimation.key === 'walkDown'){
                this.player.setCurrentState(this.player.getState('idleDown'));
            }
            else if(currentAnimation.key === 'walkLeft'){
                this.player.setCurrentState(this.player.getState('idleLeft'));
            }
            else if(currentAnimation.key === 'walkRight'){
                this.player.setCurrentState(this.player.getState('idleRight'));
            }

            if(this.player.sounds[0].isPlaying){
                this.player.sounds[0].stop();
            }

            this.moves.standBy(this.player.sprite);
        }

    }
}