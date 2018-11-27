const assert = require('assert');
const { 
  boardGenerator,
  filterNeighbours,
  createAliveCells } = require('../src/util.js');

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

describe("filterNeighbours", function() {
  describe("for negative index", function() {
    it("should return false", function() {
      let isReal = filterNeighbours(2);
      assert.deepEqual(isReal([-1,0]), false);
      assert.deepEqual(isReal([0,-1]), false);
    });
  });

  describe("for index greater than size", function() {
    it("should return false ", function() {
      let isReal = filterNeighbours(3);
      assert.deepEqual(isReal([3,2]),false);
      assert.deepEqual(isReal([3,3]),false);
      assert.deepEqual(isReal([2,3]),false);
    });
  });

  describe("for index which is non-negative and lesser than size", function() {
    it("should return true ", function() {
      let isReal = filterNeighbours(4);
      assert.deepEqual(isReal([3,2]),true);
      assert.deepEqual(isReal([3,3]),true);
      assert.deepEqual(isReal([2,3]),true);
    });
  });
});
