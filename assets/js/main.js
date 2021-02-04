let screenW = window.innerWidth;
let screenH = window.innerWidth - 5;
let loadedText = new PIXI.Text('0%',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
let loadingAnim = new PIXI.BaseTexture.from('assets/images/loading/skycity_loading.png');



let spriteSpeed = 0.8;
let game_rounds = 0;
let animationIsPlaying = false;
let before5SecondsSound = false;
let animGameState = false;
let soundMute = false;
let musicMute = false;

let isPlayingprevisionSound = false;
let size = [600,560];

let ratio = size[0] / size[1];

let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

let gameSheet = [];



let app = new PIXI.Application({
	width : size[0],
	height : size[1],
	backgroundColor : 0x00000,
});

let apiRecord = 'https://adminbet365.com';
// let apiRecord = 'http://127.0.0.1:8000';



document.getElementById('game_holder').appendChild(app.view);

app.renderer.resize(size[0],size[1]);


app.maxFPS = 59;

// fetch ALL SPRITE JSON
fetch('JSON/skycity_loading.json').then((res)=>{
	return res.json();
}).then((data) => {
	let res = data;
	let arr = [];
	 for(let i = 0; i < res.length; i++) {
	 	let frame = res[i]['frame'];
	 	let size = res[i]['spriteSourceSize'];
	 	arr.push([frame,size])
	 }
	 gamePivot['pivot_loadingAnim'] = arr;		    
}).then(() =>{

	gameSheet['_game_login_anim'] = [];

	for(let x = 0; x < gamePivot.pivot_loadingAnim.length; x++) {
		let frame = gamePivot.pivot_loadingAnim[x][0];
		let size = gamePivot.pivot_loadingAnim[x][1];
		data = new PIXI.Texture(loadingAnim , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_game_login_anim'].push(data);	
	}


	_game_login_anim_sprite = new PIXI.AnimatedSprite(gameSheet['_game_login_anim']);

	_game_login_anim_sprite.x = app.screen.width / 2.7;
	_game_login_anim_sprite.y = app.screen.height / 2.6;
	_game_login_anim_sprite.play();

	loadedText.x = _game_login_anim_sprite.x + 50;
	loadedText.y = _game_login_anim_sprite.y + 140;

	app.stage.addChild(_game_login_anim_sprite,loadedText);

})




loader.add("_background" , "assets/images/soccer/images/background.png")
	  .add("_ball" , "assets/images/soccer/images/ball.png")
	  .add("_goal_post" , "assets/images/soccer/images/bg_goalpost.png")
	  .add("_ready" , "assets/images/soccer/images/texture/ready.png")
	  .add("_kicker" , "assets/images/soccer/images/texture/kicker.png")
	  .add("_keeper_idle" , "assets/images/soccer/images/texture/keeper_idle.png")
	  .add("_keeper_center" , "assets/images/soccer/images/texture/keeper_center.png")
	  .add("_keeper_left" , "assets/images/soccer/images/texture/keeper_left.png")
	  .add("_keeper_right" , "assets/images/soccer/images/texture/keeper_right.png")
	  .add("_effect_block" , "assets/images/soccer/images/texture/effect_block.png")
	  .add("_effect_goal" , "assets/images/soccer/images/texture/effect_goal.png")
	  .add("_bg_football_text" , "assets/images/soccer/images/bg_soccer_board.png")
	  .add("_game_title" , "assets/images/soccer/images/title_football.png")
	  .add("_left_result" , "assets/images/bet/left.png")
	  .add("_right_result" , "assets/images/bet/right.png")
	  .add("_signal_01" , "assets/images/soccer/images/texture/signal01.png")
	  .add("_signal_02" , "assets/images/soccer/images/texture/signal02.png")
	  .add("_signal_03" , "assets/images/soccer/images/texture/signal03.png")
	  .add('_game_btnSounds', 'assets/images/btnsounds.png')
	  .add('bgMusic', 'assets/sounds/sadaribgm.mp3')
	  .add('b5seconds', 'assets/sounds/soccer-5s.mp3')
	  .add('soccer_start', 'assets/sounds/soccer-start.mp3')
	  .add('soccer_kick', 'assets/sounds/soccer-kick.mp3')
	  .add('soccer_block', 'assets/sounds/soccer-block.mp3')
	  .add('soccer_applause', 'assets/sounds/soccer-applause.mp3')
	  .add('common_result', 'assets/sounds/common-result.mp3')
	  .add('prevision1' , 'assets/sounds/prevision01.mp3')
	  .add('prevision2' , 'assets/sounds/prevision02.mp3')
	  .add('prevision3' , 'assets/sounds/prevision03.mp3')
	  .load(init)



  loader.onProgress.add((e) => {
  	if (loadedText) {
  		loadedText.text = Math.ceil(e.progress) + '%';
  	}
  })



function init() {


	PIXI.Loader.shared.load(function(loader, resources) {
	   backgroundMusic = resources.bgMusic.sound;
	   b5seconds = resources.b5seconds.sound;
	   soccer_start = resources.soccer_start.sound;
	   soccer_kick = resources.soccer_kick.sound;
	   soccer_block = resources.soccer_block.sound;
	   soccer_applause = resources.soccer_applause.sound;
	   common_result = resources.common_result.sound;
	   prevision1 = resources.prevision1.sound;
	   prevision2 = resources.prevision2.sound;
	   prevision3 = resources.prevision3.sound;
	});

	resources.bgMusic.sound.play();
	backgroundMusic.loop = true;
	let _background = PIXI.Sprite.from(loader.resources['_background'].url);
	_background.anchor.set(0.5);
	_background.alpha = 1;

	_background.x = app.screen.width / 2;
	_background.y = app.screen.height / 2;


	_goal_post = PIXI.Sprite.from(loader.resources['_goal_post'].url);
	_goal_post.x = _background.x - 360;
	_goal_post.y = _background.y / 3.9;



	let _game_btnSounds = new PIXI.BaseTexture.from(loader.resources['_game_btnSounds'].url);

	gameSheet['_game_btnSounds'] = [];

	for(let x = 0; x < gamePivot.pivot_btnsounds.length; x++) {
		let frame = gamePivot.pivot_btnsounds[x][0];
		let size = gamePivot.pivot_btnsounds[x][1];
		data = new PIXI.Texture(_game_btnSounds , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_game_btnSounds'].push(data);
		
	}	


	_game_btnSounds = new PIXI.AnimatedSprite(gameSheet['_game_btnSounds']);
	_game_btnSounds.x = _background.x + 225;
	_game_btnSounds.y = _background.y  + 243;
	_game_btnSounds.width = 30;
	_game_btnSounds.height = 25;
	_game_btnSounds.interactive = true;
	_game_btnSounds.buttonMode = true;
	_game_btnSounds.gotoAndStop(1);

	_game_btnSounds.on('pointerdown', function(){
		if (!animationIsPlaying) {

			if (_game_btnSounds.currentFrame != 0) {
				_game_btnSounds.gotoAndStop(0);
				musicMute = true;
				backgroundMusic.volume = 0;
			} else {
				_game_btnSounds.gotoAndStop(1);
				musicMute = false;
				backgroundMusic.volume = 1;
			}
		}
	});

	_game_btnMusic = new PIXI.AnimatedSprite(gameSheet['_game_btnSounds']);
	_game_btnMusic.x = _background.x + 265;
	_game_btnMusic.y = _background.y  + 240;
	_game_btnMusic.width = 30;
	_game_btnMusic.height = 25;
	_game_btnMusic.interactive = true;
	_game_btnMusic.buttonMode = true;
	_game_btnMusic.gotoAndStop(3);


	_game_btnMusic.on('pointerdown', function(){
		if (_game_btnMusic.currentFrame != 2) {
			_game_btnMusic.gotoAndStop(2);
			b5seconds.volume = 0;
			soccer_start.volume = 0;
			soccer_kick.volume = 0;
			soccer_block.volume = 0;
			soccer_applause.volume = 0;
			common_result.volume = 0;
			prevision1.volume = 0;
			prevision2.volume = 0;
			prevision3.volume = 0;
			soundMute = true;
		} else {
			_game_btnMusic.gotoAndStop(3);
			soundMute = false;
			b5seconds.volume = 1;
			soccer_start.volume = 1;
			soccer_kick.volume = 1;
			soccer_block.volume = 1;
			soccer_applause.volume = 1;
			common_result.volume = 1;
			prevision1.volume = 1;
			prevision2.volume = 1;
			prevision3.volume = 1;

		
		}
	});



	let _bg_fb_Text = PIXI.Sprite.from(loader.resources['_bg_football_text'].url);
	_bg_fb_Text.x = -200;
	_bg_fb_Text.y = 132;
	_bg_fb_Text.width = 1000;


	let _game_title = PIXI.Sprite.from(loader.resources['_game_title'].url);
	_game_title.x = 140;
	_game_title.y = 10;


	var d = new Date();
	var gtmStr = d.toUTCString();

	let UTCTIME = new PIXI.Text(gtmStr,{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	UTCTIME.x = _game_title.x + 60;
	UTCTIME.y = _game_title.y  + 37;


	let _game_result = PIXI.Sprite.from('assets/images/bet/soccer_result.png');

	_game_result.x = _background.x - 220;
	_game_result.y = _background.y - 180;
	_game_result.alpha = 1;



	let title_1 = new PIXI.Text('키커',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	let title_2 = new PIXI.Text('골키퍼',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	let title_3 = new PIXI.Text('결과',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	let title_4 = new PIXI.Text('조합',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});

	title_1.y = 176;
	title_2.y = title_1.y + 59;
	title_3.y = title_2.y + 59;
	title_4.y = title_3.y + 59;
	title_1.x = title_2.x = title_3.x = title_4.x = _background.x - 20;
	title_1.alpha = title_2.alpha = title_3.alpha = title_4.alpha = _game_result.alpha;



	let resultRound = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	resultRound.x = _game_result.x + 170;
	resultRound.y = _game_result.y + 32;
	resultRound.alpha = _game_result.alpha;


	let _left_slot_1 = PIXI.Sprite.from(loader.resources['_left_result'].url);
	let _right_slot_1 = PIXI.Sprite.from(loader.resources['_right_result'].url);
	_left_slot_1.x = _right_slot_1.x = title_1.x / 2.10;
	_left_slot_1.y = _right_slot_1.y = title_1.y + 22;
	_left_slot_1.alpha = _right_slot_1.alpha = title_1.alpha;

	let result_slot_1_text = new PIXI.Text('오른쪽',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});

	result_slot_1_text.x = title_1.x / 1.6;
	result_slot_1_text.y = title_1.y + 28;
	result_slot_1_text.alpha = _game_result.alpha;

	let _left_slot_2 = PIXI.Sprite.from(loader.resources['_left_result'].url);
	let _right_slot_2= PIXI.Sprite.from(loader.resources['_right_result'].url);

	_left_slot_2.x = _right_slot_2.x = title_2.x / 2.10;
	_left_slot_2.y = _right_slot_2.y = title_2.y + 22;
	_left_slot_2.alpha = _right_slot_2.alpha = title_2.alpha;

	let result_slot_2_text = new PIXI.Text('왼쪽',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});

	result_slot_2_text.x = title_2.x / 1.6;
	result_slot_2_text.y = title_2.y + 28;
	result_slot_2_text.alpha = _game_result.alpha;


	let result_slot_3_text = new PIXI.Text('골인 / 노골',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	result_slot_3_text.x = title_3.x / 2;
	result_slot_3_text.y = title_3.y + 28;
	result_slot_3_text.alpha = _game_result.alpha;

	let _left_slot_4 = PIXI.Sprite.from(loader.resources['_left_result'].url);
	let _right_slot_4 = PIXI.Sprite.from(loader.resources['_right_result'].url);
	_left_slot_4.x = _right_slot_4.x = title_4.x / 2.10;
	_left_slot_4.y = _right_slot_4.y = title_4.y + 20;
	_left_slot_4.alpha = _right_slot_4.alpha = title_4.alpha;

	let _left_slot_5 = PIXI.Sprite.from(loader.resources['_left_result'].url);
	let _right_slot_5 = PIXI.Sprite.from(loader.resources['_right_result'].url);
	_left_slot_5.x = _right_slot_5.x = title_4.x / 1.6;
	_left_slot_5.y = _right_slot_5.y = title_4.y + 20;
	_left_slot_5.alpha = _right_slot_5.alpha = title_4.alpha;

	let resultContainer = new PIXI.Container();

	resultContainer.addChild(_game_result,title_1,title_2,title_3,title_4 ,resultRound,_left_slot_1,_right_slot_1,_left_slot_2,_right_slot_2,result_slot_1_text,result_slot_2_text,result_slot_3_text,_left_slot_4,_right_slot_4,_left_slot_5,_right_slot_5);
	resultContainer.alpha = 0;


	let _game_graph = PIXI.Sprite.from('assets/images/bet/graph_body_s.png');
	let _game_graph_blue = PIXI.Sprite.from('assets/images/bet/graph_blue01.png');
	let _game_graph_red = PIXI.Sprite.from('assets/images/bet/graph_red01.png');
	let _game_graph_blue_1 = PIXI.Sprite.from('assets/images/bet/graph_blue02.png');
	let _game_graph_red_1 = PIXI.Sprite.from('assets/images/bet/graph_red02.png');


	_game_graph.x = _background.x - 75;
	_game_graph.y = _background.y + 170;


	_game_graph_blue_1.width = 50;
	_game_graph_blue_1.y = _game_graph.y + 35;
	_game_graph_blue_1.x = _game_graph.x - 49;
	_game_graph_blue.x = _game_graph_blue_1.x - 0;
	_game_graph_blue.scale.x = -1;
	_game_graph_blue.y = _game_graph_blue_1.y;


	_game_graph_red_1.x = _game_graph.x + 150;
	_game_graph_red_1.width = 50;
	_game_graph_red_1.y = _game_graph.y + 35;

	_game_graph_red.x = _game_graph_red_1.x + 50;
	_game_graph_red.y =  _game_graph.y + 35;
	

	let bluePercent = new PIXI.Text('50%',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	let redPercent = new PIXI.Text('50%',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});

	redPercent.x = _game_graph.x + 108;
	redPercent.y = _game_graph.y + 35;

	bluePercent.x = _game_graph.x + 20;
	bluePercent.y = _game_graph.y + 35;

	let graphRound = new PIXI.Text('01 회 배팅현황',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	graphRound.width = 90;
	graphRound.x = _game_graph.x * 1.14;
	graphRound.y = _game_graph.y + 8;

	let graph_container = new PIXI.Container();


	graph_container.addChild(_game_graph_blue,_game_graph_red,_game_graph_blue_1,_game_graph_red_1,_game_graph,bluePercent,redPercent,graphRound);







	let sprite_container = new PIXI.Container();

	// READY SPRITE

	let _ready = new PIXI.BaseTexture.from(loader.resources['_ready'].url);

	gameSheet['_ready'] = [];
	
	for(let x = 0; x < gamePivot._ready.length; x++) {
		let frame = gamePivot._ready[x][0];
		let size = gamePivot._ready[x][1];
		let data = new PIXI.Texture(_ready , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_ready'].push(data);
	}	


	_ready_sprite = new PIXI.AnimatedSprite(gameSheet['_ready']);
	_ready_sprite.x = _background.x - 170;
	_ready_sprite.y = _background.y - 130;
	_ready_sprite.animationSpeed = spriteSpeed;
	_ready_sprite.play();
	_ready_sprite.alpha = 1;

	// END OF READY SPRITE



	let _signal_01 = new PIXI.BaseTexture.from(loader.resources['_signal_01'].url);

	gameSheet['_signal_01'] = [];


	for(let x = 0; x < gamePivot._signal_01.length; x++) {
		let frame = gamePivot._signal_01[x][0];
		let size = gamePivot._signal_01[x][1];
		let data = new PIXI.Texture(_signal_01 , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_signal_01'].push(data);
	}

	_signal_01_sprite = new PIXI.AnimatedSprite(gameSheet['_signal_01']);
	_signal_01_sprite.animationSpeed = spriteSpeed;
	_signal_01_sprite.play();
	_signal_01_sprite.alpha = 0;



	let _signal_02 = new PIXI.BaseTexture.from(loader.resources['_signal_02'].url);

	gameSheet['_signal_02'] = [];


	for(let x = 0; x < gamePivot._signal_02.length; x++) {
		let frame = gamePivot._signal_02[x][0];
		let size = gamePivot._signal_02[x][1];
		let data = new PIXI.Texture(_signal_02 , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_signal_02'].push(data);
	}

	_signal_02_sprite = new PIXI.AnimatedSprite(gameSheet['_signal_02']);
	_signal_02_sprite.width = 500;
	_signal_02_sprite.animationSpeed = spriteSpeed;
	_signal_02_sprite.play();
	_signal_02_sprite.alpha = 0;



	let _signal_03 = new PIXI.BaseTexture.from(loader.resources['_signal_03'].url);

	gameSheet['_signal_03'] = [];


	for(let x = 0; x < gamePivot._signal_03.length; x++) {
		let frame = gamePivot._signal_03[x][0];
		let size = gamePivot._signal_03[x][1];
		let data = new PIXI.Texture(_signal_03 , new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_signal_03'].push(data);
	}

	_signal_03_sprite = new PIXI.AnimatedSprite(gameSheet['_signal_03']);
	_signal_03_sprite.animationSpeed = spriteSpeed;
	_signal_03_sprite.play();
	_signal_03_sprite.alpha = 0;


	// KICKER SPRITE

	let _kicker = new PIXI.BaseTexture.from(loader.resources['_kicker'].url);

	gameSheet['_kicker'] = [];

	for(let x = 0; x < gamePivot._kicker.length; x++) {
		let frame = gamePivot._kicker[x][0];
		let size = gamePivot._kicker[x][1];
		let data = new PIXI.Texture(_kicker, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_kicker'].push(data);
	}

	_kicker_sprite = new PIXI.AnimatedSprite(gameSheet['_kicker']);
	_kicker_sprite.x = _background.x - 170;
	_kicker_sprite.y = _background.y - 130;
	_kicker_sprite.loop = false;
	_kicker_sprite.animationSpeed = spriteSpeed;
	_kicker_sprite.alpha = 0;

	// END OF KICKER SPRITE

	// KEEPER IDLE

	let _keeper_idle = new PIXI.BaseTexture.from(loader.resources['_keeper_idle'].url);

	gameSheet['_keeper_idle'] = [];


	
	for(let x = 0; x < gamePivot._keeper_idle.length; x++) {
		let frame = gamePivot._keeper_idle[x][0];
		let size = gamePivot._keeper_idle[x][1];
		let data = new PIXI.Texture(_keeper_idle, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_keeper_idle'].push(data);
	}

	_keeper_idle_sprite = new PIXI.AnimatedSprite(gameSheet['_keeper_idle']);
	_keeper_idle_sprite.x = _background.x - 170;
	_keeper_idle_sprite.y = _background.y - 130;
	_keeper_idle_sprite.loop = true;
	_keeper_idle_sprite.animationSpeed = spriteSpeed;
	_keeper_idle_sprite.alpha = 0;

	// END OF KEPPER IDLE

	// KEPPER LEFT
	let _keeper_left = new PIXI.BaseTexture.from(loader.resources['_keeper_left'].url);

	gameSheet['_keeper_left'] = [];


	for(let x = 0; x < gamePivot._keeper_left.length; x++) {
		let frame = gamePivot._keeper_left[x][0];
		let size = gamePivot._keeper_left[x][1];
		let data = new PIXI.Texture(_keeper_left, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_keeper_left'].push(data);
	}

	_keeper_left_sprite = new PIXI.AnimatedSprite(gameSheet['_keeper_left']);
	_keeper_left_sprite.x = _background.x - 170;
	_keeper_left_sprite.y = _background.y - 130;
	_keeper_left_sprite.loop = false;
	_keeper_left_sprite.animationSpeed = spriteSpeed;

	_keeper_left_sprite.play();
	_keeper_left_sprite.alpha = 0;

	// KEEPER LEFT

	let _keeper_right = new PIXI.BaseTexture.from(loader.resources['_keeper_right'].url);
	gameSheet['_keeper_right'] = [];

	for(let x = 0; x < gamePivot._keeper_right.length; x++) {
		let frame = gamePivot._keeper_right[x][0];
		let size = gamePivot._keeper_right[x][1];
		let data = new PIXI.Texture(_keeper_right, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_keeper_right'].push(data);
	}

	_keeper_right_sprite = new PIXI.AnimatedSprite(gameSheet['_keeper_right']);
	_keeper_right_sprite.x = _background.x - 170;
	_keeper_right_sprite.y = _background.y - 130;
	_keeper_right_sprite.loop = false;
	_keeper_right_sprite.animationSpeed = spriteSpeed;

	_keeper_right_sprite.play();
	_keeper_right_sprite.alpha = 0;

	// KEEPER CENTER


	let _keeper_center = new PIXI.BaseTexture.from(loader.resources['_keeper_center'].url);
	gameSheet['_keeper_center'] = [];

	for(let x = 0; x < gamePivot._keeper_center.length; x++) {
		let frame = gamePivot._keeper_center[x][0];
		let size = gamePivot._keeper_center[x][1];
		let data = new PIXI.Texture(_keeper_center, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_keeper_center'].push(data);
	}

	_keeper_center_sprite = new PIXI.AnimatedSprite(gameSheet['_keeper_center']);
	_keeper_center_sprite.x = _background.x - 170;
	_keeper_center_sprite.y = _background.y - 130;
	_keeper_center_sprite.loop = true;
	_keeper_center_sprite.animationSpeed = spriteSpeed;

	_keeper_center_sprite.alpha = 0;


	let _effect_block = new PIXI.BaseTexture.from(loader.resources['_effect_block'].url);
	gameSheet['_effect_block'] = [];

	for(let x = 0; x < gamePivot._effect_block.length; x++) {
		let frame = gamePivot._effect_block[x][0];
		let size = gamePivot._effect_block[x][1];
		let data = new PIXI.Texture(_effect_block, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_effect_block'].push(data);
	}

	_effect_block_sprite = new PIXI.AnimatedSprite(gameSheet['_effect_block']);
	_effect_block_sprite.loop = false;
	_effect_block_sprite.animationSpeed = 0.3;
	_effect_block_sprite.alpha = 0;


	_effect_block_sprite_left = _effect_block;

	_effect_block_sprite_left = new PIXI.AnimatedSprite(gameSheet['_effect_block']);
	_effect_block_sprite_left .loop = false;
	_effect_block_sprite_left.animationSpeed = 0.3;
	_effect_block_sprite_left.alpha = 0;

	_effect_block_sprite_right = _effect_block;

	_effect_block_sprite_right = new PIXI.AnimatedSprite(gameSheet['_effect_block']);
	_effect_block_sprite_right.loop = false;
	_effect_block_sprite_right.animationSpeed = 0.3;
	_effect_block_sprite_right.alpha = 0;




	let _effect_goal =  new PIXI.BaseTexture.from(loader.resources['_effect_goal'].url);
	gameSheet['_effect_goal'] = [];

	for(let x = 0; x < gamePivot._effect_goal.length; x++) {
		let frame = gamePivot._effect_goal[x][0];
		let size = gamePivot._effect_goal[x][1];
		let data = new PIXI.Texture(_effect_goal, new PIXI.Rectangle(frame['x'],frame['y'],size['w'],size['h']));
		gameSheet['_effect_goal'].push(data);
	}

	_effect_goal_sprite = new PIXI.AnimatedSprite(gameSheet['_effect_goal']);
	_effect_goal_sprite.loop = false;
	_effect_goal_sprite.animationSpeed = 0.8;
	_effect_goal_sprite.alpha = 0;


	_effect_goal_sprite_left = new PIXI.AnimatedSprite(gameSheet['_effect_goal']);
	_effect_goal_sprite_left.loop = false;
	_effect_goal_sprite_left.animationSpeed = 0.8;
	_effect_goal_sprite_left.alpha = 0;



	_effect_goal_sprite_right = new PIXI.AnimatedSprite(gameSheet['_effect_goal']);
	_effect_goal_sprite_right.loop = false;
	_effect_goal_sprite_right.animationSpeed = 0.8;
	_effect_goal_sprite_right.alpha = 0;



	let _ball = PIXI.Sprite.from(loader.resources['_ball'].url);

	_ball.alpha = 0;
	_ball.x = 273;
	_ball.y = 320;

	sprite_container.addChild(

		_keeper_idle_sprite,
		_keeper_left_sprite,
		_keeper_right_sprite,
		_keeper_center_sprite,
		_effect_block_sprite,
		_effect_block_sprite_left,
		_effect_block_sprite_right,
		_effect_goal_sprite,
		_effect_goal_sprite_left,
		_effect_goal_sprite_right,
		_ball,
		_kicker_sprite,
		_ready_sprite,
		_signal_01_sprite,
		_signal_03_sprite,
		
	);

	function kick_left(){
		
		_ready_sprite.alpha = 0;
		_kicker_sprite.alpha = 1;
		_ball.alpha = 1;
		_keeper_center_sprite.alpha = 1;
		_keeper_center_sprite.play();
		_kicker_sprite.gotoAndStop(0);
		_kicker_sprite.play();
		createjs.Tween.get(_ball)
		.wait(1000)
		.to({x : 130 , y : 180, height : 40, width : 40 },300,createjs.Ease.linear)
	

	}

	function kick_middle(){
		_ready_sprite.alpha = 0;
		_kicker_sprite.alpha = 1;
		_ball.alpha = 1;
		_keeper_center_sprite.alpha = 1;
		_keeper_center_sprite.play();
		_kicker_sprite.gotoAndStop(0);
		_kicker_sprite.play();

		createjs.Tween.get(_ball)
		.wait(1000)
		.to({ y : 165, x : 273 + 8,  height : 40, width : 40 },300,createjs.Ease.linear)
		.call(function(){
			
		})
		
	}

	function kick_right(){
		_ready_sprite.alpha = 0;
		_kicker_sprite.alpha = 1;
		_ball.alpha = 1;
		_keeper_center_sprite.alpha = 1;
		_keeper_center_sprite.play();
		_kicker_sprite.gotoAndStop(0);
		_kicker_sprite.play();
		createjs.Tween.get(_ball)
		.wait(1000)
		.to({x : 273 + 130 , y : 180, height : 40, width : 40 },300,createjs.Ease.linear)
		
		
	}

	function block_left() {
		_effect_block_sprite_left.alpha = 1;
		_effect_block_sprite_left.gotoAndStop(0);
		_effect_block_sprite_left.play();
	}


	function block_right() {
		_effect_block_sprite_right.alpha = 1;
		_effect_block_sprite_right.gotoAndStop(0);
		_effect_block_sprite_right.play();
	}

	function goal_left() {
		_effect_goal_sprite_left.alpha = 1;
		_effect_goal_sprite_left.gotoAndStop(0);
		_effect_goal_sprite_left.play();
	}

	function goal_right() {
		_effect_goal_sprite_right.alpha = 1;
		_effect_goal_sprite_right.gotoAndStop(0);
		_effect_goal_sprite_right.play();
	}

	function goal_center() {
		_effect_goal_sprite.alpha = 1;
		_effect_goal_sprite.gotoAndStop(0);
		_effect_goal_sprite.play();
	}


	function keeper_center() {
		_keeper_center_sprite.alpha = 1;
		_keeper_center_sprite.gotoAndStop(500);
		_keeper_center_sprite.loop = false;
	}


	function keeper_left() { 
		_keeper_center_sprite.alpha = 0;
		_keeper_left_sprite.gotoAndStop(0);
		_keeper_left_sprite.play();
		_keeper_left_sprite.alpha = 1;
	}

	function keeper_right() {
		_keeper_center_sprite.alpha = 0;
		_keeper_right_sprite.gotoAndStop(0);
		_keeper_right_sprite.play();
		_keeper_right_sprite.alpha = 1;
	}

	function reset() {
		_ready_sprite.alpha = 1;
		_kicker_sprite.alpha = 0;
		_ball.alpha = 0;
		time_container.alpha = 1;
		_keeper_left_sprite.alpha = 0;
		_keeper_right_sprite.alpha = 0;
		_effect_block_sprite_right.alpha = 0;
		_effect_block_sprite_left.alpha = 0;
		resultContainer.alpha = 0;
		_effect_goal_sprite_left.alpha = 0;
		_effect_goal_sprite_right.alpha = 0;
		_ball.x = 273;
		_ball.y = 320;
		_signal_01_sprite.alpha = 0;
		_signal_02_sprite.alpha = 0;
		_signal_03_sprite.alpha = 0;

	}

	let secondIndicationStr = new PIXI.Text('20 초 후',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
	let timeIndicationStr = new PIXI.Text('12월 05일 732회차 추첨을 시작합니다.',{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});

	secondIndicationStr.x = _ready_sprite.x + 140;
	secondIndicationStr.y = _ready_sprite.y + 185;
	timeIndicationStr.x = secondIndicationStr.x - 90;
	timeIndicationStr.y = secondIndicationStr.y + 25;

	let time_container = new PIXI.Container();

	app.stage.addChild(_background,_signal_02_sprite,_bg_fb_Text,_goal_post,_game_title,UTCTIME,graph_container,_game_btnSounds,_game_btnMusic);

	time_container.addChild(secondIndicationStr,timeIndicationStr);


	app.stage.addChild(sprite_container,time_container,resultContainer);



	app.ticker.add((delta) => {
		// READY CHARACTER POSITION PER FRAME 
		_ready_sprite.y = gamePivot._ready[_ready_sprite.currentFrame][1]['y'] +  (_background.y - 140);
		_ready_sprite.x = gamePivot._ready[_ready_sprite.currentFrame][1]['x']  +  (_background.x - 185);

		// KICKER CHARACTER POSITION PER FRAME 
		_kicker_sprite.y = gamePivot._kicker[_kicker_sprite.currentFrame][1]['y'] +  (_background.y - 40);
		_kicker_sprite.x = gamePivot._kicker[_kicker_sprite.currentFrame][1]['x']  +  (_background.x - 140);

		// KEEPER CHARACTER POSITION PER FRAME 
		_keeper_idle_sprite.y = gamePivot._keeper_idle[_keeper_idle_sprite.currentFrame][1]['y'] +  (_background.y - 180);
		_keeper_idle_sprite.x = gamePivot._keeper_idle[_keeper_idle_sprite.currentFrame][1]['x']  +  (_background.x - 90);


		// KEEPER CHARACTER POSITION PER FRAME 
		_keeper_left_sprite.y = gamePivot._keeper_left[_keeper_left_sprite.currentFrame][1]['y'] +  (_background.y - 180);
		_keeper_left_sprite.x = gamePivot._keeper_left[_keeper_left_sprite.currentFrame][1]['x']  +  (_background.x - 215);


		// KEEPER CHARACTER POSITION PER FRAME 
		_keeper_right_sprite.y = gamePivot._keeper_right[_keeper_right_sprite.currentFrame][1]['y'] +  (_background.y - 180);
		_keeper_right_sprite.x = gamePivot._keeper_right[_keeper_right_sprite.currentFrame][1]['x']  +  (_background.x - 70);


		// KEEPER CHARACTER POSITION PER FRAME 
		_keeper_center_sprite.y = gamePivot._keeper_center[_keeper_center_sprite.currentFrame][1]['y'] +  (_background.y - 190);
		_keeper_center_sprite.x = gamePivot._keeper_center[_keeper_center_sprite.currentFrame][1]['x']  +  (_background.x - 70);

		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_block_sprite.y = gamePivot._effect_block[_effect_block_sprite.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_block_sprite.x = gamePivot._effect_block[_effect_block_sprite.currentFrame][1]['x']  +  (_background.x - 120);

		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_block_sprite_left.y = gamePivot._effect_block[_effect_block_sprite_left.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_block_sprite_left.x = gamePivot._effect_block[_effect_block_sprite_left.currentFrame][1]['x']  +  (_background.x - 270);

		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_block_sprite_right.y = gamePivot._effect_block[_effect_block_sprite_right.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_block_sprite_right.x = gamePivot._effect_block[_effect_block_sprite_right.currentFrame][1]['x']  +  (_background.x);
		



		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_goal_sprite.y = gamePivot._effect_goal[_effect_goal_sprite.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_goal_sprite.x = gamePivot._effect_goal[_effect_goal_sprite.currentFrame][1]['x']  +  (_background.x - 120);

		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_goal_sprite_left.y = gamePivot._effect_goal[_effect_goal_sprite_left.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_goal_sprite_left.x = gamePivot._effect_goal[_effect_goal_sprite_left.currentFrame][1]['x']  +  (_background.x - 270);

		// KEEPER CHARACTER POSITION PER FRAME 
		_effect_goal_sprite_right.y = gamePivot._effect_goal[_effect_goal_sprite_right.currentFrame][1]['y'] +  (_background.y - 220);
		_effect_goal_sprite_right.x = gamePivot._effect_goal[_effect_goal_sprite_right.currentFrame][1]['x']  +  (_background.x);



		// KEEPER CHARACTER POSITION PER FRAME 
		_signal_01_sprite.y = gamePivot._signal_01[_signal_01_sprite.currentFrame][1]['y'] +  (_background.y - 243);
		_signal_01_sprite.x = gamePivot._signal_01[_signal_01_sprite.currentFrame][1]['x']  +  (_background.x - 228);

		// KEEPER CHARACTER POSITION PER FRAME 
		_signal_02_sprite.y = gamePivot._signal_02[_signal_02_sprite.currentFrame][1]['y'] +  (_background.y - 160);
		_signal_02_sprite.x = gamePivot._signal_02[_signal_02_sprite.currentFrame][1]['x']  +  (_background.x - 265);

		// KEEPER CHARACTER POSITION PER FRAME 
		_signal_03_sprite.y = gamePivot._signal_03[_signal_03_sprite.currentFrame][1]['y'] +  (_background.y - 140);
		_signal_03_sprite.x = gamePivot._signal_03[_signal_03_sprite.currentFrame][1]['x']  +  (_background.x - 185);




		var targetTime = new Date(moment().add(0,'seconds').format());
		var timeZone = +9.00; //time zone value from database
		var tzDifference = timeZone * 60 + targetTime.getTimezoneOffset();
		var today = new Date(targetTime.getTime() + tzDifference * 60 * 1000);


		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		let hh = String(today.getHours()).padStart(2, '0');
		let m = today.getMinutes();
		let ss = (60 - today.getSeconds());
		

		if (ss == 5) {
			if (!before5SecondsSound) {

				let musicL = PIXI.Loader.shared;
				before5SecondsSound = true;
				musicL.load(function(loader, resources) {
				   resources.bgMusic.sound.volume = 0.0;
				    musicL.load(function(loader, resources) {
				        resources.b5seconds.sound.play();
				    });
				});
			}
		}


		if (ss == 60) {
			if (!animationIsPlaying) {
				backgroundMusic.volume = 0;
				animationIsPlaying = true;

				setTimeout(function() {
					fetch(apiRecord+'/api/soccer/get-result/limit/1').then((res) => {
						return res.json();
					}).then((data) => {
						animGameState = true;
						let nextRound = parseInt(data[0]['round']) + 1;
						game_rounds = nextRound;
						graphRound.text = nextRound+'회' + ' 배팅현황';
						resultRound.text =  data[0]['round'] + ' 회차 결과';
						
						time_container.alpha = 0;
						soccer_start.play();
						_signal_03_sprite.alpha = 0;
						setTimeout(function(){
							soccer_kick.play();
							

							if (data[0]['keeper'] == 1) {
								keeper_left();
								_left_slot_2.alpha = 1;
								_right_slot_2.alpha = 0;
								result_slot_2_text.text = '왼쪽';
								_left_slot_5.alpha = 1;
								_right_slot_5.alpha = 0;
							} else {
								keeper_right();
								_right_slot_2.alpha = 1;
								_left_slot_2.alpha = 0;
								result_slot_2_text.text = '오른쪽';
								_right_slot_5.alpha = 1;
								_left_slot_5.alpha = 0;
							}

							if (data[0]['keeper'] == 0 && data[0]['kicker'] == 0) {
								block_right();
								result_slot_3_text.text = '노골';
								soccer_block.play();
								
							}

							if (data[0]['keeper'] == 1 && data[0]['kicker'] == 1) {
								
								block_left();
								result_slot_3_text.text = '노골';
								soccer_block.play();
							}

							if (data[0]['keeper'] == 1 && data[0]['kicker'] == 0) {
								goal_right();
								result_slot_3_text.text = '골인';
								soccer_applause.play();
							}

							if (data[0]['keeper'] == 0 && data[0]['kicker'] == 1) {
								
								goal_left();
								result_slot_3_text.text = '골인';
								soccer_applause.play();
							}


							createjs.Tween.get(resultContainer)
							.wait(1000)
							.to({alpha: 1},500,createjs.Ease.linear)
							.call(function(){
								appendResult(data[0],'animate__animated  animate__slideInLeft');
								common_result.play();
							})
							setTimeout(function(){
								animationIsPlaying = false;
								before5SecondsSound = false;
								if (!musicMute) {
									resources.bgMusic.sound.volume = 1;
								}
								isPlayingprevisionSound = false;
								animGameState = false;
								reset();
							},10000)

						},1000)
						
						if (data[0]['kicker'] == 1) {
							kick_left();
							_left_slot_1.alpha = 1;
							_right_slot_1.alpha = 0;
							result_slot_1_text.text = '왼쪽';

							_left_slot_4.alpha = 1;
							_right_slot_4.alpha = 0;
						} else {
							kick_right();
							_right_slot_1.alpha = 1;
							_left_slot_1.alpha = 0;
							result_slot_1_text.text = '오른쪽';
							_right_slot_4.alpha = 1;
							_left_slot_4.alpha = 0;
						}

					}).catch((error) => {
						alert(error);
					})
				},2000)
			}
		}


		if (ss < 45) {
			if (game_rounds.toString().slice(-2) == '10') {
				_ready_sprite.alpha = 0;
				_signal_03_sprite.alpha = 1;
				if (!isPlayingprevisionSound) {
					prevision1.play();
					backgroundMusic.pause();
					isPlayingprevisionSound = true;
				}
			} 

			if (game_rounds.toString().slice(-2) == '50') {
				_ready_sprite.alpha = 0;
				_bg_fb_Text.alpha = 0;
				_signal_01_sprite.alpha = 1;
				_signal_02_sprite.alpha = 1;
				if (!isPlayingprevisionSound) {
					prevision2.play();
					backgroundMusic.pause();
					isPlayingprevisionSound = true;
				}
			}

			if (game_rounds.toString().slice(-2) == '00') {
				_ready_sprite.alpha = 0;
				_bg_fb_Text.alpha = 0;
				_signal_01_sprite.alpha = 1;
				_signal_02_sprite.alpha = 1;
				_signal_03_sprite.alpha = 1;
				if (!isPlayingprevisionSound) {
					prevision3.play();
					backgroundMusic.pause();
					isPlayingprevisionSound = true;
				}
			}


		}



		if (animationIsPlaying) {
			secondIndicationStr.text = '잠시후에 ';
		} else {
			let roundNum = ss+'';
			secondIndicationStr.text = roundNum.padStart(2, "0") + ' 초 후';
		}

		timeIndicationStr.text = mm+'월 '+dd+'일 ' +game_rounds+ ' 회차 추첨을 시작합니다.';
		today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + m + ':' + String(today.getSeconds()).padStart(2, '0') + ' GMT+09:00';
		UTCTIME.text = today;

	})

	fetch(apiRecord+'/api/soccer/get-result/limit/20').then((res)=>{
		return res.json();
	}).then((data) => {
		let nextRound = parseInt(data[0]['round']) + 1;
		game_rounds = nextRound;
		graphRound.text = nextRound+'회' + ' 배팅현황';
		resultRound.text =  data[0]['round'] + ' 회차 결과';
		for (var i = data.length - 1; i >= 0; i--) {
			appendResult(data[i],'');
			lastRound = data[i]['round'];
		}

	})


	function appendResult(DataResult,anim) {
		let targetTime = new Date(DataResult['created_at']);
		var timeZone = +9.00; //time zone value from database
		var tzDifference = timeZone * 60 + targetTime.getTimezoneOffset();

		var korTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

		// let korTime = new Date(today.toLocaleString('en-GB', { timeZone: 'Asia/Seoul' }));
		let month = korTime.getMonth() + 1;
		let day = String(korTime.getDate()).padStart(2, '0');
		let card = document.createElement('div');

		let imgAddr = '';
		if (DataResult['kicker'] == '0' && DataResult['keeper'] == '0') {
			imgAddr = 'assets/images/history/soccer_1_1.png';
		} else if (DataResult['kicker'] == '1' && DataResult['keeper'] == '1') {
			imgAddr = 'assets/images/history/soccer_2_2.png';
		} else if(DataResult['kicker'] == '0' && DataResult['keeper'] == '1') {
			imgAddr = 'assets/images/history/soccer_1_2.png';
		} else if (DataResult['kicker'] == '1' && DataResult['keeper'] == '0') {
			imgAddr = 'assets/images/history/soccer_2_1.png';
		}

		card.innerHTML = '<div class="card-result '+anim+'">'+
					'<label>'+month+'월'+day+'일 '+DataResult['round']+' 회차</label>'+
					'<img src="'+imgAddr+'">'+
					'<div class="bettingstatus">'+
						'<span class="bettingstatus1" style="width:50%;">'+
							'<img src="assets/images/game/space.gif">'+
						'</span>'+
						'<span class="bettingstatus2" style="width:50%;">'+
							'<img src="assets/images/game/bettingstatus.png">'+
						'</span>'+
					'</div>'+
				'</div>';
		document.getElementsByClassName('result-container')[0].prepend(card);
	}



	document.addEventListener("visibilitychange", function() {
	      if (!document.hidden) {
	      	if (!animGameState) {
		        fetch(apiRecord+'/api/get-result/limit/20').then((res)=>{
		        	return res.json();
		        }).then((data) => {
		        	let nextRound = parseInt(data[0]['round']) + 1;
		        	game_rounds = nextRound;
		        	graphRound.text = nextRound+'회' + ' 배팅현황';
		        	resultRound.text =  data[0]['round'] + ' 회차 결과';
		        	for (var i = data.length - 1; i >= 0; i--) {
		        		appendResult(data[i],'');
		        		lastRound = data[i]['round'];
		        	}
		        })

	      	}

	      	if (!musicMute) {
	      		backgroundMusic.volume = 1;
	      	}
	      	if (!soundMute) {

		      	b5seconds.volume = 1;
		      	soccer_start.volume = 1;
		      	soccer_kick.volume = 1;
		      	soccer_block.volume = 1;
		      	soccer_applause.volume = 1;
		      	common_result.volume = 1;
		      	prevision1.volume = 1;
		      	prevision2.volume = 1;
		      	prevision3.volume = 1;
	      	}

	      } else {

	      	if (!musicMute) {
	      		backgroundMusic.volume = 0;
	      	}
	      	if (!soundMute) {

		      	b5seconds.volume = 0;
		      	soccer_start.volume = 0;
		      	soccer_kick.volume = 0;
		      	soccer_block.volume = 0;
		      	soccer_applause.volume = 0;
		      	common_result.volume = 0;
		      	prevision1.volume = 0;
		      	prevision2.volume = 0;
		      	prevision3.volume = 0;
	      	}
	      }
	});


}


