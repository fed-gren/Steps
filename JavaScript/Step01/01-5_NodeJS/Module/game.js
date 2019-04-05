const Player = require('./player');
const dice = require('./dice');

const playerA = new Player("A");
const playerB = new Player("B");

// console.log(dice.throwDice());
const goal = 200;

while(true) {
  if(playerA.setScore(dice.throwDice()) >= 200) {
    console.log(`Player A Win!`);
    break;
  }
  if(playerB.setScore(dice.throwDice()) >= 200) {
    console.log(`Player B Win!`);
    break;
  }
}

console.log(`result`);
console.log(`Score   A : ${playerA.getScore()}, B : ${playerB.getScore()}`);
