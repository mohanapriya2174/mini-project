// Background scrolling speed
let move_speed = 3;

// Gravity constant value
let gravity = 0.5;
let bird = document.querySelector(".bird");
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_value");
let sum = document.querySelector(".score_value").innerHTML;
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");
let total_score = document.querySelector(".total_score");

// Setting initial game state to start
let game_state = "Start";

// Add an eventlistener for key presses
document.addEventListener("keydown", (e) => {
  // Start the game if enter key is pressed
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe").forEach((e) => {
      e.remove();
    });
    bird.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    play();
  }
});
function play() {
  function move() {
    // Detect if game has ended
    if (game_state != "Play") return;

    // Getting reference to all the pipe elements
    let pipe = document.querySelectorAll(".pipe");
    pipe.forEach((element) => {
      let pipe_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      // Delete the pipes if they have moved out
      // of the screen hence saving memory
      if (pipe_props.right <= 0) {
        element.remove();
      } else {
        // Collision detection with bird and pipes
        if (
          bird_props.left < pipe_props.left + pipe_props.width &&
          bird_props.left + bird_props.width > pipe_props.left &&
          bird_props.top < pipe_props.top + pipe_props.height &&
          bird_props.top + bird_props.height > pipe_props.top
        ) {
          // Change game state and end the game
          // if collision occurs
          game_state = "End";
          message.innerHTML = "Press Enter To Restart";
          total_score.innerHTML = `Score:${sum}`;
          total_score.style.left = "28vw";
          message.style.left = "28vw";
          document.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
              location.reload();
            }
          });
          return;
        } else {
          // Increase the score if player
          // has the successfully dodged the
          if (
            pipe_props.right < bird_props.left &&
            pipe_props.right + move_speed >= bird_props.left &&
            element.increase_score == "1"
          ) {
            const score_sum = function () {
              sum = +sum + 1;
              score_val.innerHTML = sum;
              return sum;
            };
            score_sum();
          }
          element.style.left = pipe_props.left - move_speed + "px";
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bird_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    bird_dy = bird_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " " || e.key == "Enter") {
        bird_dy = -7.6;
      }
    });

    // Collision detection with bird and
    // window top and bottom

    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = "End";
      message.innerHTML = "Press Enter To Restart";
      total_score.innerHTML = `Score:${sum}`;
      total_score.style.left = "28vw";
      message.style.left = "28vw";
      document.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          location.reload();
        }
      });
      return;
    }
    bird.style.top = bird_props.top + bird_dy + "px";
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  // Constant value for the gap between two pipes
  let pipe_gap = 35;
  function create_pipe() {
    if (game_state != "Play") return;

    // Create another set of pipes
    // if distance between two pipe has exceeded
    // a predefined value
    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      // Calculate random position of pipes on y axis
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_inv = document.createElement("div");
      pipe_inv.className = "pipe";
      pipe_inv.style.top = pipe_posi - 70 + "vh";
      pipe_inv.style.left = "100vw";

      // Append the created pipe element in DOM
      document.body.appendChild(pipe_inv);
      let pipe = document.createElement("div");
      pipe.className = "pipe";
      pipe.style.top = pipe_posi + pipe_gap + "vh";
      pipe.style.left = "100vw";
      pipe.increase_score = "1";

      // Append the created pipe element in DOM
      document.body.appendChild(pipe);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
