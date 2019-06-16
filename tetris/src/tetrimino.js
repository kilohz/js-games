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
        this.startPos = { x: 380, y: 160 };
        this.movePercent = 0;
        this.WallRightX = 500;
        this.wallLeftX = 300;
        this.image = document.getElementById('img_brick');

        //randomize 
        let randomIndex = Math.floor(Math.random() * this.shapes.length);
        this.shape = this.shapes[randomIndex];
        this.blocks = this.shape.blocks;
    }

    moveLeft() {
        this.startPos.x -= this.size;
        if (!this.checkConstraints()) {
            //revert
            this.startPos.x += this.size;
        }
    }

    moveRight() {
        this.startPos.x += this.size;
        if (!this.checkConstraints()) {
            //revert
            this.startPos.x -= this.size;
        }
    }

    rotate() {
        this.pivotArry(this.blocks);
        if (!this.checkConstraints()) {
            //revert
            this.pivotArry(this.blocks);
            this.pivotArry(this.blocks);
            this.pivotArry(this.blocks);
        }
    }

    pivotArry(matrix) {
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
        for (let blockRow of this.blocks) {
            for (let blockCell of blockRow) {
                if (blockCell === 1){ 
                    ctx.fillRect(blockx, blocky, this.width, this.height);
                    ctx.drawImage(this.image,
                        blockx,
                        blocky, 
                        this.width, 
                        this.height);
                }
                blockx += this.size;
            };
            blocky += this.size;
            blockx = this.startPos.x;
        };
    }

    update(deltaTime) {
        //todo: move brick down based on speed
        this.movePercent += this.game.speed / deltaTime;
        let move = (this.movePercent >= this.size);

        if (move) {
            this.startPos.y += this.size;

            this.movePercent = 0;

            let blockx = this.startPos.x;
            let blocky = this.startPos.y;
            for (let blockRow of this.blocks) {
                for (let blockCell of blockRow) {
                    if (blockCell === 1) {
                        //check for floor
                        if (blocky >= this.gameHeight) {
                            this.startPos.y -= this.size;
                            this.collide();
                            return;
                        }

                        //check for other blocks
                        if (this.game.stage.checkCollision(blockx, blocky)) {
                            this.startPos.y -= this.size;
                            this.collide();
                            return;
                        }
                    }

                    blockx += this.size;
                };
                blocky += this.size;
                blockx = this.startPos.x;
            };

        }
    }

    collide() {
        let blockx = this.startPos.x;
        let blocky = this.startPos.y;
        for (let blockRow of this.blocks) {
            for (let blockCell of blockRow) {
                if (blockCell === 1) {
                    this.game.stage.add(blockx,blocky, this.shape.color);
                }

                blockx += this.size;
            };
            blocky += this.size;
            blockx = this.startPos.x;
        };

        //generate new tetrimino
        let tetrimino = new Tetrimino(this.game);
        this.game.liveBlock = tetrimino;
        this.game.gameObjects = [tetrimino, this.game.stage];
    }

    checkConstraints() {
        let valid = true;
        let xchange = this.checkNudge(0);
        // add double check, Ishape rotate against right wall goes over by 2
        xchange = this.checkNudge(xchange);
        valid = this.checkValid(xchange);
        //if wall bounce is not valid then revert
        if (valid) {
            this.startPos.x += xchange;
        }

        return valid;
    }

    checkNudge(xchange) {
        let startx = this.startPos.x + xchange;
        let blockx = startx;
        let blocky = this.startPos.y;

        for (let blockRow of this.blocks) {
            let cellNr = 1;
            for (let blockCell of blockRow) {
                if (blockCell === 1) {
                    //left wall
                    if (blockx < this.wallLeftX) {
                        xchange += this.size;
                        blockx += this.size;
                        return xchange;
                    }
                    //right wall
                    if (blockx + this.size > this.WallRightX) {
                        xchange -= this.size;
                        blockx -= this.size;
                        return xchange;
                    }
                    //check blocks
                    if (this.game.stage.checkCollision(blockx, blocky)) {
                        if (cellNr < (blockRow.length / 2)) {
                            xchange += this.size;
                            blockx += this.size;
                            return xchange;
                        }
                        else if (cellNr >= (blockRow.length / 2)) {
                            xchange -= this.size;
                            blockx -= this.size;
                            return xchange;
                        }
                    }
                }
                blockx += this.size;
                cellNr++;
            };

            blockx = startx;
            blocky += this.size;
        };

        return xchange;
    }

    checkValid(xchange) {
        var valid = true;
        let startx = this.startPos.x + xchange;
        let blockx = startx;
        let blocky = this.startPos.y;


        for (let blockRow of this.blocks) {
            let cellNr = 1;
            for (let blockCell of blockRow) {
                if (blockCell === 1) {
                    //left wall
                    if (blockx < this.wallLeftX) {
                        valid = false;
                        break;
                    }
                    //right wall
                    if (blockx + this.size > this.WallRightX) {
                        valid = false;
                        break;
                    }
                    //check other blocks
                    if (this.game.stage.checkCollision(blockx, blocky)) {
                        if (cellNr < (blockRow.length / 2)) {
                            valid = false;
                            break;
                        }
                        else if (cellNr >= (blockRow.length / 2)) {
                            valid = false;
                            break;
                        }
                    }
                }
                blockx += this.size;
                cellNr++;
            };

            blockx = startx;
            blocky += this.size;
        };

        return valid;
    }

}
export class Ishape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ];
        this.color = "#00ffff";
    }
}
export class Jshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0]
        ];
        this.color = "#0000ff";
    }
}
export class Lshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ];
        this.color = "#ffaa00";
    }
}
export class Oshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ];
        this.color = "#ffff00";
    }
}
export class Sshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ];
        this.color = "#00ff00";
    }
}
export class Tshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ];
        this.color = "#ff00ff";
    }
}
export class Zshape {
    constructor() {
        this.blocks = [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ];
        this.color = "#ff0000";
    }
}