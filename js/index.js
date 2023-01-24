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
  };

  const getAllTilesForTesting = () => {
    return _tiles;
  };

  return { isTileEmpty, markTile, clearTiles, getAllTilesForTesting };
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
    }
  })
);

let playerOne = Player("Josh", "X");
let playerTwo = Player("Max", "O");

const gameLogic = ((p1, p2) => {
  let playerOne = p1;
  let playerTwo = p2;
  let _currentPlayer = playerOne;

  const _alternatePlayers = () => {
    _currentPlayer = _currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const startNextRound = () => {};

  const getCurrentPlayerMarker = () => {
    return _currentPlayer.getMarker();
  };

  return { startNextRound, getCurrentPlayerMarker };
})(playerOne, playerTwo);
