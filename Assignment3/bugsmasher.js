// Marta Polishchuk
// 301432299
// COMP125: Client Side Web Development Sec: 402
// Assignment 3

// used this website as a guide (as per assignment instructions): http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

/*----------- Create a Canvas -----------*/
var canvas = document.createElement("canvas"); // create canvas element 
var ctx = canvas.getContext("2d"); // reference to its context - to issue drawing commands
canvas.width = 500;
canvas.height = 300;

var canvasDiv = document.querySelector(".canvas");
canvasDiv.appendChild(canvas); // append canvas div with class "canvas"

/*----------- Add Images  --------------*/

// background
var bgReady = false; // this variable lets us know when its safe to draw the image 
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "bg.png" // image source: https://www.reddit.com/r/PixelArt/comments/gyx4mu/flower_field/

// bug
var bugReady = false; 
var bugImage = new Image();
bugImage.onload = function () {
  bugReady = true;
};
bugImage.src = "ladybug.png" // source: I drew it :)

/*------- Declare Game Objects -----------*/
var bug = {
  speed: 300, // need this variable for reset speed button
  x: 0, // coordinates
  y: 0,
}

var bugsSmashed = 0; // variable to store the value of the counter
var speed = 3000; // speed for timed intervals
var bugSpeed; // stores interval (needed for reset speed button at bottom of this script)

/*---------- Collect Player Input ----------*/
// clicking on the bug; events = mouse up and mouse down or just 'click' which combines the two
canvas.addEventListener("click", function (e) {
  // have to check if the click was inside the bug's area (this snippet of code I got off the internet while researching, had trouble figuring it out myself)
  if (e.offsetX >= bug.x && e.offsetX <= bug.x + 60 &&
      e.offsetY >= bug.y && e.offsetY <= bug.y + 60) {

    //if bug gets clicked then increment and reset its position
    ++bugsSmashed;
    reset();

    // if bug gets clicked then also increase speed 
    clearInterval(bugSpeed); // need to clear before changing or else reset speed button won't work
    speed = 3000/(bugsSmashed +1) // since bugsSmashed gets incremented every click, dividing by it makes sense becuase the number will increase every click. (added one to make the speed increase more obvious)
    bugSpeed = setInterval(moveBug, speed) 
    
  }
});

/*----------- Setting Up a New Game ---------*/
// Reset the game when a bug is caught
var reset = function () {
  bug.x = 32 + (Math.random() * (canvas.width - 64));
  bug.y = 32 + (Math.random() * (canvas.height - 64));
}

/* --------- Updating Game Objects ------------*/
// Move the bug every 3 seconds
bugSpeed = setInterval(moveBug, speed);

// Change the bug's position at set intervals
function moveBug() {
  bug.x = 32 + (Math.random() * (canvas.width - 64));
  bug.y = 32 + (Math.random() * (canvas.height - 64));
}


/* ---------- Rendering Objects ---------------*/
// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0); // drawing background image to the canvas
  }

  if (bugReady) {
    ctx.drawImage(bugImage, bug.x, bug.y); // draw bug ontop (order is important)
  }

  // score
  ctx.fillStyle = "rgb(124, 1, 83)";
  ctx.font = "22px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Bugs smashed: " + bugsSmashed, 32, 32);
}

/*------------ Main Game Loop ---------------*/
var main = function () {
  render();
  requestAnimationFrame(main);
}

/*----------- Starting the game ------------*/
var then = Date.now(); // set timestamp to 'seed it'
reset(); // call reset function to start a new game
main();

/*--------- Programming the Buttons ------- */
// Reset score
let scoreButton = document.getElementById("score");

scoreButton.onclick = function(){
  bugsSmashed = 0;
}

// reset speed
let speedButton = document.getElementById("speed");
speedButton.onclick = function () {
  //need to stop a timed command
  clearInterval(bugSpeed) //clear the current interval
  var speed = 3000; // set a new speed
  bugSpeed = setInterval(moveBug, speed);
}



