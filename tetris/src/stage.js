
export default class Stage {

    constructor(game) {
        this.blockSize = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.height = 400;
        this.speed = 1;
        this.image = document.getElementById('img_brick');
        this.blocks =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ];
    }

    add(x, y, val) {
        let xindex = ((x - 300) / 20);
        let yindex = ((y - 200) / 20);

        //if not out of bounds
        //TODO: ENDGAME isn't working ???
        if (yindex < 0) {
            this.game.lives--;
            return;
        }

        this.blocks[yindex][xindex] = val;
    }

    checkCollision(x, y) {
        let xindex = ((x - 300) / 20);
        let yindex = ((y - 200) / 20);

        if (this.blocks[yindex] != null && this.blocks[yindex][xindex] != 0) {
            return true;
        }
    }

    draw(ctx) {
        for (let r = 0; r < this.blocks.length; r++) {
            let row = this.blocks[r];
            for (let c = 0; c < row.length; c++) {
                let col = row[c];
                if (col != 0) {
                    ctx.fillStyle = col;
                    let x = 300 + (c * 20);
                    let y = 200 + (r * 20);
                    ctx.fillRect(x,y , this.blockSize, this.blockSize);
                    
                    ctx.drawImage(this.image,
                        x,
                        y, 
                        this.blockSize, 
                        this.blockSize);
                }
            }
        }
    }

    update(deltaTime) {
        let rowCount = 0;
        let rowsToBreak = [];
        for (let r = 0; r < this.blocks.length; r++) {
            let row = this.blocks[r];
            for (let c = 0; c < row.length; c++) {
                let col = row[c];
                if (col !== 0) {
                    //check for lines
                    rowCount++;
                }
            }
            if (rowCount === 10) {
                //todo clear row and move all down (but first check if more rows need to change
                rowsToBreak.push(r);
            }
            rowCount = 0;
        }
        if (rowsToBreak.length > 0) this.break(rowsToBreak);
    }

    break(rows) {
        //score 1 row is 100 pts but 2 rows is 300 pts
        let score = 0
        for (let rowi of rows) {
            score = score * 2 + 100;
            //clear rows
            let row = this.blocks[rowi];
            for (let c = 0; c < row.length; c++) {
                this.blocks[rowi][c] = 0;
            }
        }
        //move everything above rows down by one
        for (let rowi of rows) {
            for (let row = rowi; row > 0; row--) {
                for (let c = 0; c < this.blocks[row].length; c++) {
                    if (row - 1 > 0) this.blocks[row][c] = this.blocks[row - 1][c];
                }
            }
        }
        this.game.score += score;
        this.game.speed++;
    }


}
