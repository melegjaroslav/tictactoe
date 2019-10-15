import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { PlayersStateModel } from '../../model/players.model';

import {
  SignIn,
  SignInSuccess,
  ChangeName
} from './players.actions';

@State<PlayersStateModel>({
  name: 'players',
  defaults: {
    playerOne: 'Player 1',
    playerTwo: 'Player 2'
  }
})
export class PlayersState {
  constructor(
    private _store: Store
  ) {}

  /**
   * Selectors
  */
  @Selector()
  static getPlayerOne(state: PlayersStateModel) {
    return state.playerOne;
  }

  @Selector()
  static getPlayerTwo(state: PlayersStateModel) {
    return state.playerTwo;
  }

  /**
   * Events
   */
  @Action(SignIn)
  setPlayersOnSuccess({ patchState, dispatch }: StateContext<PlayersStateModel>, event: SignIn) {
    patchState({
      playerOne: event.players.playerOne,
      playerTwo: event.players.playerTwo
    });
    dispatch(new SignInSuccess());
  }

  @Action(SignInSuccess)
  onSignInSuccess({ dispatch }: StateContext<PlayersStateModel>) {
    dispatch(new Navigate(['/game']));
  }

  @Action(ChangeName)
  onChangeName({ patchState }: StateContext<PlayersStateModel>, event: ChangeName) {
    patchState({
      [event.player]: event.newName
    });
  }

}
