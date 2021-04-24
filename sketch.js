var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var player_img;
var player1score =0;
var player2score =0;
var distance = 0;

var form, player, game;

var apple_Img, banana_img, basket_img, melon_img, orange_img, pineapple_img;
var apple, banana, basket, melon, orange, pineapple;

function preload(){
  back_img = loadImage("jungle.jpg");
  apple_img = loadImage("apple2.png");
  banana_img = loadImage("banana2.png");
  basket_img = loadImage("basket2.png");
  melon_img = loadImage("melon2.png");
  orange_img = loadImage("orange2.png");
  pineapple_img = loadImage("pineapple2.png");
  
  
}

function setup(){
  canvas = createCanvas(displayWidth-30 , displayHeight-130);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

  fruitGroup = new Group();
}
 
   function draw() {
    background(back_img);


  
    if (playerCount === 2 ) {
      game.update(1);
    }
  
    if (gameState === 1) {
      clear();
      game.play();
    }
    if (gameState === 2) {
      game.end();
    }
  }
   
