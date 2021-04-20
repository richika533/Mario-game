var PLAY= 0;
var END= 1;
var gameState= 0;

var mario,mario_collided,mario_running;
var ground,groundImg;

var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var brickImg;
var score;
var restartImg,gameOverImg;
var backgroundImg;

var checkPointSound,jumpSound,dieSound;

function preload(){
  mario_running = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
  mario_collided = loadAnimation("collided.png")
  
  brickImg = loadImage("brick.png")
  
  groundImg = loadImage("ground2.png");
  backgroundImg = loadImage("bg.png");
  
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,400)
  //creating sprites giving them scale and adding image and animation to them
  mario = createSprite(70,300,30,20)
  mario.addAnimation("running",mario_running)
  mario.addAnimation("collided",mario_collided)
  mario.scale= 1.7;
  
  ground= createSprite(50 ,370,20,40)
  ground.addImage("ground",groundImg)
  
  restart= createSprite(310,200,20,20)
  restart.addImage("restart",restartImg)
  restart.scale= 0.5
  restart.visible= false;
  
  gameOver= createSprite(300,150,20,20)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale= 0.7
  gameOver.visible= false;
  
  InvisibleGround= createSprite(300,342,600,20)
  InvisibleGround.visible= false;
  
  //creating group for obstacles
  obstacleGroup= new Group()
  
  //setting the collision radius for the sprite
  mario.setCollider("rectangle",0,0,mario.width,mario.height)
  
  mario.debug= false;
  
  score= 0;
}

function draw(){
  background(backgroundImg)

  //giving the if condition for the gameState play
  if(gameState === PLAY){
    //move the
    gameOver.visible= false;
    restart.visible= false;
    
    //changing the mario animation
    mario.changeAnimation("running",mario_running)
    
    //giving the velocityX to the ground  
    ground.velocityX = -(4 + 3* score/100)
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //playing the checkPoint sound
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
      
  ground.velocityX= -7
  if(ground.x<0){
    ground.x= 300
  }
    //when the space key is pressed the jump sound will play
    if(keyDown("space")&& mario.y> 299){
    mario.velocityY= -10
    jumpSound.play();
  }
    //adding gravity to the mario
  mario.velocityY= mario.velocityY + 0.5
    
    //spawn obstacles on the ground
    spawnObstacles();
  
  if(obstacleGroup.isTouching(mario)){
        //jumpSound.play();
        gameState = END;
        dieSound.play()
    }
 }
   else if(gameState === END){
     gameOver.visible= true;
     restart.visible= true;
     //changing the animation of mario
     mario.changeAnimation("collided",mario_collided)
     
     ground.velocityX = 0;
     mario.velocityY = 0;
     
    //set lifetime for the game objects
    obstacleGroup.setLifetimeEach(-1)
     
    obstacleGroup.setVelocityXEach(0);
}
  
  if(mousePressedOver(restart)){
    reset()
  }
  
  mario.collide(InvisibleGround)
  
  console.log(mario.y)
    drawSprites()
  fill("black")
  //displaying the text for the score
  text("Score :" + score, 300,20)
  
} 
  
function reset(){
  gameState= PLAY
  gameOver.visible= false;
  restart.visible= false;
  obstacleGroup.destroyEach();

  score= 0;
}
  
function spawnObstacles(){
  if(frameCount % 70===0){
    var obstacle= createSprite(500,310,20,40)
    obstacle.addAnimation( "Obstacle", obstacleImg)
    obstacle.velocityX= -(7 + score/70)
 
     //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.0;
    obstacle.lifetime = 400;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
} 



  

  

  


