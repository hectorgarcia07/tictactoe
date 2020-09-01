const resetBtn = document.getElementById("restart");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-Btn");
const playBtn = document.getElementById("form-btn");
const playerOneInput = document.getElementById("player-one-name");
const playerTwoInput = document.getElementById("player-two-name");
const playerOneHeading = document.getElementById("player-one-heading");
const playerTwoHeading = document.getElementById("player-two-heading");
const board = Array.from(document.getElementsByClassName("col"));
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


/*----------    GAMEBOARD OBJECT -----------*/

const GameBoard = (() => {
    let gameOver = false;
    let playerTurn = 1;

    //return current player
    const currPlayerName = () => {
        return playerTurn == 1 ? PlayerOne.getName() : PlayerTwo.getName()
    }

    //return current player tile
    const currPlayerTile = () => {
        return playerTurn == 1 ? PlayerOne.getSymbol() : PlayerTwo.getSymbol()
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
        this.innerText = currPlayerTile();
    }

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
                    console.log(currPlayerName())
                    gameOver = true;
                }
                else{
                    console.log("stuff")
                    //update the players turn
                    playerTurn == 1 ? playerTurn++ : playerTurn--
                }
            }
        }
    }

    return {addEvents, makeMove}
})();

/* ------------------ INPUT FORM ------------------*/

//will be used to show the player input form
resetBtn.addEventListener("click", function () {
    event.preventDefault();
    popup.style.display = "flex";
});

//Closes pop up form and gets name 
playBtn.addEventListener("click", closeForm, false);
closeBtn.addEventListener("click", closeForm, false);

//will be used to close the player input form
function closeForm(e){
    e.preventDefault();
    popup.style.display = "none";

    updateUserName();
    
    //the game should now start
    
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
}

GameBoard.addEvents(); //make cells clickable
GameBoard.makeMove(); //listens for a cell that has been clicked