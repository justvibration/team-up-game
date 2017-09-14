var game = new Phaser.Game(
  '1500', // width
  '770', // height
  Phaser.AUTO, // rendering context (WebGL or Convas)
  'game', // DOM id
  {
    preload: preload,
    create: create,
    update: update
  }
);

// load assets
function preload() {
  game.load.image('bg', 'assets/bg.jpg');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('backlogItem', 'assets/backlogitem.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('po', 'assets/po.gif', 48, 48);
}

var player;
var po;
var platforms;
var cursors;

var backlogItems;
var score = 0;
var scoreText;

function create() {

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.sprite(0, 0, 'bg');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  var ground = platforms.create(0, game.world.height - 32, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(4, 1);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  //  Now let's create two ledges
  var ledge = platforms.create(600, 650, 'ground');
  ledge.body.immovable = true;
  ledge.scale.setTo(1, 0.5);

  ledge = platforms.create(150, 550, 'ground');
  ledge.scale.setTo(1, 0.5);
  ledge.body.immovable = true;

  // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'dude');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 500;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // The PO and its settings
  po = game.add.sprite(1400, game.world.height - 150, 'po');

  //  Finally some backlogs to collect
  backlogItems = game.add.group();

  //  We will enable physics for any backlogItem that is created in this group
  backlogItems.enableBody = true;

  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 3; i++) {
    //  Create a backlogItem inside of the 'backlogItems' group
    var backlogItem = backlogItems.create(Math.floor((Math.random() * 1450) + 50), Math.floor((Math.random() * 700) + 0), 'backlogItem');

    //  Let gravity do its thing
    backlogItem.body.gravity.y = 300;

    //  This just gives each backlogItem a slightly random bounce value
    backlogItem.body.bounce.y = 0.1 + Math.random() * 0.01;
  }

  //  The score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

}

var speed = 10;
var maxSpeed = 200;
var vx = 0;
var vy = 0;

function update() {

  //  Collide the player and the backlogItems with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(backlogItems, platforms);

  //  Checks to see if the player overlaps with any of the backlogItems, if he does call the collectBacklogItem function
  game.physics.arcade.overlap(player, backlogItems, collectBacklogItem, null, this);

  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    //  Move to the left
    if (vx > -maxSpeed) vx -= speed;
    // player.body.velocity.x = -150;

    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    //  Move to the right
    if (vx < maxSpeed) vx += speed;
    // player.body.velocity.x = 150;

    player.animations.play('right');
  }
  else {
    //  Stand still
    player.animations.stop();

    player.frame = 4;

    if (vx > 0) {
      if (vx <= speed) {
        vx = 0;
      } else {
        vx -= speed;
      }
    } else if (vx < 0) {
      if (vx >= speed) {
        vx = 0;
      } else {
        vx += speed;
      }
    }

    if (vy > 0) {
      vy -= speed;
    } else {
      vy += speed;
    }

  }

  // move player
  player.body.velocity.x += vx;
  player.body.velocity.y += vy;

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }

}

function collectBacklogItem(player, backlogItem) {

  if (player.children < 1) {
    backlogItem.kill();
    var item = game.add.sprite(0, -10, "backlogItem");
    player.addChild(item);
  }


  //  Add and update the score
  // score += 10;
  // scoreText.text = 'Score: ' + score;

}
