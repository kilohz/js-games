import Brick from "/scripts/brick.js";

export function buildLevel(game, level){
    let bricks = [];

    level.forEach((row,rowIndex) => {
        row.forEach((brick,brickIndex)=>
        {
            if (brick===1){
                let position = {
                    x:brickIndex*(Brick.WIDTH+2),
                    y:80+ rowIndex*(Brick.HEIGHT+2)
                };
                bricks.push(new Brick(game,position));
            }
        });
    });
    return bricks;
}

export const level1 = [
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

export const level2 = [
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];