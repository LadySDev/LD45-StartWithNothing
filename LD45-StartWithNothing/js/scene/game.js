import { Character } from '../utils/character.js';
import { Moves } from "../utils/moves.js";
import { DeadTree } from "../utils/deadtree.js";
import {Hit} from "../utils/hit";

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');

        this.player = new Character();
        this.player.setVelocity(100);

        this.moves = new Moves();
        this.hit = new Hit(5);
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

        this.player.addStateObject('idleDown', playerAnimIdleDown, null);

        // PLAYER ANIMATION & STATE WALK DOWN
        let playerAnimWalkDown = this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7, first: 4 }),
            frameRate: 8,
            repeat: -1
        });

        let playerSoundWalk = this.sound.add('squelch', { loop: true, volume: 0.10});

        this.player.addStateObject('walkDown', playerAnimWalkDown, playerSoundWalk);

        // PLAYER ANIMATION & STATE IDLE UP
        let playerAnimIdleUp = this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8, first: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('idleUp', playerAnimIdleUp, null);

        // PLAYER ANIMATION & STATE WALK UP
        let playerAnimWalkUp = this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15, first: 12 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('walkUp', playerAnimWalkUp, playerSoundWalk);

        // PLAYER ANIMATION & STATE IDLE LEFT
        let playerAnimIdleLeft = this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 16, first: 16 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('idleLeft', playerAnimIdleLeft, null);

        // PLAYER ANIMATION & STATE WALK LEFT
        let playerAnimWalkLeft = this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23, first: 20 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('walkLeft', playerAnimWalkLeft, playerSoundWalk);

        // PLAYER ANIMATION & STATE IDLE RIGHT
        let playerAnimIdleRight = this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 24, first: 24 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('idleRight', playerAnimIdleRight, null);

        // PLAYER ANIMATION & STATE WALK RIGHT
        let playerAnimWalkRight = this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 31, first: 28 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addStateObject('walkRight', playerAnimWalkRight, playerSoundWalk);

        // SET CURRENT STATE
        this.player.setCurrentStateObject('idleDown');

        this.addControlKeys(this);

        // DEAD TREE GENERATION
        this.deadTree1 = new DeadTree(this, 100, 100, 'deadTree', 0);

        this.physics.add.collider(this.player.sprite, this.deadTree1.sprite)
    }

    addControlKeys(scene){
        this.moveUpKey = scene.input.keyboard.addKey(this.controls.moveUpKey);
        this.moveDownKey = scene.input.keyboard.addKey(this.controls.moveDownKey);
        this.moveLeftKey = scene.input.keyboard.addKey(this.controls.moveLeftKey);
        this.moveRightKey = scene.input.keyboard.addKey(this.controls.moveRightKey);

        this.menuKey = scene.input.keyboard.addKey(this.controls.menuKey);

        this.actionKey = scene.input.keyboard.addKey(this.controls.actionKey);
    }

    update(time, delta) {

        this.physics.add.overlap(this.player.sprite, this.deadTree1, this.deadTreeCollideAction.bind(this));

        if(this.moveUpKey.isDown){
            this.player.setCurrentStateObject('walkUp');
            this.moves.moveUp(this.player.sprite, this.player.velocity);
        }
        else if(this.moveDownKey.isDown){
            this.player.setCurrentStateObject('walkDown');
            this.moves.moveDown(this.player.sprite, this.player.velocity);
        }
        else if(this.moveLeftKey.isDown){
            this.player.setCurrentStateObject('walkLeft');
            this.moves.moveLeft(this.player.sprite, this.player.velocity);
        }
        else if(this.moveRightKey.isDown){
            this.player.setCurrentStateObject('walkRight');
            this.moves.moveRight(this.player.sprite, this.player.velocity);
        }
        else{
            let currentAnimation = this.player.currentStateObject.animation;

            if(this.player.currentStateObject.sound !== null && this.player.currentStateObject.sound.isPlaying){
                this.player.currentStateObject.sound.stop();
            }

            if(currentAnimation.key === 'walkUp'){
                this.player.setCurrentStateObject('idleUp');
            }
            else if(currentAnimation.key === 'walkDown'){
                this.player.setCurrentStateObject('idleDown');
            }
            else if(currentAnimation.key === 'walkLeft'){
                this.player.setCurrentStateObject('idleLeft');
            }
            else if(currentAnimation.key === 'walkRight'){
                this.player.setCurrentStateObject('idleRight');
            }

            this.moves.standBy(this.player.sprite);
        }

        if(this.menuKey.isDown){
            this.managerScene.showPauseScene(this);
        }

        if(this.deadTree1.currentHealth === 0){
            this.deadTree1.destroy();
        }
    }

    deadTreeCollideAction(object1, object2){
        if(Phaser.Input.Keyboard.JustDown(this.actionKey)){
            object2.hit(this.hit.attackPoint);
        }
    }
}