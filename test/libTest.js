const assert = require('assert');
const { 
  createInitialBoard,
  findNeighbourCells,
  getNeighbourCellState,
  nextGenerationState,
  canBeAlive,
  canBeDead,
  isStateSame } = require('../src/lib.js');

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
      assert.deepEqual(getNeighbourCellState(size,board,cell),result);
    });
  });

  describe("for all dead neighbour cells", function() {
    it("should return array with all dead states and empty array for alive states in object", function() {
      let size = 3;
      let cell = [0,0];
      let aliveCells = [[2,0],[2,1],[2,2]];
      let board = createInitialBoard(size,aliveCells);
      let result = { alive: [], dead: [ 'dead', 'dead', 'dead' ] }; 
      assert.deepEqual(getNeighbourCellState(size,board,cell),result);
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
      assert.deepEqual(getNeighbourCellState(size,board,cell),result);
    });
  });
});

describe("nextGenerationState", function() {
  describe("for all alive cells and more than 2 iterations", function() {
    it("should return board of same length with all dead cells", function() {
      let size = 3;
      let iterations = 3;
      let aliveCells = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
      let result = [ [ 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'dead' ] ];
      assert.deepEqual(nextGenerationState(size,aliveCells,iterations),result);
    });
  });

  describe("for all dead cells", function() {
    it("should return array same board after any number of iterations", function() {
      let size = 3;
      let iterations = 6;
      let aliveCells = [];
      let result = [ [ 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'dead' ] ];
      assert.deepEqual(nextGenerationState(size,aliveCells,iterations),result);
    });
  });

  describe("for some dead and some alive cells", function() {
    it("should return apropriate board after given iterations", function() {
      let size = 5;
      let iterations = 4;
      let aliveCells =[[2,2],[1,0],[3,4],[3,3],[3,1],[0,0],[2,0]];
      let result = [ [ 'dead', 'dead', 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'dead', 'dead', 'dead' ],
        [ 'alive', 'alive', 'alive', 'dead', 'dead' ],
        [ 'alive', 'alive', 'dead', 'dead', 'dead' ],
        [ 'dead', 'dead', 'alive', 'dead', 'dead' ] ];
      assert.deepEqual(nextGenerationState(size,aliveCells,iterations),result);
    });
  });
});

describe("canBeAlive", function() {
  describe("for exact three neighbour alive cells", function() {
    it("should return true", function() {
      let neighbourCellStates = { alive: [ 'alive', 'alive', 'alive' ], dead: [] };
      assert.deepEqual(canBeAlive(neighbourCellStates),true);
    });
  });
  
  describe("for other than three neighbour alive cells", function() {
    it("should return false", function() {
      let neighbourCellStates = { alive: [ 'alive', 'alive' ], dead: [ 'dead' ] };
      assert.deepEqual(canBeAlive(neighbourCellStates),false);
    });
  });
});

describe("canBeDead", function() {
  describe("for less than two and more than three neighbour alive cells", function() {
    it("should return true", function() {
      let neighbourCellStates ={ alive: [ 'alive' ], dead: [ 'dead', 'dead' ] };
      assert.deepEqual(canBeDead(neighbourCellStates),true);
      neighbourCellStates = { alive: [ 'alive', 'alive', 'alive', 'alive' ], dead: [ 'dead' ] };
      assert.deepEqual(canBeDead(neighbourCellStates),true);
    });
  });
  
  describe("for two or three neighbour alive cells", function() {
    it("should return false", function() {
      let neighbourCellStates = { alive: [ 'alive', 'alive', 'alive' ], dead: [] } ;
      assert.deepEqual(canBeDead(neighbourCellStates),false);
    });
  });
});

