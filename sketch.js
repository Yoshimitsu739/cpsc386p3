///global

//-----------------------------game control
var stage = 0; //keeps track of which function to run
//0=menu
//1=game
//2=lvl 2 not implemented
//3=lose

//-------------------------------player
var p1x = 100; //p1 for player 1
var p1y = 375;
var pWidth = 50;
var pHeight = 90;


//--------------------------walking code
var step = 0;
var lookRight = true;
var lookLeft = false;
var isShooting = false;

//-------------------------enemies
var virus1x = 900;
var virus1y = 375;
var virusW = 75;
var virusH =120;

//------------------------------npc
var npcx = 200;//bunny
var npcy = 375;
var npcW = 75;
var npcH = 75;

//------------------------------------------platforms

var b1x = 300; //platform 1
var b1y = 300;
var b2x = 500;//platform 2
var b2y = 150;
var b3x = 700;//platform 3
var b3y = 250;
var b4x = 900;//platform 4
var b4y = 100;
var b5x = 1200;//platform 5
var b5y = 300;
var bWidth = 75;
var bHeight = 30;

//-----------------------------------------------------------gravity
var jump = false; //are we jumping?
var direction = 1; //the force of gravity in the y direction
var velocity = 1; //the speed of player
var jumpPower = 12.5; //the energy or strength of player
var fallingSpeed = 4; //equal to velocity
var minHeight = 375; //height of ground
var maxHeight = 50; //height of sky
var jumpCounter = 0; //keeps track of how much we are jumping

//-----------------------------------------------------------------------counters
var score = 0;
var healths = 10;
var vhealth = 2;
var offsetx = 500;
var offsetI = 500;

var bullets;
var bulletW = 10;
var bulletH = 15;
var c = 0

//-------------------------------------------------------------------------------------------------------mulitmedia
var fred;
var fredRW;
var fredLW;
var fredShoot;
var virusR;
var bunnyL;
var bunnygif;
var bunnyR;
var platform;//highway
var backdrop;// main backdrop
var menuFont;// Font for the mmenu/splash screen

var bulletImg;



//--------------------------------------------------------------------------preload
function preload(){
//bulletImg = loadImage('assets/bullet.png');
virus1R = loadImage('assets/EnemyL.gif');
bunnyL = loadImage('assets/bunnycolor01.png');
bunnygif =loadImage('assets/bunny_standing.gif');
bunnyR = loadImage('assets/bunnycolor02.png');
fred = loadImage('assets/fredstanding/fredSL.gif');
fredRW = loadImage('assets/walking/FredRW.gif');
fredLW = loadImage('assets/walking/FredLW.gif');
fredShoot = loadImage('assets/shooting/Shooting_.gif')
platform = loadImage('assets/bronze_tile_walkway.png');
backdrop = loadImage('assets/Background.png');
menuFont = loadFont('assets/fonts/ESCAPADE.TTF');
bulletImg = loadImage('assets/tranqdart.png');
}//close preload

//----------------------------------------------------------------------------setup
function setup() {

	createCanvas(1000, 500);
	rectMode(CENTER);
	textAlign(CENTER);
	imageMode(CENTER);
	 bullets = new Group();
}
//close setup

//---------------------------------------------------------------------------draw
function draw() {
//call functions
	//keyPressed();
	keyTyped();
	gravity();
frameRate(60);
	if(stage == 0){
		//menu();
		image(backdrop,width/2,height/2, width, height)
		textFont('Georgia');
		textSize(28);
		textStyle(BOLD);
		textAlign(CENTER);
		text("Eradication Man", width/2,150);
		textSize(28);
		text("Press 'Return' to start", width/2, 300);
		text("Arrows to move", width/2 ,350);
		text("Space bar to jump", width/2 ,400);
		text("By The Cure - 2020", width/2 ,450);
		camera.zoom = 1;
		camera.position.x=width/2;
		camera.position.y=300;
		p1x=100;
		p1y=375;
		npcx=200;
		npcy= 375;
		virus1x=900;
		virus1y=375;
		offsetx = 500;

		if(keyIsDown(ENTER))
			{
				stage = 1;
			}
	}//close = 0

	if(stage == 1){
		game();



		// Camera should follow fred.
		if(keyIsDown(82)){// reset
			healths = 10;
			p1x=100;
			p1y=375;
			npcx=200;
			npcy= 375;
			virus1x=900;
			virus1y=375;
			offsetx = 500;
			//stage = 0;
		}// close key press

	}//close = 1

	if (stage == 3){//lose screen

image(backdrop,width/2,height/2, width, height)
		textFont('Georgia');
		textSize(28);
		textStyle(BOLD);
		textAlign(CENTER);
		text('You lost!',500,150);
		text('Press R to restart',500,250);
		camera.zoom=1;
		camera.position.x=width/2;
		camera.position.y=300;
		if(keyIsDown(82)){
			healths = 10;
			p1x=100;
			p1y=375;
			npcx=200;
			npcy= 375;
			virus1x=900;
			virus1y=375;
			offsetx = 500;
			stage = 0;
		}// close key press
	}//close = 3
drawSprites();

}//close draw

