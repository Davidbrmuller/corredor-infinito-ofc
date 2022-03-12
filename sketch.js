var torre, imagemTorre
var porta, imagemPorta
var GrupoPorta, GrupoGrade
var Grade, imagemGrade
var fantasma, fantasmaimg
var bloco, grupodebloco
var som
var gamestate="play";
function preload(){
 imagemTorre = loadImage("tower.png");
imagemPorta = loadImage("door.png");
imagemGrade= loadImage("climber.png");
fantasmaimg=loadImage("ghost-standing.png");
som=loadSound("spooky.wav");
}
function setup() {
  createCanvas(600, 600);
  som.loop(); 
 torre= createSprite(300,300);
  torre.addImage("torre",imagemTorre)
  torre.velocityY=1;

grupodebloco=new Group();
  GrupoPorta = new Group();
  GrupoGrade = new Group();
  fantasma=createSprite(200,200,50,50);
  fantasma.addImage(fantasmaimg);
  fantasma.scale=0.5
}

function draw() {
  background(200);
  if(gamestate==="play"){

  if(torre.y>400){
    torre.y=300;
  }
  if (keyDown ("right_arrow")){
    fantasma.x=fantasma.x+3;
  }
  if (keyDown ("left_arrow")){
    fantasma.x=fantasma.x-3;
  }
  if (keyDown("space")){
    fantasma.velocityY=-5;
  }
  if (fantasma.isTouching(GrupoGrade)){
    fantasma.velocityY=0;
  }
  fantasma.velocityY=fantasma.velocityY+0.8;
  if (grupodebloco.isTouching(fantasma)||fantasma.y>600){
    fantasma.destroy();
    gamestate="end";
  }
  
  spawnDoor();
  drawSprites();

}
if (gamestate==="end"){
stroke("purple");
fill("purple");
textSize(30)
text("fim de jogo",230,250);
}
}
function spawnDoor(){
  if (frameCount%240==0){
    porta=createSprite(200,-50);
    porta.addImage(imagemPorta);
    porta.x=Math.round(random(120,400))
    porta.velocityY=1;
    porta.lifetime=800;
    GrupoPorta.add(porta);

    Grade=createSprite(200,10);
    Grade.addImage(imagemGrade);
    Grade.x=porta.x;
    Grade.velocityY=1;
    Grade.lifetime=800;
    GrupoGrade.add(Grade);
    fantasma.depth=porta.depth;
    fantasma.depth+=1;
    bloco=createSprite(200,15)
    bloco.width=Grade.width;
    bloco.height=2;
    bloco.x=porta.x;
    bloco.velocityY=1;
    bloco.visible=false;
    grupodebloco.add(bloco);
  }
}