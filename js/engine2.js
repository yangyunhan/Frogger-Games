let Engine = function(global) {
    let win = global.window,
        canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
        nCollision = 0,
        lastTime,
        start = false;

    canvas.height = 606;
    canvas.width = 505;

    /**
     * @description main function: render entities and request animation
     */
    function main() {
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        render();
        renderEntities();
        update(dt);
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    /**
     * @description click 'play' button and init the game
     */
    function init() {
        lastTime = Date.now();
        background();
        playerInit();
        playerSelect();
    }

    /**
     * @description init player even through it not be selected
     */
    function playerInit() {
        const roleImages = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
        let index = Math.floor(Math.random()*roleImages.length);
        player.reset();
        player.sprite = roleImages[index];
        player.render();
    }

    /**
     * @description player select function
     */
    function playerSelect() {
        const play = $('.start-btn');
        play.bind('click',function (e) {
            start = true;
            if(start){
                main();
            }
            $(e.target)[0].className = 'start-btn disappear';
        });
    }
    /**
     * @description update all entities
     * @param dt
     */
    function update(dt) {
        updateEntities(dt);
    }

    /**
     * @description update the enemies, determine the fail condition and reset the game
     * if there are rocks, update the rocks position
     * @param dt
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            if(enemy.update(dt)){
                nCollision ++;
                $('.heart-num ul li')[3-nCollision].className = 'disappear';
                if(nCollision % 3 === 0){
                    if(Number(score) > 1000){
                        gameReset('.success','success');
                        $('.over')[0].className = 'disappear';
                    }
                    gameReset('.over','over');
                    nCollision = 0;
                }
            }
        });
        allRocks.forEach(function (rock) {
            if(rock.x && rock.y){
                rock.update();
            }
        });
    }

    /**
     * @description render the enemies and player
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        if(player.y >= 55 && player.y <= 83 * 4 + 55){
            player.render();
        }
    }

    /**
     * @description render function
     */
    function render() {
        const rowImages = [
                'images/water-block.png',   // 这一行是河
                'images/stone-block.png',   // 第一行石头
                'images/stone-block.png',   // 第二行石头
                'images/stone-block.png',   // 第三行石头
                'images/grass-block.png',   // 第一行草地
                'images/grass-block.png'    // 第二行草地
            ],
            numRows = 6,
            numCols = 5;
        let row, col;
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * clothx, row * clothy);
            }
        }
    }

    /**
     * @description render background
     */
    function background() {
        render();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Heart.png',
        'images/grass-block.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
    global.nCollision = nCollision;
    global.start = start;
};

Engine(this);