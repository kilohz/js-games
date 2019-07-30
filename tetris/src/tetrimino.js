import { detectCollision } from './collisionDetection.js';

export default class Tetrimino {

    constructor(game) {
        this.size = 20;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.shapes = [new Ishape(), new Jshape(), new Lshape(), new Oshape(), new Sshape(), new Tshape(), new Zshape()];
        this.startPos = { x: 400, y: 160 };
        this.speed = 1;
        this.movePercent=0;


        //randomize 
        let randomIndex = Math.floor(Math.random() * 7);
        this.shape = this.shapes[randomIndex];
        this.blocks = this.shape.blocks;
    }

    moveLeft() {
        this.startPos.x -= 20;
    }

    moveRight() {
        this.startPos.x += 20;
    }

    rotate() {
        let matrix = this.blocks;
        let n = matrix.length;
        let x = Math.floor(n / 2);
        let y = n - 1;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                let k = matrix[i][j];
                matrix[i][j] = matrix[y - j][i];
                matrix[y - j][i] = matrix[y - i][y - j];
                matrix[y - i][y - j] = matrix[j][y - i]
                matrix[j][y - i] = k
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.shape.color;
        let blockx = this.startPos.x;
        let blocky = this.startPos.y;
        this.blocks.forEach(blockRow => {
            blockRow.forEach(blockCell => {
                if (blockCell === 1) ctx.fillRect(blockx, blocky, this.width, this.height);
                blockx += 20;
            });
            //this.blocks.push({pos={x:blockx,y:blocky}});
            blocky += 20;
            blockx = this.startPos.x;
        });
    }

    update(deltaTime) {
        //todo: move brick down based on speed
        this.movePercent += this.speed/deltaTime;
        let move =(this.movePercent>=this.size);

        if (move){
            this.startPos.y += this.size;

            this.movePercent=0;
        }
    }


}
export class Ishape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1]
        ];
        this.color = "#00ffff";
    }
}
export class Jshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 0]
        ];
        this.color = "#0000ff";
    }
}
export class Lshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0]
        ];
        this.color = "#ffaa00";
    }
}
export class Oshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 1, 0, 0]
        ];
        this.color = "#ffff00";
    }
}
export class Sshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0]
        ];
        this.color = "#00ff00";
    }
}
export class Tshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0]
        ];
        this.color = "#ff00ff";
    }
}
export class Zshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0]
        ];
        this.color = "#ff0000";
    }
}