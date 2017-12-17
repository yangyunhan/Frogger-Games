'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var People = function () {
    function People(x, y, sprite) {
        _classCallCheck(this, People);

        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    _createClass(People, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }]);

    return People;
}();

/**
 * @description subclass: Rock
 * @param x
 * @param y
 * @constructor
 */

var Rock = function (_People) {
    _inherits(Rock, _People);

    function Rock(x, y) {
        _classCallCheck(this, Rock);

        var _this = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this, x, y));

        _this.sprite = 'images/Rock.png';
        return _this;
    }

    _createClass(Rock, [{
        key: 'update',
        value: function update() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }]);

    return Rock;
}(People);
/**
 * @description subclass: Enemy
 * @param x
 * @param y
 * @param speed
 * @constructor
 */


var Enemy = function (_People2) {
    _inherits(Enemy, _People2);

    function Enemy(x, y, speed) {
        _classCallCheck(this, Enemy);

        var _this2 = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, x, y));

        _this2.speed = speed;
        _this2.sprite = 'images/enemy-bug.png';
        return _this2;
    }

    _createClass(Enemy, [{
        key: 'checkCollision',
        value: function checkCollision(player) {
            var distance = Math.abs(this.x - player.x);
            if (this.y === player.y && distance <= 50) {
                player.reset();
                return true;
            }
        }
    }, {
        key: 'update',
        value: function update(dt) {
            this.x += dt * this.speed;
            if (this.x >= 5 * clothx) this.x = -50;
            if (this.checkCollision(player)) {
                return true;
            }
        }
    }]);

    return Enemy;
}(People);
/**
 * @description subclass: Player
 * @param x
 * @param y
 * @param sprite
 * @constructor
 */

var Player = function (_People3) {
    _inherits(Player, _People3);

    function Player(x, y, sprite) {
        _classCallCheck(this, Player);

        var _this3 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y));

        _this3.sprite = sprite;
        return _this3;
    }

    _createClass(Player, [{
        key: 'render',
        value: function render() {
            _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'render', this).call(this);
            if (player.y >= clothmiddle && player.y <= 4 * clothy + clothmiddle) {
                ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.x >= 4 * clothx) {
                this.x = 4 * clothx;
            } else if (this.x <= 0) {
                this.x = 0;
            }
            if (this.y <= clothmiddle) {
                this.y = clothmiddle;
                setTimeout(function () {
                    player.reset();
                }, 500);
                var scoreNum = $('.score-num')[0].firstChild.nodeValue;
                score = Number(scoreNum);
                score += 400;
                if (scoreNum) {
                    $('.score-num')[0].firstChild.nodeValue = '';
                    $('.score-num')[0].firstChild.nodeValue = score;
                    if (score > 1000) {
                        gameReset('.success', 'success');
                    }
                }
                playNum++;
                addDifficulty(playNum, 1, 2);
                if (playNum === 2) {
                    playNum = 0;
                }
            } else if (this.y >= 4 * clothy + clothmiddle) {
                this.y = 4 * clothy + clothmiddle;
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(movement) {
            if (allRocks.length >= 1) {
                var rock = allRocks[allRocks.length - 1];
                var statex = rock.x === player.x;
                var statey = rock.y === player.y;
                switch (movement) {
                    case 'left':
                        {
                            if (statey && rock.x + clothx === player.x) {
                                player.x = clothx + rock.x;
                            } else {
                                player.x -= clothx;
                            }
                            break;
                        }
                    case 'right':
                        {
                            if (statey && player.x + clothx === rock.x) {
                                player.x = rock.x - clothx;
                            } else {
                                player.x += clothx;
                            }
                            break;
                        }
                    case 'up':
                        {
                            if (statex && player.y - clothy === rock.y) {
                                player.y = rock.y + clothy;
                            } else {
                                player.y -= clothy;
                            }
                            player.render();
                            break;
                        }
                    case 'down':
                        {
                            if (statex && player.y + clothy === rock.y) {
                                player.y = rock.y - clothy;
                            } else {
                                player.y += clothy;
                            }
                            break;
                        }
                }
            } else {
                switch (movement) {
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
    }, {
        key: 'reset',
        value: function reset() {
            player.x = 2 * clothx;
            player.y = 4 * clothy + clothmiddle;
        }
    }]);

    return Player;
}(People);

var allRocks = [];
var allEnemies = [];
/**
 * @description generate enemies
 * @param ENEMY_LENGTH
 */
function enemyGenerator(ENEMY_LENGTH) {
    var row_index = getRandomArr(3, 2);
    var cols_index = getRandomArr(3, 2);
    var speed_index = getRandomArr(3, 2);
    for (var i = 0; i < ENEMY_LENGTH; i++) {
        var enemy = new Enemy(row_index[i] * clothx, cols_index[i] * clothy + clothmiddle, speed[speed_index[i]]);
        allEnemies.push(enemy);
    }
}
enemyGenerator(3);

var score = 0;
var playNum = 0;
var player = new Player();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});