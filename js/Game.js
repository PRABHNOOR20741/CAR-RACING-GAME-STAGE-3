class Game 
{
  constructor()
  {

  }

  getState()
  {
    //reading the gameState from the database
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data)
    {
       gameState = data.val();
    })

  }

  //updating the gameState in the database
  update(state)
  {
    database.ref('/').update(
      {
      gameState: state
    });
  }

  //making the start function for the game 
  async start()
  {
    //adding new players if the gameState is = 0 and making a new form
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //creating the car sprites and giving them images
    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  //making the play function for the game
  play()
  {
    //hiding the form 
    form.hide();

    //getting the information from the allPlayers array
    Player.getPlayerInfo();
   // console.log(allPlayers);
    
    //starting the game when the allPlayers array is completed or not undefined
    if(allPlayers !== undefined)
    {
      background("#c68767");
      //giving the track image
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers)
      {
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        //giving the current car red color
        if (index === player.index)
        {
          stroke(10);
          fill("YELLOW");
          ellipse(x,y,80,80);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    //adding the distance when the up arrow key is pressed
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    //making the player win if it reaches the end and updating the gameState to 2
    if(player.distance>3700)
    {
      gameState = 2;
    }
    drawSprites();
  }

  //ending the game
  end()
  {
    console.log("GAME ENDED");
    game.update(2);

  }
}
