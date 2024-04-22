// GLOBAL VARIABLES //////////////////////////////////////////////////////////
let player;
let enemy1;
let gravity = 0.5
let hop = -7;
let jump_count = 0;
let max_jumps = 2;
let movement_speed = 2;
let finish_point;

// arrays of objects for our player to interact with
let platforms = [];
let finish_points = [];

// sprite sheets
let sprite_sheet_idle;
let sprite_sheet_run;
let sprite_sheet_enemy;


//////////////////////////////////////////////////////////////////////////////

// FUNCTIONS /////////////////////////////////////////////////////////////////
// Function that creates a platform for the player to stand on
function create_platform(x, y, w, h, col) {
  var new_platform = createSprite(x, y, w, h, "static");
  new_platform.shapeColor = col;
  new_platform.immovable = true;
  platforms.push(new_platform);
}

// Function that creates a finish point for our game
function create_finish_point(x, y, w, h, col) {
  var new_finish_point = createSprite(x, y, w, h, "static");
  new_finish_point.shapeColor = col;
  new_finish_point.immovable = true;
  finish_points.push(new_finish_point);
}

// Function for when player is touching a platform
function on_platform(platform) {
    if (player.position.y < platform.position.y) {
      // player is on top of the platform
      jump_count = 0;
    }
}

// Function for when player is touching a finish point
function on_finish_point() {
  alert("You Win!!! 🥳 \n" + "You beat it in " + (frameCount-1) + " frames");
  noLoop();
}

function on_powerup() {
  movement_speed = 4
}

function jump(sprite) {
  sprite.velocity.y = hop;
}

function moveRight(start, end) {
  if (frameCount > start && frameCount < end) {
      player.velocity.x = movement_speed
      player.changeAnimation("run")
      player.mirrorX(1)
  }
}

function moveLeft(start, end) {
  if (frameCount >= start && frameCount <= end) {
      player.velocity.x = -movement_speed
      player.changeAnimation("run")
      player.mirrorX(-1)
  }
}

function moveJump(start) {
   if (frameCount == start && jump_count < max_jumps) {
      jump(player)
      jump_count++
  }
}

function determineScore(x) {
  let score = 0;
  if (x > 25) {
    score = 1;
  }
  if (x > 50) {
    score = 2
  }
  if (x > 75) {
    score = 3
  }
  if (x > 100) {
    score = 4
  }
  if (x > 150) {
    score = 5
  }
  if (x > 200) {
    score = 6
  }
  if (x > 250) {
    score = 7
  }
  if (x > 300) {
    score = 8
  }
  if (x > 350) {
    score = 9
  }
  if (x > 400) {
    score = 10
  }
  if (x > 450) {
    score = 11
  }
  if (x > 500) {
    score = 12
  }
  if (x > 600) {
    score = 13
  }
  if (x > 700) {
    score = 14
  }
  if (x > 800) {
    score = 15
  }
  if (x > 1000) {
    score = 16
  }
  if (x > 1200) {
    score = 17
  }
  if (x > 1400) {
    score = 18
  }
  return score;
}


////////////////////////////////////////////////////////////////////////////


