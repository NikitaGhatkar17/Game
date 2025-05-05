let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let startBtn = document.querySelector('#start-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let playerOInput = document.querySelector('#playerO');
let playerXInput = document.querySelector('#playerX');
let main =document.querySelector('main')
let playerNamesContainer = document.querySelector('.player-names');



let turnO = true;
let moveCount = 0;
let playerOName = '';
let playerXName = '';

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

}; 

const startGame = () => {
    playerOName = playerOInput.value || 'player O';
    playerXName = playerXInput.value || 'player X';
    playerNamesContainer.classList.add('hide');
    main.classList.remove('hide');
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o")
            turnO = false;
        }else{
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = "true";
        moveCount++;

        checkWinner();
    }); 
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";     
        box.classList.remove("x", "o");
    }
};


const showWinner = (winner) => {
    let winnerName = winner === 'O' ? playerOName : playerXName;
    msg.innerText = `Congratulations.! ${winnerName} Wins the Game!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}



const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return;
            }
        }
    }
    if (moveCount == 9){
        msg.innerText = "The Game Was Draw!";
        msgContainer.classList.remove("hide");
    }
};


startBtn.addEventListener("click",startGame);
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);




