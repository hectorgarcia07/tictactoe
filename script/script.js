const resetBtn = document.getElementById("restart")
const popup = document.getElementById("popup")
const gamePage = document.getElementById("GamePage")
const closeBtn = document.getElementById("close-Btn")
const playBtn = document.getElementById("form-btn")
const playerOneInput = document.getElementById("player-one-name")
const playerTwoInput = document.getElementById("player-two-name")
const playerOneHeading = document.getElementById("player-one-heading")
const playerTwoHeading = document.getElementById("player-two-heading")
const board = Array.from(document.getElementsByClassName("col"))

const displayCurrentPlayer = document.getElementsByClassName("player-turn")[0].childNodes[0]

let PlayerOne;
let PlayerTwo;

/*----------    PLAYER OBJECT     ------------*/

//Store current players ifno
const Player = (name, symbol) => {
    let playerName = name;
    let playerSymbol = symbol;

    const getName = () => playerName;
    const getSymbol = () => playerSymbol;

    return { getName, getSymbol };
}


/*---------- GAMEBOARD OBJECT -----------*/

const GameBoard = (() => {
    let gameOver = false;
    let playerTurn = 1;

    //reset all cells to empty
    const resetBoard = () =>{
        board.forEach(cell => {
            cell.childNodes[0].innerText = "" 
            cell.childNodes[0].className = ""
        })
        gameOver = false
        playerTurn = 1
    }

    //return current player
    const currPlayerName = () => playerTurn == 1 ? PlayerOne.getName() : PlayerTwo.getName()

    //return current player tile
    const currPlayerTile = () => playerTurn == 1 ? PlayerOne.getSymbol() : PlayerTwo.getSymbol()

    const updateTurnDisplay = () =>{
        displayCurrentPlayer.innerText = currPlayerName() + " turn"
        displayCurrentPlayer.className = currPlayerTile() + "-style"
    }

    //add click event to cells
    const addEvents = () => {
        board.forEach(cell => {
            cell.addEventListener("click", makeMove);
        });
    }

    //check if cell is empty
    const isEmptyCell = function(){
        return (this.innerText == "") ? true : false
    }

    //place where user clicked
    const placeTileOnCell = function(){
        this.childNodes[0].innerText = currPlayerTile()
        this.childNodes[0].className = currPlayerTile() + "-style"
    }

    //if all cell's are full, then there is still place for a move
    const checkForTie = () => board.every((cell) => cell.childNodes[0].innerText != "" )
    

    const checkForWinner = function(){
        let currTile = currPlayerTile();

        //check rows for winner
        for(let i = 0; i < 9; i += 3){
            if (board[i].textContent == currTile &&
                board[i + 1].textContent == currTile &&
                board[i + 2].textContent == currTile){
                return true;
            }
        }

        //check column for winner
        for(let i = 0; i < 3; i++){
            if (board[i].textContent == currTile &&
                board[i + 3].textContent == currTile &&
                board[i + 6].textContent == currTile){
                return true;
            }
        }

        //check diagonal's for winner
        if (board[0].textContent == currTile &&
            board[4].textContent == currTile &&
            board[8].textContent == currTile){
            return true;
        }
        
        if (board[2].textContent == currTile &&
            board[4].textContent == currTile &&
            board[6].textContent == currTile){
            return true;
        }
        
        //no winners found
        return false
    }

    const makeMove = function(){
        //continue game untill there is a winner
        if(!gameOver){
            //check to see if cell is empty
            if(isEmptyCell.call(this)){
                placeTileOnCell.call(this);

                //if there was a winner, then stop the game
                //otherwise continue playing
                if( checkForWinner() ){
                    gameOver = true;
                    displayCurrentPlayer.innerText = currPlayerName() + " won!"
                    displayCurrentPlayer.className = currPlayerTile() + "-style"
                }
                else if( checkForTie() ){
                    gameOver = true;
                    displayCurrentPlayer.innerText = "Tie!"
                    displayCurrentPlayer.className = ""
                }
                else{
                    //update the players turn
                    playerTurn == 1 ? playerTurn++ : playerTurn--
                    updateTurnDisplay();
                }
            }
        }
    }

    return { addEvents, makeMove, resetBoard, checkForTie }
})();

/* ------------------ INPUT FORM ------------------*/

//will be used to show the player input form
resetBtn.addEventListener("click", function () {
    event.preventDefault();
    GameBoard.resetBoard();
    popup.style.display = "flex";
    gamePage.style.display = "none";
    displayCurrentPlayer.className = ""
});

//Closes pop up form and gets name 
playBtn.addEventListener("click", closeForm, false);
closeBtn.addEventListener("click", closeForm, false);

//will be used to close the player input form
function closeForm(e){
    e.preventDefault();
    popup.style.display = "none";
    gamePage.style.display = "block";

    updateUserName();
}

/*--- Update HTML header with user name and update name objects */
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

    //update player object data
    PlayerOne = Player(playerOneName, "X")
    PlayerTwo = Player(playerTwoName, "O");

    //update the players name
    playerOneHeading.innerText = playerOneName;
    playerTwoHeading.innerText = playerTwoName;

    //update current player's turn
    displayCurrentPlayer.innerText = playerOneName + " turn"
    displayCurrentPlayer.className = "X-style"
}

GameBoard.addEvents(); //make cells clickable
