export class Hit {
    constructor(attackPoint){
        this.attackPoint = attackPoint;
    }

    hit(objectToHit){
        objectToHit.hit(this.attackPoint);
    }
}