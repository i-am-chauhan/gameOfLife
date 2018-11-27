const boardGenerator = function(size) {
  let board = new Array(size).fill([]);
  return board.map(x=>new Array(size).fill("dead"));
}

exports.boardGenerator = boardGenerator;
