import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { Game } from './../models/game';
import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  collectionData,
  Firestore,
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  gameId!: string; //! current game id

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      //console.log(params['id']);

      this.gameId = params['id']; //set the current game id

      let docRef = doc(collection(this.firestore, 'games'), this.gameId);
      let game$ = docData(docRef);
      game$.subscribe((game:any) => {
        //console.log(game);
        this.game.currentPlayer = game.game.currentPlayer;
        this.game.deck = game.game.deck;
        this.game.playedCards = game.game.playedCards;
        this.game.players = game.game.players;
        console.log(game.game);
      });
    });
  }

  log() {
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();

  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.deck.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
        this.updateGame();
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.updateGame();
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    console.log(this.game);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 3) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }

  updateGame() {
    let docRef = doc(collection(this.firestore, 'games'), this.gameId);
    let game$ = docData(docRef);
    updateDoc(docRef, {game: this.game.toJSON()});
  }
}
