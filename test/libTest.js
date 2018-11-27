const assert = require('assert');
const { 
  createInitialBoard,
  findNeighbourCells } = require('../src/lib.js');

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
    it("should return three neibour cells", function() {
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

