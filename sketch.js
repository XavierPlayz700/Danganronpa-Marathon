// Yay variables uwu
var gameState = "play";
var score = 0;
var highScore = 0;

var restart, reImg;

var kokichi, kokiRun, kokiTired;
var maki, kirumi, shuichi, chiaki, nagito, tenko, miu, hajime;
var road, roadImg;
var edges, playSong, overSong;

var personGroup;

function preload(){
  
  // Kokichi's Animated Sprites
  kokiRun = loadAnimation("Kokichi.png", "Kokichi2.png");
  kokiTired = loadAnimation("KokiTired.png", "KokiTired2.png");
  
  // The rest of the animated sprite cast
  maki = loadAnimation("Maki.png", "Maki2.png");
  kirumi = loadAnimation("Kirumi.png", "Kirumi2.png");
  shuichi = loadAnimation("Shuichi.png", "Shuichi2.png");
  chiaki = loadAnimation("Chiaki.png", "Chiaki2.png");
  nagito = loadAnimation("Nagito.png", "Nagito2.png");
  hajime = loadAnimation("Hajime.png", "Hajime2.png");
  tenko = loadAnimation("Tenko.png", "Tenko2.png");
  miu = loadAnimation("Miu.png", "Miu2.png");

  
  // Images
  roadImg = loadImage("t.png");
  roadImg.resize(1600, 900);
  
  reImg = loadImage("Restart.png");
  
  // Songs
  playSong = loadSound("song.mp3");
  overSong = loadSound("song2.mp3");
  
}

function setup(){
  createCanvas(1600, 900);
  
  edges = createEdgeSprites();
  
  road = createSprite(width / 2, height / 2);
  road.addImage(roadImg);
  road.x = road.width / 2;
  
  kokichi = createSprite(50, 50);
  kokichi.addAnimation("run", kokiRun);
  kokichi.addAnimation("tired", kokiTired);
  kokichi.scale = 0.6;
  kokichi.depth = road.depth + 1;
  
  restart = createSprite(width / 2, height * 0.75);
  restart.addImage(reImg);
  restart.scale = 0.4;
  restart.visible = false;
  
  playSong.loop();
  playSong.setVolume(0.5);
  
  personGroup = new Group();
}

function draw() {
  background(0);
  
  // Yay Playing Code
if (gameState === "play"){
  
    road.velocityX = -3 - (score / 250);
  
   // Kokichi do be liking the inverse controls :O
    kokichi.y = height - mouseY;
    kokichi.collide(edges);
 
    overtake();
  
    if (road.x < 0){
      road.x = road.width / 2;
    }
  
    if (kokichi.isTouching(personGroup)){
      road.velocityX = 0;
      
      personGroup.destroyEach();
      
      kokichi.changeAnimation("tired", kokiTired);
      kokichi.pause();
      
      playSong.stop();
      overSong.loop();
      
      restart.visible = true;
      
      gameState = "over";
    }
  
    score++;
  
    if (highScore <= score){
      highScore = score;
    }
  
}
  
  // Some Animation to not bore the player much
    if (gameState === "over"){
      if (frameCount % 30 === 0){
        kokichi.setFrame(0);
      } 
      
      if (frameCount % 100 === 0){
        kokichi.setFrame(1);
      }
    }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score : " + score, width / 2 - 50, 50);
  text("High Score : " + highScore, width / 2 - 50, 75);
  
  
  // Ayyy, Game Over Stuff
  if (gameState === "over"){
    
      textSize(30)
      text("Game Over", width / 2 - 70, height / 3);
    
      if (mouseDown(LEFT) && mouseIsOver(restart)){
        reset();
      }
    
  }
}


// Spawning my obstacles uwu
function overtake(){
  
    if (frameCount % 30 == 0){
    var person = createSprite(width + 50, height / 2);
    person.depth = road.depth + 1;

    var r = Math.round(random(0, 7));

    switch (r){
        
      case 0 :
        person.addAnimation("Hajime", hajime);
        break;

      case 1 :
        person.addAnimation("Maki", maki);
        break;
        
      case 2 :  
        person.addAnimation("Kirumi", kirumi);
        break;
        
      case 3 :
        person.addAnimation("Shuichi", shuichi);
        break;
        
      case 4 :
        person.addAnimation("Chiaki", chiaki);
        break;
        
      case 5 :
        person.addAnimation("Tenko", tenko);
        break;
        
      case 6 :
        person.addAnimation("Miu", miu);
        break;
        
      default :
        person.addAnimation("Nagito", nagito);
        break;

    }
    
    person.scale = 0.6;
    person.y = Math.round(random(0 + (person.height * person.scale / 2), height - (person.height * person.scale / 2)));
      
    person.velocityX = road.velocityX;
    person.lifetime = width / person.velocityX;
    
    personGroup.add(person);
  }
  
}

// Reset the game :)
function reset(){
  
  score = 0;
  
  kokichi.changeAnimation("run", kokiRun);
  
  overSong.stop();
  playSong.loop();
  
  gameState = "play";
  
  restart.visible = false;
  
}
