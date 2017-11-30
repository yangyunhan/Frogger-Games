const MAX_SPEED = 200;
const MIDDLE_SPEED = 150;
const MIN_SPEED = 50;
const clothx = 101;
const clothy = 83;
const clothmiddle = 55;
const speed = [MAX_SPEED, MIN_SPEED, MIDDLE_SPEED];

/**
 * @description father class: People
 * @param x
 * @param y
 * @constructor
 */
let People = class People {
    constructor(x,y,sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

/**
 * @description subclass: Rock
 * @param x
 * @param y
 * @constructor
 */
class Rock extends People{
    constructor(x,y){
        super(x,y);
        this.sprite = 'images/Rock.png';
    }
    update(){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    }
}
/**
 * @description subclass: Enemy
 * @param x
 * @param y
 * @param speed
 * @constructor
 */
class Enemy extends People{
    constructor(x,y,speed){
        super(x,y);
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    checkCollision(player){
        let distance = Math.abs(this.x - player.x);
        if (this.y === player.y && distance <= 50){
            player.reset();
            return true;
        }
    }
    update(dt){
        this.x += dt * this.speed;
        if (this.x >= 5 * clothx) this.x = -50;
        if (this.checkCollision(player)){
            return true;
        }
    }

}
/**
 * @description subclass: Player
 * @param x
 * @param y
 * @param sprite
 * @constructor
 */

class Player extends People{
    constructor(x,y,sprite){
        super(x,y);
        this.sprite = sprite;
    }
    render(){
        super.render();
        if(player.y >= clothmiddle && player.y <= 4 * clothy + clothmiddle){
            ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
        }
    }
    update(){
        if(this.x >= 4 * clothx){
            this.x = 4 * clothx;
        }else if(this.x <= 0){
            this.x = 0;
        }
        if(this.y <= clothmiddle){
            this.y = clothmiddle;
            setTimeout(function () {
                player.reset();
            },500);
            let scoreNum = $('.score-num')[0].firstChild.nodeValue;
            score = Number(scoreNum);
            score += 400;
            if(scoreNum){
                $('.score-num')[0].firstChild.nodeValue = '';
                $('.score-num')[0].firstChild.nodeValue = score;
                if(score > 1000){
                    gameReset('.success','success');
                }
            }
            playNum ++;
            addDifficulty(playNum,1,2);
            if(playNum === 2){
                playNum = 0;
            }
        }else if(this.y >= 4 * clothy + clothmiddle){
            this.y = 4 * clothy + clothmiddle;
        }
    }
    handleInput(movement){
        if(allRocks.length >= 1){
            let rock  = allRocks[allRocks.length-1];
            let statex = (rock.x === player.x);
            let statey = (rock.y === player.y);
            switch (movement){
                case 'left':
                {
                    if(statey && rock.x + clothx === player.x){
                        player.x = clothx + rock.x;
                    }else {player.x -= clothx;}
                    break;
                }
                case 'right':
                {
                    if(statey && player.x + clothx === rock.x){
                        player.x = rock.x - clothx;
                    }else {player.x += clothx;}
                    break;
                }
                case 'up':
                {
                    if(statex && player.y - clothy === rock.y){
                        player.y = rock.y + clothy;
                    }else {player.y -= clothy;}
                    player.render();
                    break;
                }
                case 'down':
                {
                    if (statex && player.y + clothy === rock.y){
                        player.y = rock.y - clothy;
                    }else {player.y += clothy;}
                    break;
                }
            }
        }else{
            switch (movement){
                case 'left':
                {
                    this.x -= clothx;
                    break;
                }
                case 'right':
                {
                    this.x += clothx;
                    break;
                }
                case 'up':
                {
                    this.y -= clothy;
                    break;
                }
                case 'down':
                {
                    this.y += clothy;
                    break;
                }
            }
        }
        player.update();
    }
    reset(){
        player.x = 2 * clothx;
        player.y = 4 * clothy + clothmiddle;
    }
}
var allRocks = [];
var allEnemies = [];
/**
 * @description generate enemies
 * @param ENEMY_LENGTH
 */
function enemyGenerator(ENEMY_LENGTH) {
    let row_index = getRandomArr(3,2);
    let cols_index = getRandomArr(3,2);
    let speed_index = getRandomArr(3,2);
    for(let i = 0;i < ENEMY_LENGTH;i++){
        let enemy = new Enemy(row_index[i] * clothx, cols_index[i] * clothy + clothmiddle, speed[speed_index[i]]);
        allEnemies.push(enemy);
    }
}
enemyGenerator(3);

let score = 0;
let playNum = 0;
let player = new Player();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});