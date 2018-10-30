class Char {
	constructor(state)	{
		this.image= game.add.image(0,0,"player");
	}
}

var game = new Phaser.Game(800, 600, Phaser.AUTO);

var GameScene = {
	preload : function()	{
		game.load.image("player","assets/characters/chipeffect.png");
		game.load.spritesheet("anim", "assets/characters/chipfly.png",170,170,12);
	},
	create : function()	{
		this.char = new Char(this);
		this.player = this.add.image(100,100,"player");
		this.anim =  this.add.image(200,100,"anim");
		this.anim.loadTexture("anim",0);
		this.anim.animations.add("Anim");
		this.anim.animations.play("Anim",50,true);
		this.tempFunc();
            this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
 
            this.aKey.onHoldCallback = this.tempFunc;
 
            this.aKey.onDown.add(function (key) {
 
                console.log('key ' + key.keyCode + ' is now down');
 
            });
 
            this.aKey.onUp.add(function (key) {
 
                console.log('key ' + key.keyCode + ' is now up');
 
            });
	},
	update : function()	{
	           if (this.aKey.isDown) {
 
                console.log('key ' + aKey.keyCode + ' is down!');
 
            }
 	},
 	tempFunc : function()	{
 		console.log("tem");
 	}
}


game.state.add('GameScene', GameScene);

game.state.start('GameScene');