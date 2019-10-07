import { ManagerScene } from "./scene/manager.js";

let config = {
    parent: 'divCanvaParent',
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [ManagerScene],
    pixelArt: true
};

let game = new Phaser.Game(config);
