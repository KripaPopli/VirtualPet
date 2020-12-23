var dog, happyDog, dogImage;
var database, foodS, foodStock;
var Food;

function preload()
{
  dogImage = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');

}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,250,50,100);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  text("foodRemaining:"+foodS, 100, 400);
  textSize(3);
  fill("red");

  drawSprites();
}

function readStock(data){
 foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref('/').update({

    Food:x
  })
}

