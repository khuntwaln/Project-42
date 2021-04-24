class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      player1 = createSprite(200,500);
      player1.addImage("player1",basket_img);
      
      player2 = createSprite(800,500);
      player2.addImage("player2",basket_img);
      
      players=[player1,player2];

    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
         image(back_img, 0, 0, 1500, 820);
         var x = 100;
         var y = 200;
         var index = 0;
  
        for(var plr in allPlayers){
          index = index + 1 ;
          x = 500-allPlayers[plr].distance;
          y = 500;
          players[index - 1].x = x;
          players[index - 1].y = y;
          
          textAlign(CENTER);
          textSize(30);
          fill("black")
          text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
          if (index === player.index){               
            fill("red");
            text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
          }
          textSize(20);
          fill("white")
          text(player.name + ":" + player.score, 70, 50);
              //console.log(allPlayers[plr].score);
          if(player.score >= 10){
            this.end();
          }
         
        }
        if(frameCount % 20 == 0){
          fruits = createSprite(random(100,1000), 0, 100, 100)
          fruits.velocityY = 6;
          var rand = Math.round(random(1,5))
          switch(rand){
            case 1: fruits.addImage("Apple", apple_img);
            break;
            case 2: fruits.addImage("Banana", banana_img);
            break;
            case 3: fruits.addImage("Melon", melon_img);
            break;
            case 4: fruits.addImage("Orange", orange_img);
            break;
            case 5: fruits.addImage("PineApple", pineapple_img);
            break;
          }
          fruitGroup.add(fruits);
        }
  
      }
              
      if(player.distance < 2150){
              if(keyIsDown(LEFT_ARROW) && player.index !== null){
              player.distance +=10;
              player.update();
              }
              if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                player.distance -=10;
                player.update();
              }
              
      }
      
      if(player.index !== null){
        for(var i=0; i < fruitGroup.length; i++){
          if(fruitGroup.get(i).isTouching(players)){
            fruitGroup.get(i).destroy();
            player.score = player.score + 1;
            player.update();
          }
        }
      }

    drawSprites();
  }
  end(){
    game.update(2);
    clear();
    textSize(60);
    fill("blue");
    text("Game Over", 650,300);
  }
 
 }
 
