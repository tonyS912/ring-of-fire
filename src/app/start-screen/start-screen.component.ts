import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { }


  newGame() {
    //console.log('new game');
    let game = new Game();

    const coll = collection(this.firestore, 'games');
    let gameInfo = addDoc(coll, {game: game.toJSON()}).then((gameStuff:any) => {
      //console.log(gameStuff.id);
      this.router.navigateByUrl('/game/' + gameStuff.id);
    }) // create a new game in the collection 'games' | setDoc updates the game

    //console.log(gameInfo);

    this.router.navigateByUrl('/game');
  }
}
