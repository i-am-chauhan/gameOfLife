const assert = require('assert');
const { 
  createInitialBoard,
  findNeighbourCells,
  getNeighbourCellState } = require('../src/lib.js');

describe("createInitialBoard", function() {
  it("should replace given position elements of board  with 'alive'", function() {
    let result = [ [ 'alive', 'dead' ], [ 'dead', 'alive' ] ];
    assert.deepEqual(createInitialBoard(2,[[0,0],[1,1]]), result);
  });

  it("should replace given position elements of board  with 'alive'", function() {
    let result = [ [ 'alive', 'dead', 'alive' ],[ 'dead', 'alive', 'dead' ],[ 'dead', 'dead', 'alive' ] ]
    assert.deepEqual(createInitialBoard(3,[[0,0],[1,1],[2,2],[0,2]]), result);
  });
});

describe("findNeighbourCells", function() {
  describe("for corner cells", function() {
    it("should return three neighbour cells", function() {
      let result = [ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ];
      assert.deepEqual(findNeighbourCells(3,[0,0]),result);
    });
  });

  describe("for edge cells", function() {
    it("should return five neighbour cells", function() {
      let result = [ [ 0, 0 ], [ 0, 2 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ]; 
      assert.deepEqual(findNeighbourCells(3,[0,1]), result);
    });
  });

  describe("for middle cells", function() {
    it("should return nine neighbour cells", function() {
      let result = [ [ 1, 0 ],
        [ 1, 2 ],
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 2, 0 ],
        [ 2, 1 ],
        [ 2, 2 ] ];
      assert.deepEqual(findNeighbourCells(3,[1,1]), result);
    });
  });
});

describe("getNeighbourCellState", function() {
  describe("for all alive neighbour cells", function() {
    it("should return array with all alive states and empty array for dead states in object", function() {
      let size = 3;
      let cell = [0,0];
      let aliveCells = [[1,1],[1,0],[0,1]];
      let board = createInitialBoard(size,aliveCells);
      let result = { alive: [ 'alive', 'alive', 'alive' ], dead: [] }; 
      assert.deepEqual(getNeighbourCellState(cell,size,board),result);
    });
  });

  describe("for all dead neighbour cells", function() {
    it("should return array with all dead states and empty array for alive states in object", function() {
      let size = 3;
      let cell = [0,0];
      let aliveCells = [[2,0],[2,1],[2,2]];
      let board = createInitialBoard(size,aliveCells);
      let result = { alive: [], dead: [ 'dead', 'dead', 'dead' ] }; 
      assert.deepEqual(getNeighbourCellState(cell,size,board),result);
    });
  });

  describe("for some dead and some alive cells", function() {
    it("should return object with arrays of alive and dead cells", function() {
      let size = 3;
      let cell = [1,1];
      let aliveCells = [[2,0],[2,1],[2,2]];
      let board = createInitialBoard(size,aliveCells);
      let result ={ alive: [ 'alive', 'alive', 'alive' ],
        dead: [ 'dead', 'dead', 'dead', 'dead', 'dead' ] };
      assert.deepEqual(getNeighbourCellState(cell,size,board),result);
    });
  });
});


