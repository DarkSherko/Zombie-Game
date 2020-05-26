var context, controller, zombie, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 190;
context.canvas.width = 100;

zombie = {

  height:500,
  jumping:true,
  width:100,
  x:250, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
    }
  }
};

loop = function() {
  if (controller.up && zombie.jumping == false) {
    zombie.y_velocity -= 20;
    zombie.jumping = true;
  }

  if (controller.left) {
    zombie.x_velocity -= 0.5;
  }

  if (controller.right) {
    zombie.x_velocity += 0.5;
  }

  zombie.y_velocity += 1.5;// gravity
  zombie.x += zombie.x_velocity;
  zombie.y += zombie.y_velocity;
  zombie.x_velocity *= 0.9;// friction
  zombie.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (zombie.y > 180 - 16 - 32) {
    zombie.jumping = false;
    zombie.y = 180 - 16 - 32;
    zombie.y_velocity = 0;
  }

  // if rectangle is going off the left of the screen
  if (zombie.x < -32) {
    zombie.x = 320;

  } else if (zombie.x > 320) {// if rectangle goes past right boundary
    zombie.x = -32;
  }


  context.fillStyle = "#202020";
  context.beginPath();
  context.rect(zombie.x, zombie.y, zombie.width, zombie.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);