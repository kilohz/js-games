export default class InputHandler{

    constructor(game){
        document.addEventListener('keydown',(event)=>{
            //console.log(event.keyCode);
            switch(event.keyCode)
            {
                case 37://left
                    game.player.moveLeft();
                    game.hr.move();
                    game.cultists.forEach(object => object.move());
                    break;
                case 39://right
                    game.player.moveRight();
                    game.hr.move();
                    game.cultists.forEach(object => object.move());
                    break;
                case 38://up
                    game.player.moveUp();
                    game.hr.move();
                    game.cultists.forEach(object => object.move());
                    break;
                case 40://down
                    game.player.moveDown();
                    game.hr.move();
                    game.cultists.forEach(object => object.move());
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