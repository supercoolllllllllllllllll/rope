const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;
var bg_img, button, button2, button3, food, rabbit, rabbit_img, blower, mute_btn
var eat, sad, blink;
var airSound, eatSound, ropeCutSound, sadSound, sound1;

function preload()
{
  bg_img = loadImage("assets/background.png");
  food = loadImage("assets/melon.png");
  rabbit_img = loadImage("assets/rabbit.png");
  blink = loadAnimation("assets/blink/blink_1.png", "assets/blink/blink_2.png", "assets/blink/blink_3.png");
  eat = loadAnimation("assets/eat/eat_0.png", "assets/eat/eat_1.png", "assets/eat/eat_2.png", "assets/eat/eat_3.png", "assets/eat/eat_4.png");
  sad = loadAnimation("assets/sad/sad_1.png", "assets/sad/sad_2.png", "assets/sad/sad_3.png");
 
  airSound = loadSound("assets/sound/air.wav");
  eatSound = loadSound("assets/sound/eating_sound.mp3");
  ropeCutSound = loadSound("assets/sound/rope_cut.mp3");
  sadSound = loadSound("assets/sound/sad.wav");
  sound1 = loadSound("assets/sound/sound1.mp3");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  sound1.play();
  sound1.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg("assets/cut_button.png");
  button.position(50,50);
  button.size(50,50);
  button.mouseClicked(drop1);

  button2 = createImg("assets/cut_button.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("assets/cut_button.png");
  button3.position(500,100);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  blower = createImg("assets/balloon.png");
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  mute_btn = createImg("assets/mute.png");
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);


  rope = new Rope(8,{x:70,y:70});
  rope2 = new Rope(5,{x:370,y:60});
  rope3 = new Rope(4,{x:550,y:130});
  
  ground = new Ground(200,windowHeight,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit = createSprite(200,windowHeight-100,100,100);
  rabbit.scale = 0.2;

  rabbit.addAnimation("blinking", blink);
  rabbit.addAnimation("eating", eat);
  rabbit.addAnimation("crying", sad);
  rabbit.changeAnimation("blinking");

  fruit = Bodies.circle(200,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link (rope,fruit);
  fruit_con2 = new Link (rope2,fruit);
  fruit_con3 = new Link (rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{

  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();
  

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }


  if (collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eating",eat);
    eatSound.play();
  }

  if (fruit!=null && fruit.position.y>=950){
    rabbit.changeAnimation("crying", sad);
    sound1.stop();
    sadSound.play();
    fruit=null;
  }

  drawSprites();
}

function drop1(){
  ropeCutSound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2(){
  ropeCutSound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}
function drop3(){
  ropeCutSound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}

function keyPressed(){
  if(keyCode==LEFT_ARROW){
    airblow();
  } 
} 


function collide(body,sprite){
  if (body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit)
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play();
}



function mute(){
if(sound1.isPlaying()){
  sound1.stop();
}
else{
  sound1.play();
}
}
