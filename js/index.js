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

  const _displayWinScreen = (winMessage) => {
    console.log(winMessage);
  };

  const startNextRound = () => {
    // No more spaces, noone wins
    if (roundCount++ >= maxRounds) {
      _displayWinScreen("No one wins");
    }

    // Checks to see if either current player has won
    if (_checkWinCondition()) {
      _displayWinScreen(`${_currentPlayer.name} WINS`);
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
