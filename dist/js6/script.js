'use strict';

/**
 * @description generate rocks
 * @param ROCK_LENGTH
 */
function rockGenerator(ROCK_LENGTH) {
    var rock_row = getRandomArr(3, 2);
    var rock_cols = getRandomArr(3, 2);
    for (var j = 0; j < ROCK_LENGTH; j++) {
        var rock = new Rock(rock_row[j] * clothx, rock_cols[j] * clothy + clothmiddle);
        allRocks.push(rock);
    }
}

var playerBtn = $('.playerBtn');
var players = $('.player-select');

/**
 * @description select a play role
 */
playerBtn.bind('click', function () {
    if (players[0].className === 'player-select') {
        players[0].className = 'player-select disappear';
    } else {
        players[0].className = 'player-select';
    }
});

/**
 * @description display the selected role
 */
$('.player-select ul li').click(function (e) {
    players[0].className = 'player-select disappear';
    player.reset();
    player.sprite = $(e.target)[0].attributes[0].value;
    player.render();
});