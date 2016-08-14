var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game-board', {
  preload: preload, create: create, update: update
});

// GLOBAL VARIABLES //
var ball;
var ash;
var pikachus;
var newPikachu;
var pikachuInfo;
var scoreText;
var score = 0;

// GAME FUNCTIONS AND PHYSICS //
function preload(){
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('ball', 'images/pokeball.png')
  game.load.image('ash', 'images/ash.png');
  game.load.image('pikachu', 'images/pikachu.png')
};

function create(){
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.anchor.set(0.5);
  ball.body.bounce.set(1);
  ball.body.velocity.set(150, -150);

  ash = game.add.sprite(game.world.width*0.5, game.world.height-0, 'ash');
  ash.anchor.set(0.5, 1);
  game.physics.enable(ash, Phaser.Physics.ARCADE);
  ash.body.immovable = true;

  // TURNING ON THE ABITLITY TO LOSE //
  game.physics.arcade.checkCollision.down = false;
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(function(){
    alert("Game Over!");
    location.reload();
  }, this);

  // SCORE BOARD //
  scoreText = game.add.text(5, 5, 'Pikachus Caught: 0', {font: '18px Arial', fill: '#0095DD'});

  // PIKACHU GAME INFO AND PHYSICS //
  initPikachu();
};

function update(){
  game.physics.arcade.collide(ball, ash);
  // COLLISION FUNCTION FOR PIKACHU //
  game.physics.arcade.collide(ball, pikachus, ballHitPikachu);
  // CONTROLLING ASH //
  ash.x = game.input.x || game.world.width*0.5;
};

function initPikachu(){
  pikachuInfo = {
    width: 40,
    height: 25,
    count: {
      row: 7,
      col: 3
    },
    offset: {
      top: 50,
      left: 50
    },
    padding: 10
  }
  pikachus = game.add.group();
  for(c = 0; c < pikachuInfo.count.col; c++){
    for(r = 0; r < pikachuInfo.count.row; r++){
      // create new pokemon and add it to the group //
      var pikachuX = (r*(pikachuInfo.width+pikachuInfo.padding))+pikachuInfo.offset.left;
      var pikachuY = (c*(pikachuInfo.height+pikachuInfo.padding))+pikachuInfo.offset.top;
      newPikachu = game.add.sprite(pikachuX, pikachuY, 'pikachu');
      game.physics.enable(newPikachu, Phaser.Physics.ARCADE);
      newPikachu.body.immovable = true;
      newPikachu.anchor.set(0.5);
      pikachus.add(newPikachu);
    }
  }
};

function ballHitPikachu(ball, pikachu){
  pikachu.kill();
  score += 1;
  scoreText.setText('Pikachus Caught: '+score);
}
