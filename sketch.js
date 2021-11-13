var superMan;
var Boost;
var Ground;
var gameState = 'play';
var score = 0;
var boostGroup;
var Enemy;
var enemyGroup;
var Restart;
var gameOver;
var supermanImg,boostImg, backgroundImg, EnemyImg1, EnemyImg2, EnemyImg3;
var bg;
var gameOverImg;
var restartImg;
var life1;
var life2;
var life3;
var boost=0;
var life1Img;
var life2Img;
var life3Img;



function preload () {
	supermanImg=loadImage("Images/superman.png");
	boostImg=loadImage("Images/Boost1new.png");
	backgroundImg=loadImage("Images/bg1.png");
    EnemyImg1=loadImage("Images/Enemy1new.png");
	EnemyImg2=loadImage("Images/Enemy2.png");
	EnemyImg3=loadImage("Images/Enemy3new.png");
	gameOverImg=loadImage("Images/GameOver.png");
	restartImg=loadImage("Images/Restart.png");
	life1Img=loadImage("Images/lives1.png");
	life3Img=loadImage("Images/lives1.png");
	ife3Img=loadImage("Images/lives1.png");

}

function setup () {
	createCanvas(1000,500);
	bg =  createSprite(500,250,1000,500);
	bg.addImage(backgroundImg);
	Ground = createSprite(500,450,2000,10);
	Ground.velocityX = -4;
	Ground.visible=false;
	
	superMan = createSprite(130,380);
	superMan.addImage(supermanImg);
    superMan.scale=0.1
	
	boostGroup = new Group ();
	enemyGroup = new Group ();
	
	Restart = createSprite(500,350,20,20);
	Restart.addImage(restartImg);
	Restart.scale=0.05;
	gameOver = createSprite(480,200,40,40);
	gameOver.addImage(gameOverImg);

	//life1=createSprite("1000,500,100,100")
	//life1.addImage(life1Img);
	//life1.scale=0.1;

}

function draw () {
	background("black");

    textSize(25);
    fill("blue");	
	text("Score : "+ boost ,50,40);

	if (gameState === 'play'){
		Restart.visible = false;
		gameOver.visible = false;
	if (Ground.x<0) {
		Ground.x = 700;
	}

	if (keyDown('UP_ARROW') && superMan.y>50){
		superMan.y = superMan.y-10;
	}
	if (keyDown('DOWN_ARROW') && superMan.y<450){
		superMan.y = superMan.y+5;
	}
	if (keyDown('RIGHT_ARROW') && superMan.x<550) {
		superMan.x = superMan.x+5;
	}
	if (keyDown('LEFT_ARROW') && superMan.x>70){
		superMan.x = superMan.x-10;
	}

	spawnBoost();
	spawnEnemies();
	


	if (boostGroup.isTouching(superMan)){
		boostGroup.destroyEach();
		boost=boost+10;
	}
	if (enemyGroup.isTouching(superMan)){
		life=Math.round(random(100,1000));
		gameState = 'end';
		
	}
}
else if (gameState === 'end'){
	gameOver.visible = true;
	Restart.visible = true;
	Ground.velocityX = 0;
	boostGroup.setVelocityXEach(0);
	boostGroup.setLifetimeEach(-1);
	enemyGroup.destroyEach();
	superMan.visible=false;
	if(mousePressedOver(Restart)) {
		reset();
	}
}
	
	drawSprites();
}

function reset () {
	gameState = "play";
	Ground.velocityX=-4;
	boostGroup.destroyEach();
	superMan.visible=true;
	life=0;
	boost=0;
	superMan.X=700;
	superMan.Y=300;
}

function spawnBoost(){
	if (frameCount%150 === 0){
		Boost = createSprite(10000,20,20,20);
		Boost.y = Math.round(random(125,375));
		Boost.addImage(boostImg);
		Boost.scale=0.13;

		Boost.velocityX = -4;
	    Boost.depth = superMan.depth;
		superMan.depth = superMan.depth+1;
		Boost.lifetime = 250;
		boostGroup.add(Boost);

	}
}

function spawnEnemies (){
	if(frameCount%100 === 0){
		Enemy = createSprite(1000,20,20,20);
		Enemy.y = Math.round(random(100,400));
		Num = Math.round(random(1,3));
		switch(Num){
			case 1 : Enemy.addImage(EnemyImg1);
			break;
			case 2 : Enemy.addImage(EnemyImg2);
			break;
			case 3 : Enemy.addImage(EnemyImg3);
			break;
			default : break;
		}
		Enemy.scale=0.16;
		Enemy.velocityX = -5;
		Enemy.lifetime = 200;
		enemyGroup.add(Enemy);
	}
}
