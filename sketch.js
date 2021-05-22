var Knife, Knife_img, b1, b1_img, b2, b2_img, b3, b3_img, b4, b4_img;

var game_state="play";

var score=0;

var fruitGroup , monsterGroup;

var endSound, KnifeSound;

function preload(){
  
  Knife=loadImage("sword.png");
  b1=loadImage("fruit1.png");
  b2=loadImage("fruit2.png");
  b3=loadImage("fruit3.png");
  b4=loadImage("fruit4.png");
  m1=loadImage("alien1.png");
  m2=loadImage("alien2.png");
  endSound=loadSound("gameover.mp3");
  KnifeSound=loadSound("knife.mp3");
}

function setup(){
  createCanvas(600,600);
  Knife_img=createSprite(550,300);
  Knife_img.addImage(Knife);
  fruitGroup = new Group();
  monsterGroup = new Group();
  // Knife_img.debug=true;
  Knife_img.setCollider("circle", 20, -30, 40);
}

function draw(){
  background("green");
  if (game_state=="play"){
  Knife_img.x=mouseX;
  Knife_img.y=mouseY;
  Knife_img.visible=true;
  
  fruit();
  monster();
  
  if (fruitGroup.isTouching(Knife_img)) {

    score=score+1;
    fruitGroup.destroyEach();
    KnifeSound.play();
    
  }
  
  if (monsterGroup.isTouching(Knife_img)) {

    score=score+1;
    fruitGroup.destroyEach();
    fruitGroup.setLifetimeEach(-1);
    game_state="end";
    
  }
  }
  
  if (game_state=="end"){

    endSound.play();
    endSound.duration=2;
    Knife_img.visible=false;
    fill("red");
    textSize(50);
    text("GAME OVER !", 150, 300);
    // Knife_img.x
    if (keyDown("space")){
  
      game_state="play";
      score=0;
      Knife_img.visible=true;
        
    }
  }
  
  drawSprites();
  fill("white")
  textSize(20);
  text("The Score is:-  "+score, 400, 20);
}

function fruit(){

  if (frameCount % 10 == 0){
    var fruitpos=Math.round(random(1,2));
    var random_fruit=Math.round(random(1,4));
    var fruit=createSprite(Math.round(random(50,550)), Math.round(random(20,350)))
    
    if (fruitpos==1){
      fruit.x=0;
      fruit.velocityX=4;
    }
    
    if (fruitpos==2){
      fruit.x=400;
      fruit.velocityX=-4;
    }
    
    switch(random_fruit){
              
      case 1:
        fruit.addImage(b1);
      break;  
      
      case 2:
        fruit.addImage(b2);
      break;
      
      case 3:
        fruit.addImage(b3);
      break;
      
      case 4:
        fruit.addImage(b4);
      break;
           
    }
    // fruit.debug=true;
    fruit.scale=0.2;
    fruit.velocityY=2;
    fruitGroup.add(fruit);
    if (score % 5 == 0){
      fruit.velocityY=6;
    }
  }

}

function monster(){
if (frameCount % 35 == 0){

    var random_Monster=Math.round(random(1,2));
    var monster=createSprite(Math.round(random(50,550)), Math.round(random(20,350)))
    
    switch(random_Monster){
              
      case 1:
        monster.addImage(m1);
      break;  
      
      case 2:
        monster.addImage(m2);
      break;
  
    }
    // fruit.debug=true;
    // monster.scale=0.2;
    monster.setCollider("circle", 0, 0, 20);
    monster.velocityY=2;
    monsterGroup.add(monster);
    
  }

}
