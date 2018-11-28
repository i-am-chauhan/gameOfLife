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

const extractCellState = function(board) {
  return function(cellState, position) {
    let state = board[position[0]][position[1]];
    cellState[state].push(state);
    return cellState;
  }
}

const getNeighbourCellState = function(cell, size , board) {
  let cellState = { alive:[], dead:[]};
  let neighbours = findNeighbourCells(size, cell);
  return neighbours.reduce(extractCellState(board), cellState);
}

exports.createInitialBoard = createInitialBoard;
exports.findNeighbourCells = findNeighbourCells;
exports.getNeighbourCellState = getNeighbourCellState;
