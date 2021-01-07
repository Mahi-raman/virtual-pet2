var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime, lastFed;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);
  dog=createSprite(200,350,100,100);
  dog.addImage(dogImg);
  dog.scale=0.30;

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(35);    
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(dogImg1);
}

  drawSprites();
  fill(235,235,240);
  stroke("black");
  text("Food remaining :"+ foodS,180,200);
  text("NOTE: Press UP_ARROW key to feed milk to the puppy!",200,140,320,30);
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

