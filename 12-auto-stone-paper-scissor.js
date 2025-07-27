alert(
`
If you want to play with keyboard:

1. Rock = r ;
2. Paper = p ;
3. Scissors = s ;
4. Auto Play = a ;
5. Reset Score = Backspace ;
`
);


let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isautoplaying = false;
let intervalID;

 function autoplay() {
  if(!isautoplaying){
//for auto paly game
    intervalID = setInterval(() =>{
      const playerMove = pickComputerMove()
      playGame(playerMove);
    },1000);
    isautoplaying = true;
  }else{
    clearInterval(intervalID);
    isautoplaying = false
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click',() =>{
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissors');
  } else if(event.key === 'a'){
    autoplay();
  } else if(event.key === 'Backspace'){
    resetGame();
  }
});

function resetGame(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose!';
    } else if (computerMove === 'Paper') {
      result = 'You Win!';
    } else if (computerMove === 'Scissors') {
      result = 'Tie!';
    }
  }

  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You Win!';
    } else if (computerMove === 'Paper') {
      result = 'Tie!';
    } else if (computerMove === 'Scissors') {
      result = 'You Lose!';
    }
  }

  else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie!';
    } else if (computerMove === 'Paper') {
      result = 'You Lose!';
    } else if (computerMove === 'Scissors') {
      result = 'You Win!';
    }
  }

  if (result === 'You Win!') {
    score.wins += 1;
  } else if (result === 'You Lose!') {
    score.losses += 1;
  } else if (result === 'Tie!') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-move').innerHTML = `You<img src="css img/${playerMove}.webp" class="icon">
    <img src="css img/${computerMove}.webp" class="icon">
    computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let pickComputerMove = (() => {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
});
