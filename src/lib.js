const {
  boardGenerator,
  createAliveCells,
  isRealNeighbour,
  filterNeighbours } = require('./util.js');

const createInitialBoard = function(size,aliveCells) {
  let emptyBoard = boardGenerator(size);
  aliveCells.map(createAliveCells(emptyBoard));
  return emptyBoard;
}

const findNeighbourCells = function(size, cell) {
  let neighbourCells = [ [cell[0], cell[1]-1], [cell[0],cell[1]+1] ];

  neighbourCells.push([cell[0]-1, cell[1]-1]);
  neighbourCells.push([cell[0]-1, cell[1]]);
  neighbourCells.push([cell[0]-1, cell[1]+1]);
  neighbourCells.push([cell[0]+1, cell[1]-1]);
  neighbourCells.push([cell[0]+1, cell[1]]);
  neighbourCells.push([cell[0]+1, cell[1]+1]);

  return neighbourCells.filter(filterNeighbours(size));
}

exports.createInitialBoard = createInitialBoard;
exports.findNeighbourCells = findNeighbourCells;
