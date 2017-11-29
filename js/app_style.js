$(document).ready(function () {
    var instructionBtn = $('.instruction-btn');
    var instructionMsg = $('.instruction-msg');
    var confirm = $('.confirm');
    instructionBtn.bind("click",function () {
        instructionMsg[0].className = 'instruction-msg';
    });
    confirm.bind("click",function () {
        instructionMsg[0].className = 'instruction-msg disappear';
    });
});

/**
 * @description when run the game more than two times, add some rocks and enemies
 * @param playNum
 * @param enemyNum
 * @param RockNum
 */
function addDifficulty(playNum,enemyNum,RockNum) {
    switch (playNum){
        case 1:
            rockGenerator(RockNum);
            enemyGenerator(enemyNum);
            break;
        case 2:
            rockGenerator(RockNum);
            enemyGenerator(enemyNum);
            break;
        default:
            rockGenerator(0);
            enemyGenerator(0);
    }
}

/**
 * @description reset the game, containing score reset, live value reset, rocks reset, enemies reset and player reset
 * @param selector
 * @param msg
 */
function gameReset(selector,msg) {
    $(selector)[0].className = msg;
    $('.'+msg+'-btn').bind("click",function () {
        $(selector)[0].className = msg + ' disappear';
        $('.heart-num ul li').each(function () {
            this.className = '';
        });
        $('.score-num')[0].firstChild.nodeValue = 0;
        allRocks.splice(0, allRocks.length);
        allEnemies.splice(0, allEnemies.length);
        enemyGenerator(3);
        player.reset();
    })
}

/**
 * @description select len no-repeating random numbers and return array
 * @param len
 * @param max
 * @returns {Array}
 */
function getRandomArr(len,max) {
    var sub_arr = new Array();//生成的随机数数组
    var has_arr = new Array();//稀疏数组，判断该数字是否已经选出
    var temp = '';
    for (var i = 0; i <=len-1; i++) {
        do {
            temp = getRandomNum(0, max);
        } while (has_arr[temp] !== undefined)//判断该选出的数字是否已经选出
        has_arr[temp] = 'has';//该数字作为偏移量，加入稀疏数组记录为已选
        sub_arr[i] = temp;
    }
    return sub_arr;

}

/**
 * @description generate a random number from min to max
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomNum(min, max) {
    return min + Math.round(Math.random() * (max - min));
}