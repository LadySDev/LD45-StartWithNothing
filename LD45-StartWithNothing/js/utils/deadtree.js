import {Wood} from "./wood.js";

export class DeadTree extends Phaser.GameObjects.Zone{
    constructor(scene, posX, posY, textureSprite, frame) {
        super(scene, posX + 55 - 1, posY + 100 - 1, textureSprite, frame);
        // this.Zone(posX + 55 - 1, posY + 100 - 1, 15 + 2, 27 + 2);
        this.setSize(15 + 2, 27 + 2);
        this.setOrigin(0.0, 0.0);
        scene.physics.world.enable(this);

        this.sprite = scene.physics.add.sprite(posX, posY, textureSprite, frame);
        this.sprite.setOrigin(0.0, 0.0);
        this.sprite.setImmovable(true);
        this.sprite.setSize(15, 27).setOffset(55, 100);

        this.maxHealth = 10;
        this.currentHealth = 10;

        this.loot = [
            {object: new Wood(), quantity: 1}
            ];

        this.canBeDestroyed = false;
    }

    hit(damage, inventory){
        this.currentHealth = this.currentHealth - damage;

        if(this.currentHealth <= 0){
            for(let object in this.loot){
                inventory.addObject(this.loot[object]);
            }
            this.sprite.destroy();
            this.canBeDestroyed = true;
        }
    }
}