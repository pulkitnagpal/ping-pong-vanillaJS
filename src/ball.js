import {detectCollision} from './collisionDetection'
export default class Ball {
    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.reset()
        this.game = game;
        this.size = 16;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth
    }

    reset () {
        this.position = {
            x: 10,
            y: 400
        }
        this.speed = {
            x: 2,
            y: -2
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }
    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x > this.gameWidth - this.size || this.position.x < 0){
            this.speed.x = -this.speed.x
        }
        if (this.position.y < 0){
            this.speed.y = -this.speed.y
        }

        if(this.position.y > this.gameHeight - this.size)  {
            this.game.lives--;
            this.reset()
        }
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;    
        }
        
    }
}