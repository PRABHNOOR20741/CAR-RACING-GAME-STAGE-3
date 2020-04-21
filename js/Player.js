class Player
 {
  constructor()
  {
    //giving the values of index,distance and the player's name
    this.index = null;
    this.distance = 0;
    this.name = null;
  }

  //reading the total player count from the database
  getCount()
  {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>
    {
      playerCount = data.val();
    })
  }

  //updating the player count 
  updateCount(count
    ){
    database.ref('/').update(
      {
      playerCount: count
    });
  }

  //updating the players name in the 'PLAYERS'folder in the database
  update()
  {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set(
      {
      name:this.name,
      distance:this.distance
    });
  }

  //making a static function for the player class not the player objects
  static getPlayerInfo()
  {
    //getting and storing the player's information in allPlayers folder
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>
    {
      allPlayers = data.val();
    })
  }
}
