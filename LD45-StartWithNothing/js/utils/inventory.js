export class Inventory {
    constructor(){
        this.objects = new Array(24);
    }

    addObject(object){
        if(this.objects[0] === undefined){
            this.objects[0] = object;
        }
        else{

            let alreadyInsideIndex = this.searchIfIsAlreadyInside(object.object.name);

            if(alreadyInsideIndex !== null){
                this.objects[alreadyInsideIndex].quantity = this.objects[alreadyInsideIndex].quantity + object.quantity;
            }
            else{
                let indexMax = -1;
                for(let objectType in this.objects){
                    indexMax = indexMax + 1;
                }
                if(indexMax < 23){
                    this.objects[indexMax+1] = object;
                }
            }
        }
    }

    searchIfIsAlreadyInside(name){
        for(let object in this.objects){
            if(this.objects[object].object.name === name){
                return object;
            }
        }
        return null;
    }
}