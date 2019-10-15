import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { GameOutcome, Turn } from 'src/app/model/game.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit {

  @Input() turn            = '';
  @Input() playerOne       = '';
  @Input() playerTwo       = '';
  @Input() playerOneSymbol = '';
  @Input() playerTwoSymbol = '';
  @Input() outcome         = '';
  @Input() winner          = '';

  players: { playerOne: string, playerTwo: string };

  constructor() { }

  ngOnInit(): void {
    this.players = {
      playerOne: this.playerOne,
      playerTwo: this.playerTwo
    };
  }

  getWinner(): string {
    return this.players[this.winner];
  }

  getTurn(): string {
    return this.players[this.turn];
  }

}
