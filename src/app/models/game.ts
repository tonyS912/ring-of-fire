export class Game {
  public players: string[] = [];
  public deck: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: string = '';

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.deck.push('ace_' + i);
      this.deck.push('hearts_' + i);
      this.deck.push('clubs_' + i);
      this.deck.push('diamonds_' + i);
    }

    shuffle(this.deck);

  }

  public toJSON() {
    return {
      players: this.players,
      deck: this.deck,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    };
  }
}

function shuffle(array: any) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
