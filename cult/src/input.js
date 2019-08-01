
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class InputHandler {

    constructor(game) {
        document.addEventListener('keydown', (event) => {
            //console.log(event.keyCode);
            switch (event.keyCode) {
                case 37://left
                    if (game.gamestate == GAMESTATE.RUNNING) {
                        game.player.moveLeft();
                        game.hr.move();
                        game.cultists.forEach(object => object.move());
                    }
                    break;
                case 39://right
                    if (game.gamestate == GAMESTATE.RUNNING) {
                        game.player.moveRight();
                        game.hr.move();
                        game.cultists.forEach(object => object.move());
                    }
                    break;
                case 38://up
                    if (game.gamestate == GAMESTATE.RUNNING) {
                        game.player.moveUp();
                        game.hr.move();
                        game.cultists.forEach(object => object.move());
                    }
                    break;
                case 40://down
                    if (game.gamestate == GAMESTATE.RUNNING) {
                        game.player.moveDown();
                        game.hr.move();
                        game.cultists.forEach(object => object.move());
                    }
                    break;
                case 27:
                    game.togglePause();
                    break;
                case 32:
                    game.start();
                    break;
            }
        });
    }
}