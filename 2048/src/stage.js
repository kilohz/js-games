
export default class Stage {

    constructor(game) {
        this.blockSize = 106.25;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.height = 400;
        this.speed = 1;
        this.image = document.getElementById('img_brick');
        this.val = 2;

        this.level =
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        // [
        //     [2048, 1024, 512, 256],
        //     [128, 64, 32, 16],
        //     [8, 4, 2, 0],
        //     [0, 0, 0, 0]
        // ];

        this.add();
        this.add();
    }

    add() {
        let added = false;
        let tries = 0;
        //add in any open block
        while (!added) {
            let ryi = Math.floor(Math.random() * 4);
            let rxi = Math.floor(Math.random() * 4);

            if (this.level[ryi][rxi] === 0 || this.level[ryi][rxi] === 2) {
                this.level[ryi][rxi] += 2;
                added = true;
                this.game.score += 8;
            }
            if (tries > 10) {
                //can't find a spot
                this.game.lives--;
                return;
            }
        }
    }

    moveUp() {
        let moved = false;

        for (let y = 3; y > 0; y--) {
            for (let x = 0; x < 4; x++) {
                if (this.level[y][x] != 0 && (this.level[y - 1][x] == 0 || this.level[y][x] == this.level[y - 1][x])) {
                    this.level[y - 1][x] += this.level[y][x];
                    this.level[y][x] = 0;
                    moved = true;
                }
            }
        }

        if (moved) this.add();
    }
    moveDown() {
        let moved = false;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.level[y][x] != 0 && (this.level[y + 1][x] == 0 || this.level[y][x] == this.level[y + 1][x])) {
                    this.level[y + 1][x] += this.level[y][x];
                    this.level[y][x] = 0;
                    moved = true;
                }
            }
        }

        if (moved) this.add();
    }
    moveLeft() {
        let moved = false;
        for (let x = 3; x > 0; x--) {
            for (let y = 0; y < 4; y++) {
                if (this.level[y][x] != 0 && (this.level[y][x - 1] == 0 || this.level[y][x] == this.level[y][x - 1])) {
                    this.level[y][x - 1] += this.level[y][x];
                    this.level[y][x] = 0;
                    moved = true;
                }
            }
        }

        if (moved) this.add();
    }
    moveRight() {
        let moved = false;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.level[y][x] != 0 && (this.level[y][x + 1] == 0 || this.level[y][x] == this.level[y][x + 1])) {
                    this.level[y][x + 1] += this.level[y][x];
                    this.level[y][x] = 0;
                    moved = true;
                }
            }
        }

        if (moved) this.add();
    }

    draw(ctx) {
        //todo
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                let bgcolor = "#cdc1b4";
                let color = "#776e65";
                let fontSize = 55;
                let fontxPad = 35;
                let fontyPad = 70;
                if (this.level[y][x] == 2) {
                    bgcolor = "#eee4da";
                }
                else if (this.level[y][x] == 4) {
                    bgcolor = "#ede0c8";
                }
                else if (this.level[y][x] == 8) {
                    bgcolor = "#f2b179";
                    color = "#f9f6f2";
                }
                else if (this.level[y][x] == 16) {
                    bgcolor = "#f59563";
                    color = "#f9f6f2";
                    fontSize = 50;
                    fontxPad = 22;
                }
                else if (this.level[y][x] == 32) {
                    bgcolor = "#f67c5f";
                    color = "#f9f6f2";
                    fontSize = 50;
                    fontxPad = 22;
                }
                else if (this.level[y][x] == 64) {
                    bgcolor = "#f65e3b";
                    color = "#f9f6f2";
                    fontSize = 50;
                    fontxPad = 24;
                }
                else if (this.level[y][x] == 128) {
                    bgcolor = "#edcf72";
                    color = "#f9f6f2";
                    fontSize = 45;
                    fontxPad = 14;
                    fontyPad = 68;
                }
                else if (this.level[y][x] == 256) {
                    bgcolor = "#edcc61";
                    color = "#f9f6f2";
                    fontSize = 45;
                    fontxPad = 16;
                    fontyPad = 68;
                }
                else if (this.level[y][x] == 512) {
                    bgcolor = "#edc850";
                    color = "#f9f6f2";
                    fontSize = 45;
                    fontxPad = 15;
                    fontyPad = 68;
                }
                else if (this.level[y][x] == 1024) {
                    bgcolor = "#edc53f";
                    color = "#f9f6f2";
                    fontSize = 40;
                    fontxPad = 8;
                    fontyPad = 66;
                }
                else if (this.level[y][x] == 2048) {
                    bgcolor = "#edc22e";
                    color = "#f9f6f2";
                    fontSize = 40;
                    fontxPad = 8;
                    fontyPad = 68;
                }
                else if (this.level[y][x] > 2048) {
                    bgcolor = "#3c3a32";
                    color = "#f9f6f2";
                    fontSize = 40;
                    fontxPad = 8;
                    fontyPad = 68;
                }
                let paddingx = (x + 1) * 15;
                let paddingy = (y + 1) * 15;
                let xcoord = x * this.blockSize + paddingx;
                let ycoord = y * this.blockSize + paddingy;

                ctx.fillStyle = bgcolor;
                ctx.fillRect(xcoord, ycoord, this.blockSize, this.blockSize);

                if (this.level[y][x] != 0) {
                    //console.log((55/ctx.measureText(this.level[y][x]).width*5.6));
                    ctx.font = "700 " + fontSize + "px Arial";
                    ctx.fillStyle = color;
                    ctx.fillText(this.level[y][x], xcoord + fontxPad, ycoord + fontyPad);
                }
            }
        }
    }

    update(deltaTime) {
        //todo
    }


}
