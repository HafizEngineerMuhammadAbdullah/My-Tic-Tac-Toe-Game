// Tic Tac Toe Game Logic:
// initialize player1 Score and player2 Score to null(0):-
let playerOneScore = 0;
let playerTwoScore = 0;


//Access the name Paragraph from the HTML:
let playerOneName = document.querySelector(".player-one-name");
//Access the name Paragraph from the HTML:
let playerTwoName = document.querySelector(".player-two-name");
//Access(get) all the buttons from the HTML:
let boxes = document.querySelectorAll(".box");
//Access(get) the reset button from the HTML:
let resetBtn = document.querySelector("#reset-btn");
//Access(get) the new button from the HTML:
let newGameBtn = document.querySelector("#new-btn");
//Access(get) the msg-container from the HTML:
let msgContainer = document.querySelector(".msg-container");
//Access(get) the message paragraph from the HTML:
let msg = document.querySelector("#msg");
// Access the player-O Score from HTML:
const playerOneScorePara = document.querySelector("#player1-score");
// Access the player-X Score from HTML:
const playerTwoScorePara = document.querySelector("#player2-score");
//playerX,playerY
let turnO = true;
// declare the variable:
let count = 0;

//Winning Patterns:
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//Prompt the two user's to Enter firstly their name:
let name1 = prompt("Kindly,Enter the first player name who select O as symbol to play:...") || "Player O";
let name2 = prompt("Kindly,Enter the second player name who select X as symbol to play:...") || "Player X";
//insert the two user's name to the paragraph:
playerOneName.innerText = name1;
playerTwoName.innerText = name2;
//Reset the Game if the user press either the New Game button  or Reset Button:
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//Add an Event Listener to all the Buttons:
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //increment the count by 1.
        count++;
        // For Player Y
        if (turnO) {
            box.innerText = "O";
            box.classList.add("set-color-O");
            turnO = false;
        }
        //For Player X
        else {
            box.innerText = "X";
            box.classList.add("set-color-X");
            turnO = true;
        }
        box.disabled = true;
        //call(invoke) check winner function
        checkWinner();
    });
});

// Enable all the buttons if the new game is started means the winner has not been shown: 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("set-color-O");
        box.classList.remove("set-color-X");
    }
};
// Disabled all the buttons if the winner and Draw has been shown:
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

//to show the Winner:
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is Player ${winner}`;
    if (winner == 'O') {
        playerOneScore++;
        playerOneScorePara.innerText = playerOneScore;
    } else {
        playerTwoScore++;
        playerTwoScorePara.innerText = playerTwoScore;
    }
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

//to show the Draw Game:
const gameDraw = () => {
    msg.innerText = "The Game is Draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

//Check the Winner:
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    //check for Draw Game:
    if (count === 9) {
        gameDraw();
    }
};

//Add Event-Listener to the New Game & Reset Button:
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
