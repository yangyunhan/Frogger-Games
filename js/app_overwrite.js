var MAX_SPEED = 200;
var MIDDLE_SPEED = 150;
var MIN_SPEED = 50;
var clothx = 101;
var clothy = 83;
var clothmiddle = 55;
var speed = [MAX_SPEED, MIN_SPEED, MIDDLE_SPEED];

/**
 * @description father class: People
 * @param x
 * @param y
 * @constructor
 */
function People(x,y){
    this.x = x;
    this.y = y;
};

People.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description subclass: Rock
 * @param x
 * @param y
 * @constructor
 */
function Rock(x,y) {
    People.call(this,x,y);
    this.sprite = 'images/Rock.png';
};
Rock.prototype = new People();
Rock.prototype.constructor = Rock;
Rock.prototype.update = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

/**
 * @description subclass: Enemy
 * @param x
 * @param y
 * @param speed
 * @constructor
 */
function Enemy(x,y,speed) {
    People.call(this,x,y);
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = new People();
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if (this.x>=5 * clothx) this.x = -50;
    if(this.checkCollision(player)){
        return nCollision;
    }
};
Enemy.prototype.checkCollision = function (player) {
    var distance=Math.abs(this.x-player.x);
    if(this.y === player.y && distance <= 50){
        player.x = 2 * clothx;
        player.y = 4 * clothy + clothmiddle;
        nCollision ++;
        return nCollision;
    }
};

/**
 * @description subclass: Player
 * @param x
 * @param y
 * @param sprite
 * @constructor
 */
function Player (x,y,sprite) {
    People.call(this,x,y);
    this.sprite = sprite;
};
Player.prototype = new People();
Player.prototype.constructor = Player;
Player.prototype.render = function () {
    if(player.y >= clothmiddle && player.y <= 4 * clothy + clothmiddle){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    }
};
Player.prototype.update = function () {
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
        var scoreNum = $('.score-num')[0].firstChild.nodeValue;
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
        if(playNum === 2){
            playNum = 0;
        }
        addDifficulty(playNum,1,2);
    }else if(this.y >= 4 * clothy + clothmiddle){
        this.y = 4 * clothy + clothmiddle;
    }
};
Player.prototype.handleInput = function (movement) {
    if(allRocks.length >= 1){
        var rock  = allRocks[allRocks.length-1];
        var statex = (rock.x === player.x);
        var statey = (rock.y === player.y);
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
                console.log('turn left');
                this.x -= clothx;
                break;
            }
            case 'right':
            {
                console.log('turn right');
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
};
Player.prototype.reset = function () {
    player.x = 2 * clothx;
    player.y = 4 * clothy + clothmiddle;
};

var allRocks = [];
var allEnemies = [];
/**
 * @description generate enemies
 * @param ENEMY_LENGTH
 */
function enemyGenerator(ENEMY_LENGTH) {
    var row_index = getRandomArr(3,2);
    var cols_index = getRandomArr(3,2);
    var speed_index = getRandomArr(3,2);
    for(var i = 0;i < ENEMY_LENGTH;i++){
        var enemy = new Enemy(row_index[i] * clothx, cols_index[i] * clothy + clothmiddle, speed[speed_index[i]]);
        allEnemies.push(enemy);
    }
}
enemyGenerator(3);

var score = 0;
var playNum = 0;
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});