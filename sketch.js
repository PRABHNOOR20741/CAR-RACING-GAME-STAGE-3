var canvas, backgroundImage;

//making the variables for the game
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

//making the cars and images for the car
var cars, car1, car2, car3, car4;
var track,car1_img,car2_img,car3_img,car4_img;

//loading the images for the game
function preload()
{
 track=loadImage("images/track.jpg");
 car1_img = loadImage("images/car1.png");
 car2_img = loadImage("images/car2.png");
 car3_img = loadImage("images/car3.png");
 car4_img = loadImage("images/car4.png"); 
 backgroundImage_img = loadImage("images/background_for_form.gif");
}


function setup()
{
  //creating the canvas and refering to the database
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  //adding the game from the GAME class
  game = new Game();
  game.getState();
  game.start();
}


function draw()
{
  //updating the gameState if the noumber if players is 4
  if(playerCount === 4)
  {
    game.update(1);
  }

  //clearing the screen and calling the play function
  if(gameState === 1)
  {
    clear();
    game.play();
  }

  //calling the game's end function if the gameState is equal to 2
  if(gameState === 2)
  {
    game.end();
  }
}
