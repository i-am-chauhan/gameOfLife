const assert = require('assert');
const { boardGenerator } = require('../src/lib.js');

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
