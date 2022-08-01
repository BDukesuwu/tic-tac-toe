/*----- constants -----*/
// define the constants, theyll be the same all game

const players = {
  '1': 'X',        //player 1
  '-1': 'O',       //player 2
  };

const winCombos = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [4, 5, 6],
  [2, 5, 8],
  [3, 5, 7],
  [7, 8, 9],
  [3, 6, 9]
];

/*----- app's state (data) (variables) -----*/
// setting variables that will change
let board;
let move;
let winner;

/*----- cached element references -----*/
const tiles = document.querySelectorAll('.tile'); //select all tiles 
const announcement = document.querySelector('h1'); //target the empty header 1

/*----- event listeners -----*/

document.querySelector('div').addEventListener('click', moveChosen);
//when the tile is clicked, run the moveChosen function where that will be stored and 
document.querySelector('button').addEventListener('click', initialize);
// when the reset button is clicked, run the initialize function to restart the game

/*----- functions -----*/
initialize(); // call initialize function to run

function initialize() { //when the game is started
  board = ['', '', '', '', '', '', '', '', '']; // make the board an empty array
  move = 1; // start at move # 1
  winner = ''; // there should be no winner at the start of the game yet
  render(); // run the render function to check for a winner as the game progresses
}

function render() { // to check the progress of the game
  board.forEach(function(ti, idx) { // iterate through the index of each tile for winner
    tiles[idx].style.background = players[ti]; 
  });
    if (winner === 'tieGame') { // if theres no winner
      announcement.innerHTML = 'Its a Draw!'; // then announce tie
    } else if (winner) { // if not, then if theres a winner
      announcement.innerHTML = `${players[winner]} is the Winner!`; //call the player name and anounce win
    } else { // if no winner or tie
      announcement.innerHTML = `${players[move]} Make your move.`; // call player name and ask player to move
    }
}

  function moveChosen(evt) { // when a move is chosen, an event will happen
    const idx = parseInt(evt.target.class.replace('ti', '')); // check the index of the tile to make sure its empty
    if (board[idx] || winner) return; // if the tile is not empty, return
    board[idx] = move; // update the info for the board,
    move *= -1; // moves,
    winner = getWinner();  // and winner
    render(); //cann render function to check game progress after player move
  }

  function getWinner() { //i used a foreach loop but it wasnt working out so i simplified it to keep it simple until i get better with the foreach
    if (Math.abs(board[1] + board[2] + board[3]) === 3) return board[0]; //winning combos from the chart
    if (Math.abs(board[4] + board[5] + board[6]) === 3) return board[3];
    if (Math.abs(board[7] + board[8] + board[9]) === 3) return board[6];
    if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[0];
    if (Math.abs(board[1] + board[5] + board[9]) === 3) return board[1];
    if (Math.abs(board[3] + board[6] + board[9]) === 3) return board[2];
    if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[0];
    if (Math.abs(board[3] + board[5] + board[7]) === 3) return board[2];
    if (board.includes(null)) return null; // if not, then return nothing yet
    return 'tieGame'; // if no win combos occur, its a tie game
  }