// Initial Data

let square = {
  a1:'', a2:'', a3:'',
  b1:'', b2:'', b3:'',
  c1:'', c2:'' ,c3:'',
};

let player = '';
let warning = '';
let playing = false;

let firstPlayer = '';
let secondPlayer = '';

let scoreboard = {
  x:0,
  o:0,
  draw:0,
}

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', itemClick);
});

document.querySelector('.welcome button').addEventListener('click', playerNames);
document.querySelector('.welcome button').addEventListener('click', closeWelcome);

document.querySelector('.switchPlayers').addEventListener('click', switchPlayers);

document.querySelector('.action--buttons.scoreboard--button').addEventListener('click', scoreBoardModal);

document.querySelector('.scoreboard .action--buttons').addEventListener('click', closeScoreBoard);

// Functions
function itemClick(event){
  let item = event.target.getAttribute('data-item');
  if(playing && square[item] === ''){
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset(){
  warning = '';

  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';

  for (let i in square){
    square[i] = '';
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare(){
  for (let i in square){
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo(){
  
  if(player === 'x'){
    document.querySelector('.vez').innerHTML = firstPlayer;
  }else{
    document.querySelector('.vez').innerHTML = secondPlayer;
  }
  
  // document.querySelector('.vez').innerHTML = player;
  document.querySelector('.resultado').innerHTML = warning;
};

function togglePlayer() {
  player = (player === 'x')? 'o' : 'x';
  renderInfo();
}

function checkGame(){
  if(checkWinnerFor('x')){
    warning = `${firstPlayer} venceu`;
    playing = false;
    scoreboard.x +=1;
  } else if (checkWinnerFor('o')){
    warning = `${secondPlayer} venceu`;
    playing = false;
    scoreboard.o +=1;
  } else if (isFull()){
    warning = 'Deu empate';
    playing = false;
    scoreboard.draw +=1;
  }
}

function checkWinnerFor(player){
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for (w in pos){
    let pArray = pos[w].split(',');
    let hasWon = pArray.every((option) => square[option] === player);
    if (hasWon) {
      return true;
    }
  };

  return false;

}

function isFull(){
  for(let i in square){
    if(square[i] === ''){
      return false;
    }
  }
  return true;
}

function playerNames(){
  firstPlayer = document.querySelector('#player1').value;
  secondPlayer = document.querySelector('#player2').value;

  reset();
}

function closeWelcome(){
  document.querySelector('.container').style.display = 'none';
}

function switchPlayers(){
  window.location.reload(true);
}

function scoreBoardModal(){
  let tablePlayerX = document.querySelector('#playerX');
  let tablePlayerO = document.querySelector('#playerO');
    
  tablePlayerX.innerHTML = `<th>${firstPlayer}</th><th>${scoreboard.x}</th><th>${scoreboard.o}</th><th>${scoreboard.draw}</th>`;
  tablePlayerO.innerHTML = `<th>${secondPlayer}</th><th>${scoreboard.o}</th><th>${scoreboard.x}</th><th>${scoreboard.draw}</th>`;
  
  document.querySelector('.scoreboard').style.display = 'flex';
}

function closeScoreBoard(){
  document.querySelector('.scoreboard').style.display = 'none';
}