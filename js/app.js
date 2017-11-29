
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x>=505)this.x = -50;
    if(this.checkCollision(player)){
        return nCollision;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
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


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
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
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

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