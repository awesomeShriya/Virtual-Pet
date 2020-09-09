//Create variables here
var dog, happyDog;
var database;
var foodS, foodstock;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,250,40,40);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  fill("white");
  textSize(15);
  text("Food Remaining: "+foodS,170,120);
  //add styles here
  textSize(20);
  text("Note: Press the UP_ARROW Key to Feed Drago Milk!", 10,20);
}

function readStock(data){
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


