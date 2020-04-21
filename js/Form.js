class Form
 {

  constructor()
   {

    //creatindg the form 
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('RESET');
  }
  hide()
  {

    //making the hidefunction to hide the button,input and title when this is called
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display()
  {
    //loading the background image when the form is being filled
    background(backgroundImage_img);
    //making the title of the game and giving it's position
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    //giving position to input and button 
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 200);
    this.button.position(displayWidth/2 + 30, displayHeight/2 - 140);
    this.reset.position(displayWidth-100,30);

    this.button.mousePressed(()=>
    {

      //hiding the input and button
      this.input.hide();
      this.button.hide();

      //updating the database including player's name and total player count
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);

      //giving greetings to the player
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    //resetting the gameState and playerCount 
    this.reset.mousePressed(()=>
    {
      game.update(0);
      player.updateCount(0);
    })

  }
}
