var width = 800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO);

var TEST = {
	preload: function()	{
		game.load.spritesheet('anim','assets/anim.png',100,100);
		game.load.image('player','assets/player.png');
		game.load.image('bullet','assets/bullet.png');
		game.load.image('background','assets/bg.png');
		game.load.image('enemy','assets/enemy.png');
	},
	create: function()	{
		game.physics.startSystem(Phaser.Physics.ARCADE);


		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.spaceKey.onDown.add(this.shoot);
		this.rKey.onDown.add(function(){
			this.testAnim.animations.play('Test2');
			//game.state.start('BLANK');
		},this);

		this.bg1=game.add.sprite(0,0,'background');
		this.bg2=game.add.sprite(width,0,'background');

		this.player = game.add.sprite(0,0,'player');
		this.player.anchor.setTo(0.5);
		//this.bulletList=[];
		this.bulletGroup=game.add.group();
		this.enemy = game.add.sprite(500,200,'enemy');
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		
		this.testAnim = this.add.image(0,0,'anim');
		this.testAnim.animations.add('Test1',[0,1],10,true);
		this.testAnim.animations.add('Test2',[1,2],10,true);
		this.testAnim.animations.play('Test1');
		this.player.ASDF=1;
	},

	update: function()	{
		this.bg1.x-=10;
		this.bg2.x-=10;
		if(this.bg1.x <= 0-width)
			this.bg1.x+=width*2;
		if(this.bg2.x <= 0-width)
			this.bg2.x+=width*2;

		if(this.aKey.isDown)
			this.player.x-=3;
		if(this.dKey.isDown)
			this.player.x+=3;
		if(this.wKey.isDown)
			this.player.y-=3;
		if(this.sKey.isDown)
			this.player.y+=3;
		/*for(let i=0; i<this.bulletList.length; i++)	{
			this.bulletList[i].x+=10;
			if(game.physics.arcade.collide(this.bulletList[i],this.enemy)){
				this.bulletList[i].destroy();
				this.bulletList.splice(i,1);
				i--;
			}
		}*/
		for(let i=0; i<this.bulletGroup.children.length; i++)	{
			this.bulletGroup.children[i].x+=10;
		}
		game.physics.arcade.collide(this.enemy,this.bulletGroup,function(e,b){
			b.destroy();
		});
	},
	shoot: function()	{
		let b = game.add.sprite(TEST.player.x,TEST.player.y,'bullet');
		game.physics.enable(b, Phaser.Physics.ARCADE);
		b.anchor.setTo(0.5);
		//TEST.bulletList.push(b);
		TEST.bulletGroup.add(b);
	}
};

var BLANK={
	preload:function(){},
	create:function(){},
	update:function(){}
};
game.state.add('TEST',TEST);
game.state.add('BLANK',BLANK);

game.state.start('TEST');
