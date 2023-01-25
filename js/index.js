const startBtn = document.querySelector(".start-btn");
// const resetBtn = document.querySelector(".reset-btn");
const resetBtns = document.querySelectorAll(".reset-btn");

startBtn.addEventListener("click", () => {
  let p1Name = document.querySelector(".p1-name").value;
  let p2Name = document.querySelector(".p2-name").value;

  gameLogic.startGame(Player(p1Name, "X"), Player(p2Name, "O"));
});

resetBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    gameBoard.clearTiles();
    gameLogic.resetGame();
    renderer.renderScreen(gameBoard.getTiles());
  })
);

const grids = document.querySelectorAll(".grid");
grids.forEach((grid) =>
  grid.addEventListener("click", (e) => {
    let index = parseInt(e.target.dataset.index);
    if (gameBoard.isTileEmpty(index) && !gameLogic.isGameOver()) {
      gameBoard.markTile(index, gameLogic.getCurrentPlayerMarker());
      gameLogic.startNextRound();
      renderer.renderScreen(gameBoard.getTiles());
    }
  })
);

const gameBoard = (() => {
  let _tiles = Array(9).fill(null);

  const isTileEmpty = (index) => {
    return _tiles[index] == null;
  };

  const markTile = (index, mark) => {
    _tiles[index] = mark;
  };

  const clearTiles = () => {
    _tiles = Array(9).fill(null);
  };

  const getTiles = () => {
    return _tiles;
  };

  return { isTileEmpty, markTile, clearTiles, getTiles };
})();

const Player = (name, marker) => {
  const getName = () => {
    return name;
  };
  const getMarker = () => {
    return marker;
  };

  return { getName, getMarker };
};

const gameLogic = (() => {
  let playerOne;
  let playerTwo;
  let _currentPlayer = playerOne;

  let roundCount = 1;
  const maxRounds = 9;

  let _gameOver = false;

  const _alternatePlayers = () => {
    _currentPlayer = _currentPlayer === playerOne ? playerTwo : playerOne;
  };

  // TODO refactor this to be more effcient
  const _checkWinCondition = () => {
    let x = _currentPlayer.getMarker();
    const tiles = gameBoard.getTiles();

    // Check rows
    for (let i = 0; i < tiles.length; i += 3) {
      if (!tiles[i]) continue;

      if (tiles[i] === tiles[i + 1] && tiles[i + 1] == tiles[i + 2]) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (!tiles[i]) continue;

      if (tiles[i] === tiles[i + 3] && tiles[i + 3] === tiles[i + 6]) {
        return true;
      }
    }

    // Check diagonal
    if (tiles[0]) {
      if (tiles[0] === tiles[4] && tiles[4] === tiles[8]) return true;
    }
    if (tiles[2]) {
      if (tiles[2] === tiles[4] && tiles[4] === tiles[6]) return true;
    }

    return false;
  };

  const startGame = (p1, p2) => {
    playerOne = p1;
    playerTwo = p2;

    _currentPlayer = playerOne;
  };

  const resetGame = () => {
    _currentPlayer = playerOne;
    roundCount = 1;

    renderer.hideModal();
    _gameOver = false;
  };

  const startNextRound = () => {
    // No more spaces, noone wins
    if (roundCount++ >= maxRounds) {
      renderer.showModal("No one wins");
      _gameOver = true;
    }

    // Checks to see if either current player has won
    if (_checkWinCondition()) {
      renderer.showModal(`${_currentPlayer.getName()} WINS!`);
      _gameOver = true;
    }

    _alternatePlayers();
  };

  const getCurrentPlayerMarker = () => {
    return _currentPlayer.getMarker();
  };

  const isGameOver = () => {
    return _gameOver;
  };

  return {
    startGame,
    resetGame,
    startNextRound,
    getCurrentPlayerMarker,
    isGameOver,
  };
})();

const renderer = ((doc) => {
  const _document = doc;

  const modalContainerClass = ".modal-container";
  const modalClass = ".modal";
  const modalTextClass = ".game-over-text";

  const renderScreen = (array) => {
    for (let i = 0; i < grids.length; i++) {
      grids[i].textContent = array[i];
    }
  };

  const hideModal = () => {
    _document.querySelector(modalContainerClass).classList.remove("active");
    _document.querySelector(modalClass).classList.remove("active");
  };

  const showModal = (gameOverText) => {
    _document.querySelector(modalContainerClass).classList.add("active");
    _document.querySelector(modalClass).classList.add("active");
    _document.querySelector(modalTextClass).textContent = gameOverText;
  };

  return { renderScreen, hideModal, showModal };
})(document);
