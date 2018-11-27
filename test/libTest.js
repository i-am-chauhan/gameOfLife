const assert = require('assert');
const { 
  boardGenerator,
  createInitialBoard } = require('../src/lib.js');

describe("boardGenerator", function() {
  it("should return a Array of Arrays of same given length", function() {
    let result = [ [ 'dead', 'dead' ], [ 'dead', 'dead' ] ];
    assert.deepEqual(boardGenerator(2), result);
  });

  it("should return a Array of Arrays of same given length", function() {
    let result = [ [ 'dead', 'dead', 'dead' ],[ 'dead', 'dead', 'dead' ],[ 'dead', 'dead', 'dead' ] ]
    assert.deepEqual(boardGenerator(3), result);
  });
});

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
