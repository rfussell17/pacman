
//import ghost class to construct individual ghosts
import { Ghost } from "./Ghost.js";

//invoke IIFE function
(function () {

//global vars
const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const gameBanner = document.querySelector(".game-banner");
let squares = [];
let score = 0;

//array legend
// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board function
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    //create a square
    const square = document.createElement("div");
    //put square in grid
    grid.appendChild(square);
    //put square in squares array
    squares.push(square);

    //add class to squares in array
    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    }
  }
}
//invoke create board function
createBoard();

//assign direction keycodes to vars
const DOWN = 40;
const UP = 38;
const LEFT = 37;
const RIGHT = 39;


//starting position of pacman
let pacmanCurrentIndex = 490;
//draw pacman on board
squares[pacmanCurrentIndex].classList.add("pacman");


//function to control pacman with dpad
function control(e) {
  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (e.keyCode) {
    case DOWN:
      if (
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width;
      break;
    case UP:
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width >= 0
      )
        pacmanCurrentIndex -= width;
      break;
    case LEFT:
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1;
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      }
      break;
    case RIGHT:
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1
      )
        pacmanCurrentIndex += 1;
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      }
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
  pacDotEaten();
  powerPelletEaten();
}
document.addEventListener("keyup", control);


//eat pacdot events
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    score++;
    scoreDisplay.innerHTML = score;
  }
}

//eat power pellet events
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
    score += 10;
    ghosts.forEach((ghost) => (ghost.isScared = true));

    setTimeout(unScareGhosts, 10000);
  }
}

//function to return ghosts to default status
function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

//array of ghosts constructed from Ghost.js class
const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];

//draw my ghosts onto grid
ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
});

//move the ghosts
ghosts.forEach((ghost) => moveGhost(ghost));

//function to randomize ghost movement
function moveGhost(ghost) {
  console.log("moved ghost");
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");

      ghost.currentIndex += direction;

      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
      ghosts.forEach((ghost) => (ghost.speed = 10));

    }

    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score +=100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    //check game over/win requirements after each ghost movement
    checkGameOver()
    checkGameWin()
  }, ghost.speed);
}

function checkGameOver(){
  if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost') ) {

    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', control)
    gameBanner.textContent = "YOU LOSE"
  }
}


function checkGameWin(){
  if (score >= 400) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keyup', control)
    gameBanner.textContent = "YOU WIN"
  }
}

})();