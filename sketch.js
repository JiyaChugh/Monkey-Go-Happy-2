var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, bananaG, obstacleG;
var FoodGroup, obstacleGroup
var score, gameState, ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkeyCollided = loadAnimation("sprite_5.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  building = loadImage("download.jpg");
}



function setup() {

  createCanvas(600, 400);
  gameState = "play";
  survivalTime = 0;

  score = 0;
  ground = createSprite(300, 290, 600, 20);
  ground.visible=false;

  monkey = createSprite(90, 250, 20, 20);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.1;
  monkey.debug=true;
  monkey.setCollider("circle",0,0,250)

  bananaG = new Group();
  obstacleG = new Group();
}


function draw() {
  background(building );
  console.log(monkey.y)
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 50, 50);

  stroke("black");
  textSize(20);  
  fill("black");
  text("Survival Time:" + survivalTime, 250, 50);

  if (gameState === "play") {
    spawnBanana();
    spawnObstacle();
    monkey.collide(ground);
  
  if (keyDown("space") && monkey.y>=240) {
    monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  if (bananaG.isTouching(monkey)) {
    bananaG.destroyEach();
    score++;
  }
  if (obstacleG.isTouching(monkey) ) {
    gameState = "end";
  }
    
    
  survivalTime = Math.ceil(frameCount / frameRate());
    
  }
  if (gameState === "end") {
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    obstacle.lifetime = -1;
    banana.lifetime = -1;
    monkey.velocityY = 0;
    monkey.changeAnimation("collided", monkeyCollided);
    /*monkey.addAnimation("collided", monkeyCollided);
    banana.x = 800;
    obstacle.x = 800;
    
    
    fill("black");
    textSize(100)
    text("GameOver", 80, 200);*/

    restart = createSprite(300, 200, 600, 400);
    restart.visible = false;

  }

  
monkey.collide(ground);
  drawSprites();
}

function spawnBanana() {
  if (frameCount % 150 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    bananaG.add(banana);
    banana.lifetime = 150;
  }
}

function spawnObstacle() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(600, 265     , 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.09;
    obstacle.lifetime = 150;
    obstacleG.add(obstacle);
      
   
  }
}