var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_image;
var cloudGroup, obstacleGroup;
var rand;
var ob1, ob2, ob3, ob4, ob5, ob6;
var count = 0;
var PLAY = 1;
var END = 0;
var gameState  = PLAY;
var gameOver, gameOver_image;
var restart, restart_image;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}

function setup() {
  
  createCanvas(600, 200);
  
  gameOver = createSprite(400,100);
  gameOver.addAnimation("gameOver", gameOver_image);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart = createSprite(400,140);
  restart.addAnimation("restart", restart_image);
  restart.visible = false;
  restart.scale = 0.5;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  trex.collide(invisibleGround);
  text("Score: "+ count, 450, 50);
  
  console.log(gameState);
  
  if (gameState === PLAY) {
  
    count = count + Math.round(getFrameRate()/60);

    spawnClouds();
    spawnObstacles();


    if(keyDown("space") && trex.y >= 161) {
      trex.velocityY = -15;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if (trex.isTouching(obstacleGroup)) {
        gameState = END;
        }
  
  } else if(gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      //set velcity of each game object to 0
      ground.velocityX = 0;
      trex.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);

      //change the trex animation
      trex.changeAnimation("trex_collided", trex_collided);

      //set lifetime of the game objects so that they are never destroyed
      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
  } 
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addAnimation("clout", cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloudGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200/3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    obstacleGroup.add(obstacle);
    
    switch(rand){
      case 1: obstacle.addAnimation("obstacle", ob1);
      break;
      case 2: obstacle.addAnimation("obstacle", ob2);
      break;
      case 3: obstacle.addAnimation("obstacle", ob3);
      break;
      case 4: obstacle.addAnimation("obstacle", ob4);
      break;
      case 5: obstacle.addAnimation("obstacle", ob5);
      break;
      case 6: obstacle.addAnimation("obstacle", ob6);
      break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 600/6;
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  count = 0;
  
}








