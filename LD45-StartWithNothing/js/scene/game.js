import { Character } from '../utils/character.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');

        this.player = new Character();
    }

    preload() {

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

        this.player.addState('idleDown', playerAnimIdleDown);

        // PLAYER ANIMATION & STATE WALK DOWN
        let playerAnimWalkDown = this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7, first: 4 }),
            frameRate: 8,
            repeat: -1
        });
        this.player.addState('walkDown', playerAnimWalkDown);

        // PLAYER ANIMATION & STATE IDLE UP
        let playerAnimIdleUp = this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8, first: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleUp', playerAnimIdleUp);

        // PLAYER ANIMATION & STATE WALK UP
        let playerAnimWalkUp = this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15, first: 12 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkUp', playerAnimWalkUp);

        // PLAYER ANIMATION & STATE IDLE LEFT
        let playerAnimIdleLeft = this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 16, first: 16 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleLeft', playerAnimIdleLeft);

        // PLAYER ANIMATION & STATE WALK LEFT
        let playerAnimWalkLeft = this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23, first: 20 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkLeft', playerAnimWalkLeft);

        // PLAYER ANIMATION & STATE IDLE RIGHT
        let playerAnimIdleRight = this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 24, first: 24 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('idleRight', playerAnimIdleRight);

        // PLAYER ANIMATION & STATE WALK RIGHT
        let playerAnimWalkRight = this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 31, first: 28 }),
            frameRate: 8,
            repeat: -1
        });

        this.player.addState('walkRight', playerAnimWalkRight);

        // SET CURRENT STATE
        this.player.setCurrentState(this.player.getState('idleDown'));
    }

    update(time, delta) {

    }
}