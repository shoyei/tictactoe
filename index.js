
//Module for storing the player moves and game logic
const gameBoardMod = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""]
    let gameStart = false;
    let turn = 0;
    return {
        gameArray,
        turn: turn,
        gameStart: gameStart
    };
})();

//Module for the interface
const displayMod = (() => {

    //DOM Selectors
    const gameContainer = document.querySelector('#container');
    const startInput = document.querySelector('#start');
    const p1NameInput = document.querySelector('#p1Name');
    const p1CharInput = document.querySelector('#p1Char');
    const p2NameInput = document.querySelector("#p2Name")
    const p2CharInput = document.querySelector('#p2Char')
    const overlay = document.querySelector('#overlay')
    const okButton = document.querySelector('#okButton')
    let player1;
    let player2;

    function startGame() {
        startInput.addEventListener('click', function () {
            if (gameBoardMod.gameStart == false) {
                overlay.style.display = 'flex';
            }
            if (gameBoardMod.gameStart == true) {
                startInput.textContent = "Player 1's turn";
            }
        });
    }

    function playTime() {
        okButton.addEventListener('click', function () {
            player1 = playerFact(p1NameInput.value, 1, p1CharInput.value)
            player2 = playerFact(p2NameInput.value, 2, p2CharInput.value)
            overlay.style.display = 'none';
        });
    }
    //Display gameArray's values to the DOM
    function toDisplay() {
        for (i = 0; i < 9; i++) {
            let _gameSquare = document.createElement('div');
            _gameSquare.setAttribute("id", i);
            _gameSquare.classList.add("gameSquare")
            _gameSquare.textContent = `${gameBoardMod.gameArray[i]}`;
            gameContainer.appendChild(_gameSquare);
        };
    };
    return {
        player1: player1,
        player2: player2,
        display: toDisplay(),
        start: startGame(),
        playTime: playTime()
    };
})();

//Factory function for creating player object
const playerFact = (name, playerID, symbol) => {
    const getName = name;
    const getPlayerID = playerID;
    const character = symbol.toUpperCase();
    const sayHi = () => {
        console.log(`Hi my name is ${getName} and I am player ${getPlayerID}`);
    }
    return {
        name: getName,
        playerID: getPlayerID,
        character: character,
        sayHi,
    }
};

const newPlayer = playerFact('Zac', 1, "x")

