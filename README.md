
前端纳米学位街机游戏克隆项目
===============================

学生应该用这个[评审标准](https://review.udacity.com/#!/rubrics/499/view))来自我检查自己提交的代码。 确认自己写的函数要是**面向对象的** -  要么是类函数（就像函数 Player 和 Enemy）要么是类的原型链上的函数比如 Enemy.prototype.checkCollisions ， 在类函数里面或者类的原型链函数里面适当的使用关键词 'this' 来引用调用该函数的对象实例。最后保证你的**readme.md**文件要写明关于如何运行和如何玩你的街机游戏的指引。

关于如何开始这个项目的更详细的指导，可以查阅这份[指南](https://gdgdocs.org/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)。

## Frogger Game
*************
Frog crossing the river is a classic arcade game. 

## Play Method
**************
- Click the link:[]()
- Clone this repository to your local place, and open `index.html` in your browser.
And you can enjoy it!
## Personalized settings
**************
You can set some parameters to customize personalized game.
- You can change the different speeds of enemies. This parameter is in the line 1-3 in the file `app_overwrite.js`.
	```javascript
	var MAX_SPEED = 200;
	var MIDDLE_SPEED = 150;
	var MIN_SPEED = 50;
	```
- You can make the game more easy or difficult. Change this parameter in line 114 of `app_overwrite.js`
	```javascript
	addDifficulty(playNum,1,2);
	```
## License
**************
This frogger game is Copyright © 2017 Yunhan Yang. The content of this repository is licensed under a [MIT]().