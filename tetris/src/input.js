export default class InputHandler{

    constructor(game){
        document.addEventListener('keydown',(event)=>{
            //console.log(event.keyCode);
            switch(event.keyCode)
            {
                case 37://left
                    game.liveBlock.moveLeft();
                    break;
                case 39://right
                    game.liveBlock.moveRight();
                    break;
                case 38://up
                    game.liveBlock.rotate();
                    break;
                case 40://down
                    //todo speedup
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