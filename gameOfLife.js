const lib = require('./src/lib.js');
const readLine = require('readline-sync');

const {
  nextGenerationState,
  createInitialBoard } = lib;

const main = function(){
  let size = +readLine.question("Enter the size of cell matrix : ");
  let aliveCells = readLine.question("Enter alive cells indexes between [0,0] to"+"["+"size-1"+","+"size-1"+"] :");
  aliveCells = JSON.parse(aliveCells);
  let iterations = +readLine.question("Enter the number of iterations : ");

  return nextGenerationState(size,aliveCells,iterations);
}
console.log(main());

