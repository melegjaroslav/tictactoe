import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
// import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WinnerService } from '../../core/services/winner.service';

import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { StatsComponent } from './stats/stats.component';

import { GameState } from '../../store/game/game.state';

@NgModule({
  imports: [
    // ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgxsModule.forFeature([
      GameState
    ])
  ],
  providers: [ WinnerService ],
  declarations: [
    GameComponent,
    BoardComponent,
    StatsComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule {}