// platforms
function platforms(){
	//draw platforms
		stroke(0);
		strokeWeight(5);
		fill(255, 120, 0);//orange

		image(platform,b2x,b2y,bWidth,bHeight);
		image(platform,b1x,b1y,bWidth,bHeight);
		image(platform,b3x,b3y,bWidth,bHeight);
	  image(platform,b4x,b4y,bWidth,bHeight);
		image(platform,b5x,b5y,bWidth,bHeight);
	//box1 collision
		if(p1x >= b1x-bWidth/2 && p1x <= b1x+bWidth/2 && p1y+pHeight/2 >= b1y-bHeight/2 && p1y-pHeight/2 <= b1y+bHeight/2 && jump == false){
			p1y = b1y-55;//dont fall and rest on top of platform
			velocity = 0; //no speed becuase we arent falling
			jumpCounter = 0;//allows us to jump again
		}//close if on box
		//box2 collision
			if(p1x >= b2x-bWidth/2 && p1x <= b2x+bWidth/2 && p1y+pHeight/2 >= b2y-bHeight/2 && p1y-pHeight/2 <= b2y+bHeight/2 && jump == false){
				p1y = b2y-55;//dont fall and rest on top of platform
				velocity = 0; //no speed becuase we arent falling
				jumpCounter = 0;//allows us to jump again
			}//close if on box
			//box3 collision
			if(p1x >= b3x-bWidth/2 && p1x <= b3x+bWidth/2 && p1y+pHeight/2 >= b3y-bHeight/2 && p1y-pHeight/2 <= b3y+bHeight/2 && jump == false){
				p1y = b3y-55;//dont fall and rest on top of platform
				velocity = 0; //no speed becuase we arent falling
				jumpCounter = 0;//allows us to jump again
			}//close if on box
			//box4 collision
				if(p1x >= b4x-bWidth/2 && p1x <= b4x+bWidth/2 && p1y+pHeight/2 >= b4y-bHeight/2 && p1y-pHeight/2 <= b4y+bHeight/2 && jump == false){
					p1y = b4y-55;//dont fall and rest on top of platform
					velocity = 0; //no speed becuase we arent falling
					jumpCounter = 0;//allows us to jump again
				}//close if on box
				//box5 collision
					if(p1x >= b5x-bWidth/2 && p1x <= b5x+bWidth/2 && p1y+pHeight/2 >= b5y-bHeight/2 && p1y-pHeight/2 <= b5y+bHeight/2 && jump == false){
						p1y = b5y-55;//dont fall and rest on top of platform
						velocity = 0; //no speed becuase we arent falling
						jumpCounter = 0;//allows us to jump again
					}//close if on box
}

