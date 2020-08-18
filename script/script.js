const resetBtn = document.getElementById("restart");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-Btn");
const playBtn = document.getElementById("form-btn");
const playerOneInput = document.getElementById("player-one-name");
const playerTwoInput = document.getElementById("player-two-name");
const playerOneHeading = document.getElementById("player-one-heading");
const playerTwoHeading = document.getElementById("player-two-heading");
const board = document.getElementsByClassName("col");

//Will check for winners, reset board, place an X or O, add events to
//each cell
const GameBoard = (() => {
    //play game
    const play = () => {
        addEventToCells(); //make tiles clickable
        
    }

    //Determine if player can place cell in
    const playerMove = () => {
        let className = this.classList[1];
        let tile = (playerTurn() === 1) ? 'X' : 'O';

        //check if move was valid
        if (checkValidMove(tile, className)){
            //check if player won
            if( checkWinner(tile) ){
                alert("Player won!");
                removeEventFromCell();
            }
            else{
                updateTurn();
            }
        }
    }

    //check if cell is empty
    const checkValidMove = (tile, className) => {
        if(className.innerText === ""){
            className.innerText = tile;
            return true;
        }
        return false;
    }

    //add events to cell
    const addEventToCells = () => {
        board.forEach(cell => { cell.addEventListener("click", playerMove) });
    }

    //remove events from cell
    const removeEventFromCell = () => {
        board.forEach(cell => { cell.removeEventListener("click", playerMove) });
    }

    //keep track of turn
    let playerTurn = 1;

    const updateTurn = () => { (playerTurn == 1) ? playerTurn++ : playerTurn--; }
    const getPlayerTurn = () => playerTurn;

    //check for winner
    const checkWinner = (tile) => {
        //check each row if player won
        for(let i = 0; i <= 6; i+= 3){
            if(board[i] === tile && board[i+1] === tile && board[i+2] === tile){
                return true;
            }
        }
        //check each column if player won
        for (let i = 0; i < 3; i++) {
            if (board[i] === tile && board[i+3] === tile && board[i+6] === tile) {
                return true;
            }
        }

        //check across if player won
        if(board[0] === tile && board[4] === tile && board[8] === tile)
        {
            return true;
        }

        if (board[2] === tile && board[4] === tile && board[6] === tile) {
            return true;
        }
    };

    return { play };
})();

//reset board
//place tile

/* ------------------ INPUT FORM ------------------*/

//will be used to show the player input form
resetBtn.addEventListener("click", function () {
    event.preventDefault();
    popup.style.display = "flex";
});

//will be used to close the player input form
function closeForm(e){
    e.preventDefault();
    popup.style.display = "none";

    updateUserName();
}

//get user input and insert it on the header
function updateUserName(){
    let playerOneName = playerOneInput.value;
    let playerTwoName = playerTwoInput.value;

    //if name is empty, asign a default name
    if(playerOneName === ""){
        playerOneName = "Player One"
    }    

    if(playerTwoName === ""){
        playerTwoName = "Player Two"
    }

    //update the players name
    playerOneHeading.innerText = playerOneName;
    playerTwoHeading.innerText = playerTwoName;
}

playBtn.addEventListener("click", closeForm, false);
closeBtn.addEventListener("click", closeForm, false);

//Player object, can get/update player name and assign a symbol
const Player = (name, symbol) => {
    let playerName = name;
    let playerSymbol = symbol;

    const getName = () => playerName;
    const getSymbol = () => playerSymbol;
    const setName = (newName) => playerName = newName;

    return { getName, getSymbol, setName };
}

GameBoard.play();