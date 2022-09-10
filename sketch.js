var Play = 1;
var End = 2;
var Start = 0;
var Score = 0
var gameState = Start;

var player



function preload(){
    startImg = loadImage("new background 2.png")
    playImg = loadImage("background.jpg")
    playerStand = loadAnimation("marcus3.png");
    playerMove = loadAnimation("marcus3.png","marcus4.png","marcus5.png","marcus6.png","marcus1.png","marcus2.png")
    plate1 = loadImage("plate1.png");
    plate2 = loadImage("plate2.png");
    plate3 = loadImage("plate3.png");
    plate4 = loadImage("plate4.png");
    plate5 = loadImage("plate5.png");
    stal = loadImage("fallRock1.png");
    restartImg = loadImage("restart.png");
    scrollImg = loadImage("letter.png")

}

function setup() {
    createCanvas(windowWidth,windowHeight);
    
    platesGroup = new Group();
 invisibleBlockGroup = new Group();
 letersGroup = new Group();

 startBG = createSprite(windowWidth/2,windowHeight/2);
 startBG.addImage(startImg);
 startBG.scale = 0.45;
 playBG = createSprite(windowWidth/2,windowHeight/2);
 playBG.addImage(playImg);
 playBG.visible = false;
 player = createSprite(500,100,20,20);
 player.addAnimation("standing", playerStand);
 player.addAnimation("walking", playerMove);
 player.changeAnimation("standing");
 player.setCollider("rectangle",0,0,player.width-25,player.height-20);
 player.visible = false;
 player.scale = 0.8;
 plate_1 = createSprite(500,400,200,20);
 plate_1.addImage(plate1);
 platesGroup.add(plate_1);
 plate_1.visible = false;
 Restart = createSprite(width/2,height/2);
 Restart.visible = false;
 Restart.addImage(restartImg);

 
 
//player.debug = true
}

function draw() {
 background(0);

 
 if( player.velocityY < -2){
    plate_1.remove()
 }
if(gameState === Start){
    if(keyDown("SPACE")){
        gameState = Play
    }
}
if(gameState === Play){
    startBG.visible = false
    playBG.visible = true
    player.visible = true
    plate_1.visible = true
    Restart.visible = false

if( player.isTouching(letersGroup)){
    letersGroup.destroyEach();
    Score = Score+1

}


playBG.velocityY = +3
if(playBG.y > height){
    playBG.y = height/2
}
if(player.isTouching(platesGroup)){
    player.velocityY = -0.5
}
    
    spawnPlate();
    spawnLetter();

    if(keyDown("A")){
        player.x -= 15;}
     if(keyDown("D")){
        player.x += 15;} 

    if(keyDown("W") && player.isTouching(platesGroup)){
     player.velocityY = -17;} 
     player.velocityY = player.velocityY+0.8 

if(player.y > height-50 || player.isTouching(invisibleBlockGroup)){
    gameState = End
}}
if(gameState === End){
playBG.velocityY = 0
platesGroup.setVelocityYEach(0)
invisibleBlockGroup.setVelocityYEach(0)
player.velocityY = 0
letersGroup.setVelocityYEach(0)
Restart.visible = true

platesGroup.setLifetimeEach(-1)
invisibleBlockGroup.setLifetimeEach(-1)
letersGroup.setLifetimeEach(-2)

if(mousePressedOver(Restart)){
    Reset();
}

//window.alert("You Died, Click to Restart")
}

drawSprites();
fill (0)
textSize(20)
text("Score :"+ Score, width-100,100)
}
function spawnLetter(){
    if(frameCount%300 ===0) {
        letter = createSprite(200,-50,20,20);
        letter.x = Math.round(random(300,width-150));
        letter.velocityY = +3
        letter.lifetime = 600
       letter.depth = player.depth
        player.depth += 1
        letersGroup.add(letter);
        letter.addImage("letter",scrollImg)
        letter.scale = 0.3
    }
}
function spawnPlate(){
    if(frameCount%80 ===0) {
      plate = createSprite(200,-50);
      invisibleBlock = createSprite(200, 5);
      //invisibleBlock.width = plate.width
      //invisibleBlock.height = 2
      //invisibleBlock.visible = false
     // invisibleBlock.debug = true
      plate.x = Math.round(random(300,width-150));
      invisibleBlock.x = plate.x;
      var randPlate = Math.round(random(1,5))
      switch(randPlate){
        case 1: plate.addImage("plate1",plate1)
        break
        case 2: plate.addImage("plate2",plate2)
        break
        case 3: plate.addImage("plate3",plate3)
        break
        case 4: plate.addImage("plate4",plate4)
        break
        case 5: plate.addImage("plate5",plate5)
        break
      }
      invisibleBlock.addImage("stal",stal);
      invisibleBlock.scale = 0.7
      plate.velocityY = +3
      invisibleBlock.velocityY = +3
      plate.lifetime = 600
      invisibleBlock.lifetime = 600
      plate.depth = player.depth
      invisibleBlock.depth = player.depth
      player.depth += 1
      platesGroup.add(plate);
      invisibleBlockGroup.add(invisibleBlock);
      plate.setCollider("rectangle",0,0,plate.width-40,plate.height-20)
      invisibleBlock.setCollider("rectangle",0,0,invisibleBlock.width-40,invisibleBlock.height-20)
      invisibleBlock.scale = 0.75
      ///////////////////////////////////////plate.debug = true
      ///invisibleBlock.debug = true
    }}

    function Reset(){
        gameState = Play
    invisibleBlockGroup.destroyEach();
    platesGroup.destroyEach();
    letersGroup.destroyEach();
    player.y = 100
    player.x = 500
    plate_1 = createSprite(500,400,200,20);
    plate_1.addImage(plate1);
    platesGroup.add(plate_1);
    Score = 0
    }