export default class InputHandler {

    constructor(game) {
        this.isdown = false;
        this.isleft = false;
        this.isright = false;
        this.isup = false;

        document.addEventListener('keydown', (event) => {
            //console.log(event.keyCode);
            switch (event.keyCode) {
                case 37://left
                    if (!this.isleft) {
                        game.liveBlock.moveLeft();
                        this.isleft = true;
                    }
                    break;
                case 39://right
                    if (!this.isright) {
                        game.liveBlock.moveRight();
                        this.isright = true;
                    }
                    break;
                case 38://up
                    if (!this.isup) {
                        game.liveBlock.rotate();
                        this.isup = true;
                    }
                    break;
                case 40://down
                    if (!this.isdown) {
                        game.speed *= 10;
                        this.isdown = true;
                    }
                    //while keydown score is incremented
                    game.score++;
                    break;
                case 27:
                    game.togglePause();
                    break;
                case 32:
                    game.start();
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            //console.log(event.keyCode);
            switch (event.keyCode) {
                case 37://left
                    this.isleft = false;
                    break;
                case 39://right
                    this.isright = false;
                    break;
                case 38://up
                    this.isup = false;
                    break;
                case 40://down
                    game.speed /= 10;
                    this.isdown = false;
                    break;
            }
        });
    }
}