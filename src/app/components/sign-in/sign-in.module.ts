import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in.component';

import { PlayersState } from '../../store/players/players.state';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgxsModule.forFeature([
      PlayersState
    ])
  ],
  declarations: [
    SignInComponent
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule {}
