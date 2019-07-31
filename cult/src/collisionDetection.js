export function detectCollision(obj1, obj2) {
    let bottomObj1 = obj1.pos.y + obj1.size;
    let topObj1 = obj1.pos.y;
    let rightObj1 = obj1.pos.x + obj1.width;
    let leftObj1 = obj1.pos.x;

    let topObj2 = obj2.pos.y;
    let leftObj2 = obj2.pos.x;
    let rightObj2 = obj2.pos.x + obj2.width;
    let bottomObj2 = obj2.pos.y + obj2.height;

    if (
        (bottomObj1 > topObj2 
                && rightObj1 > leftObj2
                && bottomObj1 < bottomObj2 
                && rightObj1 < rightObj2)

        || (topObj2 > bottomObj1 
                && leftObj2 > rightObj1
                && topObj2 < topObj1 
                && leftObj2 < leftObj1)

        || (topObj1 == topObj2 
                && leftObj1 == leftObj2)

    ) {
        return true;
    }
    else {
        return false;
    }

}
