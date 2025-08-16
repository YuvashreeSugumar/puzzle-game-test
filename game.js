const startBtn=document.getElementById('startBtn');const titleScreen=document.getElementById('title-screen');const gameBoard=document.getElementById('game-board');
let flipped=[];let matched=0;
const cards=['💜','🎤','✨','🔥','💜','🎤','✨','🔥'];
function initGame(){gameBoard.innerHTML='';flipped=[];matched=0;
cards.sort(()=>Math.random()-0.5);
cards.forEach(symbol=>{const div=document.createElement('div');div.className='card';div.dataset.symbol=symbol;div.addEventListener('click',flipCard);gameBoard.appendChild(div);});}
function flipCard(){if(this.classList.contains('flipped'))return;this.textContent=this.dataset.symbol;this.classList.add('flipped');flipped.push(this);
if(flipped.length===2){if(flipped[0].dataset.symbol===flipped[1].dataset.symbol){matched+=2;flipped=[];if(matched===cards.length){setTimeout(()=>alert('You win!'),300);}}
else{setTimeout(()=>{flipped.forEach(c=>{c.textContent='';c.classList.remove('flipped');});flipped=[];},1000);}}}
startBtn.onclick=()=>{titleScreen.classList.add('hidden');gameBoard.classList.remove('hidden');initGame();};
