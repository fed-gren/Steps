module.exports = class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score += score;
    // console.log(`${this.name}의 점수는 ${this.score}입니다.`);
    return this.score;
  }
}