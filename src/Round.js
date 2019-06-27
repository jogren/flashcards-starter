const Turn = require('../src/Turn');
const Deck = require('../src/Deck');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
      return this.deck.cards[this.turns];
  }

  takeTurn(guess) {
    const turn = new Turn(guess, this.returnCurrentCard());
    if (!turn.evaluateGuess(turn.card)) {
      this.incorrectGuesses.push(turn.card.id)
    }
    this.turns++;
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    let result = this.turns - this.incorrectGuesses.length; 
    return result / this.turns * 100;
  }

  endRound() {
    let message = `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
    console.log(message);
  }
}

module.exports = Round;