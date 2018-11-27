const boardGenerator = function(size) {
  let board = new Array(size).fill([]);
  return board.map(element => new Array(size).fill("dead"));
}

const createAliveCells = function(cells) {
  return function(position) {
    cells[position[0]][position[1]] = "alive";
    return cells;
  }
}

const createInitialBoard = function(size,aliveCells) {
  let emptyBoard = boardGenerator(size);
  aliveCells.map(createAliveCells(emptyBoard));
  return emptyBoard;
}
exports.boardGenerator = boardGenerator;
exports.createInitialBoard = createInitialBoard;
