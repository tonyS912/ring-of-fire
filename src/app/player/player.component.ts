import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() name: string = '';  // <--- this is the name of the player alternatively name!: string;
  @Input() playerActive: boolean = false; // <--- this is the name of the player alternatively playerActive!: boolean;

}
