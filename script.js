const board = document.getElementById("game-board");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
let moves = 0, timer = 0, flipped = [], matched = 0;
let timerInterval;

const groups = [
  "bts.png","seventeen.png","blackpink.png","twice.png",
  "skz.png","txt.png","ateez.png","enhypen.png"
];
let cards = [...groups, ...groups];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  cards = shuffle(cards);
  board.innerHTML = "";
  moves = 0; matched = 0; flipped = [];
  movesEl.textContent = "Moves: 0";
  timer = 0;
  timerEl.textContent = "Time: 0s";
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = "Time: " + timer + "s";
  }, 1000);
  cards.forEach(c => createCard(c));
}

function createCard(img) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back" style="background-image:url('assets/${img}')"></div>
    </div>`;
  card.addEventListener("click", () => flipCard(card, img));
  board.appendChild(card);
}

function flipCard(card, img) {
  if (flipped.length === 2 || card.classList.contains("flipped")) return;
  card.classList.add("flipped");
  flipped.push({card, img});
  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = "Moves: " + moves;
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = flipped;
  if (c1.img === c2.img) {
    matched++;
    flipped = [];
    if (matched === groups.length) {
      clearInterval(timerInterval);
      setTimeout(() => alert("You win! 🎉 Moves: " + moves + " | Time: " + timer + "s"), 500);
    }
  } else {
    setTimeout(() => {
      c1.card.classList.remove("flipped");
      c2.card.classList.remove("flipped");
      flipped = [];
    }, 1000);
  }
}

startGame();
