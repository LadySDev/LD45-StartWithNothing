let config = {
    parent: 'divCanvaParent',
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload () {
    console.log('preload');
}

function create () {
    console.log('create');
}

function update (time, delta) {

}
