## Frogger Game
Frog crossing the river is a classic arcade game. 

## Play Method
Clone this repository to your local place, and open `index.html` in your browser.
And you can enjoy it!

## Personalized settings
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
This frogger game is Copyright © 2017 Yunhan Yang. The content of this repository is licensed under a [MIT]().
