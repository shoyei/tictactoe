
//Gameboard module stores player moves in an array
const interfaceMod = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""]
    let gameStart = false;
    let p1Turn = true;
    let turnsLeft = 9;
    let player1;
    let player2;

    //DOM selectors
    const gameContainer = document.querySelector('#container');
    const p1NameInput = document.querySelector('#p1Name');
    const p1CharInput = document.querySelector('#p1Char');
    const p2NameInput = document.querySelector("#p2Name");
    const p2CharInput = document.querySelector('#p2Char');
    const p1Name = document.querySelector('#player1Name')
    const p2Name = document.querySelector('#player2Name')
    const overlay = document.querySelector('#overlay');
    const overlay2 = document.querySelector('#overlay2');
    const okButton = document.querySelector('#okButton');
    const p1Char = document.querySelector('#player1Char');
    const p2Char = document.querySelector('#player2Char');
    const resetBtn = document.querySelector('#resetBtn');
    const announce = document.querySelector('#announcement');
    const exit = document.querySelector("#exit")
    let startInput = document.querySelector('#start');

    //Start Game button brings up overlay for inputting player details
    function startGame() {
        startInput.addEventListener('click', function () {
            overlay.style.display = 'flex';
            if (gameStart == true) startInput.disabled = true

        });
    }

    //Character button in overlay form switches player characters.
    p1CharInput.addEventListener('click', charSwap, false);
    p2CharInput.addEventListener('click', charSwap, false);

    function charSwap() {
        if (p1CharInput.value == 'x') {
            p1CharInput.value = 'o';
            p1CharInput.textContent = 'O';
            p2CharInput.value = 'x';
            p2CharInput.textContent = 'X';
        }
        else {
            p1CharInput.value = 'x';
            p1CharInput.textContent = 'X';
            p2CharInput.value = 'o';
            p2CharInput.textContent = 'O';
        }
    }

    //Reset buttons
    resetBtn.addEventListener('click', resetBoard, false)
    exit.addEventListener('click', resetBoard, false)

    function resetBoard() {
        overlay2.style.display = 'none';
        gameStart = false;
        p1Turn = true;
        turnsLeft = 9;
        p1NameInput.value = "";
        p2NameInput.value = "";
        p1Name.textContent = 'Player 1';
        p2Name.textContent = 'Player 2';
        p1Char.textContent = '';
        p2Char.textContent = '';
        for (i = 0; i < interfaceMod.gameArray.length; i++) {
            interfaceMod.gameArray[i] = "";
        }
        toDisplay()
        startInput.textContent = `Start Game`;
    }

    //Initialize and display gameArray's values to the DOM
    function toDisplay() {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.lastChild);
        }
        for (_i = 0; _i < gameArray.length; _i++) {
            let _gameSquare = document.createElement('div');
            _gameSquare.setAttribute("id", _i);
            _gameSquare.classList.add("gameSquare")
            _gameSquare.textContent = `${gameArray[_i]}`;
            gameContainer.appendChild(_gameSquare);
        };
    };

    //Clicking on "let's go" creates the player objects based on the inputs and starts turn #1
    function playTime() {
        okButton.addEventListener('click', function () {
            interfaceMod.player1 = playerFact(p1NameInput.value, 1, p1CharInput.value);
            interfaceMod.player2 = playerFact(p2NameInput.value, 2, p2CharInput.value);
            p1Name.textContent = `${interfaceMod.player1.name}`;
            p2Name.textContent = `${interfaceMod.player2.name}`;
            p1Char.textContent = `${p1CharInput.value.toUpperCase()}`;
            p2Char.textContent = `${p2CharInput.value.toUpperCase()}`;
            overlay.style.display = 'none';
            gameStart = true;
            startInput.textContent = `${interfaceMod.player1.name}'s turn`;
        });
        
    }

    //Places the current player's character into the gameArray and displays the results in the DOM
    gameContainer.addEventListener('click', charPlacement, false)

    function charPlacement(e) {
        let _boxID = e.target.getAttribute('id');
        if (!gameStart) return;
        if (gameArray[_boxID] !== "") return;
        if (turnsLeft % 2 === 1) {
            gameArray[_boxID] = interfaceMod.player1.character;
            startInput.textContent = `${interfaceMod.player2.name}'s turn`;
        } else if (turnsLeft % 2 === 0) {
            gameArray[_boxID] = `${interfaceMod.player2.character}`;
            startInput.textContent = `${interfaceMod.player1.name}'s turn`;
        }
        toDisplay();
        turnsLeft -= 1;
        if (turnsLeft < 5 && checkWin() && p1Turn) {
            wins(`${interfaceMod.player1.name} wins!`);
        }
        if (turnsLeft < 5 && checkWin() && !p1Turn) {
            wins(`${interfaceMod.player2.name} wins!`);
        }
        else if (turnsLeft == 0 && !checkWin()) {
            wins('Draw');
        }
        p1Turn = !p1Turn;
    };

    //Check if 3 specified indices are the same
    function checkThree(a, b, c) {
        if (!a || !b || !c) return false;
        return a === b && b === c;
    }

    //Check for winner
    function checkWin() {
        const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
        for (i = 0; i < winCond.length; i++) {
            let currentCondition = winCond[i];
            let a = gameArray[currentCondition[0]];
            let b = gameArray[currentCondition[1]];
            let c = gameArray[currentCondition[2]];
            if (checkThree(a, b, c)) {
                console.log('winner')
                return true
            }
        }
        return false
    }

    function wins(_string) {
        overlay2.style.display = 'flex';
        announce.textContent = _string;
    }

    return {
        p1Turn,
        gameArray,
        gameStart: gameStart,
        display: toDisplay(),
        playTime: playTime(),
        startGame: startGame(),
        player1: player1,
        player2: player2,
        checkwin: checkWin()
    }
})();

const gameMod = (() => {

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