function preload() {
  // loading in the sprite sheets
  // make sure to specify width and height of each frame and number of frames
  sprite_sheet_idle = loadSpriteSheet("https://cdn.glitch.global/30d045a8-5a18-4f39-abfa-c9f9da92e34e/cat02_idle_strip8.png?v=1698881920533", 40, 33, 8)
  sprite_sheet_run = loadSpriteSheet("https://cdn.glitch.global/30d045a8-5a18-4f39-abfa-c9f9da92e34e/cat02_run_strip4.png?v=1698884040969", 40, 33, 4)
  sprite_sheet_powerup = loadSpriteSheet("https://cdn.glitch.global/450cdd49-7e03-4b76-af3d-61a97b4dd5f2/monster-energy-drink-poster.png?v=1712172341697", 480, 480, 1) 
  sprite_sheet_end = loadSpriteSheet("https://cdn.glitch.global/450cdd49-7e03-4b76-af3d-61a97b4dd5f2/10246836_1528088_temptaions_pouch_75g_seafood_3d_f_1668514406721.png?v=1712173965384", 430, 670, 1)
  
  // Create a sprite object and attach the animation to it
  player = createSprite( 10, 180, 40, 33);
  player.setCollider("rectangle", 0, 8, 16, 16);
  player.addAnimation("idle", sprite_sheet_idle);
  player.addAnimation("run", sprite_sheet_run);
  
  powerup = createSprite(-20, 25, 10, 10);
  powerup.addAnimation("powerup", sprite_sheet_powerup)
  powerup.scale = 0.05
  
  finish_point = createSprite(1500, 180, 10, 10, "static");
  finish_point.addAnimation("finish_point", sprite_sheet_end);
  finish_point.scale = 0.05
  
  powerup.debug = true
  player.debug = true
  
  // ADDING OBJECTS INTO OUR GAME ////////////////////////////////////////////
  create_platform(0, 200, 660, 5, "green")
  create_platform(100, 150, 30, 5, "red");
  create_platform(130, 100, 30, 5, "red");
  create_platform(100, 50, 30, 5, "red");
  create_platform(240, 177, 30, 40, "red");
  create_platform(315, 157, 30, 80, "red");
  create_platform(430, 150, 60, 5, "red");
  create_platform(550, 100, 60, 5, "red");
  create_platform(670, 200, 60, 5, "red");
  create_platform(790, 150, 60, 5, "red");
  create_platform(960, 150, 60, 5, "red");
  create_platform(1300, 200, 400, 5, "green");
  /////////////////////////////////////////////////////////////////////////////
}

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background("lightblue");
    text(frameCount, 700, 60)
  text("Score: " + determineScore(player.position.x) + "/15", 800, 60)
  // CAMERA STUFF //////////////////////////////
  let x_translation = width / 2 - player.position.x * 3
  if (x_translation > 100) {
    x_translation = 100;
  }
  translate(x_translation, 0)
  scale(3);
  ///////////////////////////////////////////////
  
  // Apply gravity to our player
  if (player.velocity.y < 7) {
    player.velocity.y += gravity;
  }
  
  // Loop through our platforms and apply collision 
  for (var i = 0; i < platforms.length; i++) {
    if (player.collide(platforms[i])) {
        on_platform(platforms[i]);
      }
  }
  
  for (var j = 0; j < finish_points.length; j++) {
    if (player.collide(finish_points[j])) {
        on_finish_point()
    }
  }
  
 if (player.collide(finish_point)) {
      on_finish_point()
  }
  
  if (player.collide(powerup)) {
    on_powerup()
    powerup.position.x = -1000
  }
  
  // Draw our sprites
  drawSprites();
  
  
  // HANDLING USER INPUTS //////////////////////////////////////////
  if (keyIsDown(RIGHT_ARROW)) {
    player.velocity.x = movement_speed;
    player.changeAnimation("run")
    player.mirrorX(1)
    
  }
  else if (keyIsDown(LEFT_ARROW)) {
    player.velocity.x = -movement_speed;
    player.changeAnimation("run")
    player.mirrorX(-1)
  }
  else {
    player.velocity.x = 0;
    player.changeAnimation("idle");
  }
  
  if (player.position.y > 250) {
    alert("Sorry, you lost 😥")
    noLoop()
  }
  //////////////////////////////////////////////////////////////////
  
  // MOVEMENT CODE GOES HERE //
  
  
// moveRight(0,35)
// moveJump(25)
// moveLeft(35,73)
// moveJump(36)
// moveJump(56)
// moveRight(73,500)
// moveJump(105)
// moveJump(135)
// moveJump(145) 
// moveJump(199)
// moveJump(210)
// moveJump(250)  
// moveJump(285)
// moveJump(325)
  
  
  
moveRight(0,35)
moveJump(25)
moveLeft(35,73)
moveJump(36)
moveJump(56)
moveRight(73,500)
moveJump(105)
moveJump(135)
moveJump(145) 
moveJump(195)
moveJump(210)
moveJump(255)
moveJump(275)
moveJump(305)
moveJump(315)

  
  // MOVEMENT CODE GOES HERE //
  
}


// HANDLING USER KEY PRESSES ///////////////////////////////////////
function keyPressed() {
  // checking if user pressed spacebar
  if (keyCode === 32) { 
      if (jump_count < max_jumps) {
        jump(player)
        jump_count++
      }
  }
}
////////////////////////////////////////////////////////////////////
