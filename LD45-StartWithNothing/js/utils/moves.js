export class Moves {
    constructor(){
    }

    moveUp(sprite, velocity){
        sprite.setVelocityX(0);
        sprite.setVelocityY(-velocity);
    }

    moveDown(sprite, velocity){
        sprite.setVelocityX(0);
        sprite.setVelocityY(velocity);
    }

    moveLeft(sprite, velocity){
        sprite.setVelocityX(-velocity);
        sprite.setVelocityY(0);
    }

    moveRight(sprite, velocity){
        sprite.setVelocityX(velocity);
        sprite.setVelocityY(0);
    }

    standBy(sprite){
        sprite.setVelocityX(0);
        sprite.setVelocityY(0);
    }
}