// Gameboard
//----- array of squares

const gameBoard = (() => {
  const _tiles = [];
  _tiles.length = 9;

  const isTileEmpty = (index) => {
    return _tiles[index] == null;
  };

  const markTile = (index, mark) => {
    _tiles[index] = mark;
  };

  const clearTiles = () => {
    _tiles = [];
    _tiles.length = 9;
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

// Player factory
//----- marker string
//----- name string

// Game logic
//----- _player references
//----- _current player
//----- _board
//----- _alternatePlayers()
//----- _checkWin()
//----- _displayWinScreen()
//----- playRound()
//----- resetBoard()

// playRound()
//-----

// Assign all grid squares an event listener of click for place marker
//----- if element is empty place marker then finish round logic

const grids = document.querySelectorAll(".grid");
grids.forEach((grid) =>
  grid.addEventListener("click", (e) => {
    let index = parseInt(e.target.dataset.index);
    if (gameBoard.isTileEmpty(index)) {
      gameBoard.markTile(index, gameLogic.getCurrentPlayerMarker());
      gameLogic.startNextRound();
      renderer.renderScreen(gameBoard.getTiles());
    }
  })
);

let playerOne = Player("Josh", "X");
let playerTwo = Player("Max", "O");

const gameLogic = ((p1, p2) => {
  let playerOne = p1;
  let playerTwo = p2;
  let _currentPlayer = playerOne;

  let roundCount = 1;
  const maxRounds = 9;

  const _alternatePlayers = () => {
    _currentPlayer = _currentPlayer === playerOne ? playerTwo : playerOne;
  };

  // TODO check if there are 3 markers in a line
  const _checkWinCondition = () => {
    return false;
  };

  const startNextRound = () => {
    // No more spaces, noone wins
    if (++roundCount >= maxRounds) {
    }

    // Checks to see if either current player has won
    if (_checkWinCondition) {
    }

    _alternatePlayers();
  };

  const getCurrentPlayerMarker = () => {
    return _currentPlayer.getMarker();
  };

  return { startNextRound, getCurrentPlayerMarker };
})(playerOne, playerTwo);

const renderer = (() => {
  const renderScreen = (array) => {
    for (let i = 0; i < grids.length; i++) {
      grids[i].textContent = array[i];
    }
  };

  return { renderScreen };
})();
