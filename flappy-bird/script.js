//Background scroll speed
let bg_speed = 3;
let gravity = 0.5;
let bird = document.querySelector(".bird");
let bird_property = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let scoreValue = document.querySelector(".score_value");
let message = document.querySelector(".message");
let scoreTitle = document.querySelector(".score_title");
let startGame = "Start";

// Add key press to start the game
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && startGame != "play") {
    document.querySelectorAll(".pipe").forEach((e) => {
      e.remove();
    });
    bird.style.top = "40vh";
    startGame = "Play";
    message.innerHTML = "";
    scoreTitle.innerHTML = "score:";
    scoreValue.innerHTML = "0";
    play();
  }
});
//check for start of the game
const gameCheck = function () {
  if (startGame != "Play") {
    return;
  }
};
function play() {
  function move() {
    gameCheck();
    let pipe = document.querySelectorAll(".pipe");
    pipe.forEach((e) => {
      let pipe_property = bird.getBoundingClientRect();
      bird_property = bird.getBoundingClientRect();
      if (pipe_property.right <= 0) {
        e.remove();
      } else {
        // collision of bird and pipe detection
        if (
          bird_property.left < pipe_property.left + pipe_property.width &&
          bird_property.left + bird_property.width > pipe_property.left &&
          bird_property.top < pipe_property.top + pipe_property.height &&
          bird_property.top + bird_property.height > pipe_property.top
        ) {
          startGame = "End";
          message.innerHTML = "Press Enter to Start Again";
          return;
        } else {
          // increase the score if crossed successfully
          if (
            pipe_property.right < bird_property.left &&
            pipe_property.right + bg_speed >= bird_property.left &&
            e.increase_score == "1"
          ) {
            scoreValue.innerHTML = +scoreValue + 1;
          }
          e.style.left = pipe_property.left - bg_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let birdFall = 0;
  function applyGravity() {
    gameCheck();
    birdFall = birdFall + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " " || e.key == "Enter") {
        birdFall = -7.6;
      }
    });
    // collision detection with top or bottom of windows
    if (bird_property.top <= 0 || bird_property.bottom >= background.bottom) {
      startGame = "End";
      message.innerHTML("Press Enter to Start Again");
      return;
    }
    bird.style.top = bird_property.top + birdFall + "px";
    bird_property = bird.getBoundingClientRect();
    requestAnimationFrame(applyGravity);
  }
  removeEventListener(applyGravity);
  let pipeSeperation = 0;
  const pipegap = 35;
  function createPipe() {
    gameCheck();
    if (pipeSeperation > 115) {
      pipeSeperation = 0;
      // make random position of pipe on y-axis
      let pipePosition = Math.floor(Math.random() * 43) + 8;
      let pipeInterval = document.createElement("div");
      pipe.className = "pipe";
      pipe.style.top = pipePosition.pipegap + "vh";
      pipe.style.left = "100vw";
      pipe.increase_score = "1";
      document.body.appendChild(pipe);
    }
    pipeSeperation++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}
