const {
  boardGenerator,
  createAliveCells,
  isRealNeighbour,
  filterNeighbours } = require('./util.js');

const createInitialBoard = function(size,aliveCells) {
  let emptyBoard = boardGenerator(size);
  return aliveCells.reduce(createAliveCells, emptyBoard);
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

const getNeighbourCellState = function(size , board, cell) {
  let cellState = { alive:[], dead:[]};
  let neighbours = findNeighbourCells(size, cell);
  return neighbours.reduce(extractCellState(board), cellState);
}

const canBeAlive = function(neighbourCellStates) {
  return neighbourCellStates["alive"].length == 3;
}

const canBeDead = function(neighbourCellStates) {
  let aliveCount = neighbourCellStates["alive"].length;
  return (aliveCount < 2 || aliveCount > 3);
}

const isStateSame = function(neighbourCellStates) {
  return !canBeAlive(neighbourCellStates) && !canBeDead(neighbourCellStates);
}

const updateState = function(neighbourCells, index){
  return function(initializer, cell, column){
    let neighbourCellStates = neighbourCells([index, column]);
    canBeAlive(neighbourCellStates) && initializer.push("alive");
    canBeDead(neighbourCellStates) && initializer.push("dead");
    isStateSame(neighbourCellStates) && initializer.push(cell);
    return initializer;
  }
}

const updateRow = function(neighbourCells){
  return function(row , index) {
    return row.reduce(updateState(neighbourCells,index),[]);
  }
}

const nextGenerationState = function(size,aliveCells, iteration) {
  let board = createInitialBoard(size,aliveCells);
  for(let counter = 0; counter < iteration; counter++) {
    let neighbourCells = getNeighbourCellState.bind(null,size,board)
    board = board.map(updateRow(neighbourCells));
  }
  return board;
}

exports.createInitialBoard = createInitialBoard;
exports.findNeighbourCells = findNeighbourCells;
exports.getNeighbourCellState = getNeighbourCellState;
exports.nextGenerationState = nextGenerationState;
exports.canBeDead = canBeDead;
exports.canBeAlive = canBeAlive;
exports.isStateSame = isStateSame;
