
// 玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// 更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x>=505)this.x = -50;
    if(this.checkCollision(player)){
        return nCollision;
    }
};

// 在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.checkCollision = function (player) {
    var distance=Math.abs(this.x-player.x);
    if(this.y === player.y && distance<=50){
        player.x = 202;
        player.y = 83*4+55;
        nCollision ++;
        return nCollision;
    }
};


// 玩家类
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    //this.sprite = 'images/char-boy.png';
    var roleImages = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    var index = Math.floor(Math.random()*roleImages.length);
    this.sprite = roleImages[index];
};

Player.prototype.update = function () {
    if(this.x >= 404){
        this.x = 404;
    }else if(this.x <= 0){
        this.x = 0;
    }
    if(this.y <= 55){
        this.y = 55;
    }else if(this.y > 83 * 4 + 55){
        this.y = 83 * 4 + 55;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (movement) {
    switch (movement){
        case 'left':
            this.x -= 101; break;
        case 'right':
            this.x += 101; break;
        case 'up':
            this.y -= 83; break;
        case 'down':
            this.y += 83; break;
    }
};

var enemy1 = new Enemy(0,83*2+55,150);
var enemy2 = new Enemy(101,83*1+55,50);
var enemy3 = new Enemy(0,83*0+55,100);
var enemy4 = new Enemy(202,83*0+55,150);
var enemy5 = new Enemy(0,83*1+55,200);
var enemy6 = new Enemy(101,83*2+55,250);
var allEnemies = [enemy1,enemy4,enemy5];

var playerBtn = $('.playerBtn');
var players = $('.player-select');
var playersUl = $('.player-select ul li');
console.log(playersUl);
playerBtn.bind('click',function () {
    if(players[0].className === 'player-select'){
        players[0].className = 'player-select disappear';
    }else{
        players[0].className = 'player-select';
    }
});
playersUl.click(function (e) {

    var player = new Player(202,83*4+55);
    player.sprite = $(e.target)[0].attributes[0].value;
    players[0].className = 'player-select disappear';
    player.render();
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