//---------------------------------------------------------------------------game
function game(){
//appearance of game
	background(255);//black
	image(backdrop,offsetx-1000,height/2,width,height)//left
  image(backdrop,offsetx,height/2, width, height)//main
	image(backdrop,offsetx+width,height/2,width,height)//rightbackdrop
	image(backdrop,offsetx+(2*width),height/2,width,height)//far right
	image(backdrop,offsetx+(3*width),height/2,width,height)

	camera.position.x = width/2+(p1x-300);
	camera.position.y = p1y-50;
	camera.zoom = 1.5;
//window frame
	//noFill();
	//stroke(0);
	//strokeWeight(15);
	//rect(width/2, height/2, width, height);


//draw player
//image(fred,p1x,p1y,pWidth,pHeight);
player1();
platforms();



//draw enemies
image(virus1R,virus1x,virus1y,virusW,virusH)
//virus collision

if (p1x >= virus1x-virusW/2 && p1x <= virus1x+virusW/2 && p1y >= virus1y-virusH/2 && p1y <= virus1y+virusH/2){
	//hiting goomba
	healths = healths-2; // taking damage
	p1x = p1x-50;
if (healths == 0)
stage = 3;
}


//draw npc
image(bunnygif,npcx,npcy,npcW,npcH)


//health
textFont('Georgia');
fill(255,0,0);
stroke(0);
strokeWeight(2);
textSize(20);
text('Health:',p1x-25,p1y-50);
text(healths,p1x+20,p1y-50);


keyPressed();// move the characters only when game=1;
}//close game


//-------------------------------------------------------------gravity
function gravity(){

	if(p1y >= minHeight && jump == false){
		//STOP FALLING ON THE GROUND
		p1y = p1y; //dont fall
		jumpCounter = 0;//reset jump counter when landing
	}//close on ground
	else{
		p1y = p1y + (direction*velocity); //the code that makes gravity work
	}//else fall


	if(jump == true){
		if(p1y <= maxHeight || jumpCounter >= jumpPower){
			if(p1y >= minHeight){
				p1y = minHeight;
			}//close at min already
			else{
				velocity = fallingSpeed; //fall at maximums
			}//close else not at min
		}//close at max
		else{
			velocity = -jumpPower; //jumping
			jumpCounter = jumpCounter+1;//add to jump counter
		}//close else not at max
	}//close jump
	else{
		velocity = fallingSpeed;
	}//close not jumping


 if(p1x+pWidth/2 >= width*3){// exceed the right wall of screen
	 p1x=p1x-5;
 }//close at width
 if(p1x-pWidth/2 <= 0){// exceed the left wall of screen
 	p1x=p1x+5;
}//close at 0
}//close gravity


//---------------------------------------------------------player1
function player1(){
//image(fred,p1x,p1y,pWidth,pHeight);//og image of p1

	if (lookRight==true){//walk to right
		lookLeft = false;
		step=step+1//walk right;
		if (step>0 && step<= 5){
		image(fredRW,p1x,p1y,pWidth,pHeight);
		step = 0;
		}
	}//close walking right

	if (lookLeft==true){//walk to left
		lookRight = false;
		step=step+1//walk right;
		if (step>0 && step<= 5){
		image(fredLW,p1x,p1y,pWidth,pHeight);
		step=0;//restart step
			}//close step
	}//close walking left

if (lookRight == false && lookLeft == false && isShooting == false){//not walking
	image(fred,p1x,p1y,pWidth,pHeight);}
else if( isShooting == true){

			image(fredShoot,p1x,p1y,pWidth,pHeight);
			var bullet = createSprite(p1x+10, p1y,bulletW,bulletH);
			bullet.addImage(bulletImg);
			bullet.setSpeed(10,0);
			bullet.life = 30;
			bullets.add(bullet);
			isShooting = false;
		}
}//close player1


//----------------------------------------------------------------------------keypressed
function keyPressed(){

	if (keyWentDown(88)){
		c= c+1;
		isShooting = true;
	}

	if(keyDown(37)){ // left key
		p1x = p1x-5; //move left
		virus1x = virus1x-2
		npcx = npcx+8;
		offsetx--;
			if(offsetx<= -width){
				offsetx = 500;
			}

		if (p1x > virus1x){
			virus1x = virus1x+2;
		}
		lookLeft = true;}
	else {
			lookLeft = false;
		}//close else not left


	if(keyDown(39)){ // right key
		p1x = p1x+5; //move right

		npcx = npcx+8;

offsetx++;
if((offsetx-100)>= width){
	offsetx = 500;
}
		if (p1x > virus1x){
			virus1x = virus1x+2;
		}
		lookRight=true;}
		else {
			lookRight = false;
		}//close else not right



}//close keypressed

//-------------------------------------------------------------------------------------keytyped
function keyTyped(){
	if(keyDown(32)){ //use spacebar to jump+
		jump = true; //jump
	}//a pressed
	else{
		jump = false; //dont jump
	}//close not a

	/*if(stage == 0)
		{

		}*/

}//close keytyped
