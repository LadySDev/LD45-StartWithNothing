export class Inventory {
    constructor(){
        this.objects = new Array(5);
    }

    addObject(object, quantity){
        if(this.objects.length < 5){
            this.objects.push({object: object, quantity: quantity});
        }
    }
}