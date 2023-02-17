import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { Game } from './../models/game';
import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collectionData, Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from '@firebase/firestore';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(private firestore: Firestore, public dialog: MatDialog) { }
  games!: Observable<any>;

  ngOnInit(): void {
    this.newGame();
    const coll = collection(this.firestore, 'games');
    this.games = collectionData(coll);

    this.games.subscribe( (games) => { // output the data in the console
      console.log('Game update: ', games);
    });
  }

  newGame() {
    this.game = new Game();
    const coll = collection(this.firestore, 'games');
    let gameInfo = addDoc(coll, {game: this.game.toJSON()}) // create a new game in the collection 'games' | setDoc updates the game
    console.log(gameInfo);
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.deck.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 3) {
      this.game.players.push(name);
      }
    });
  }
}
