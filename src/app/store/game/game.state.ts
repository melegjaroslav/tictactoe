import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { WinnerService } from '../../core/services/winner.service';

import { GameStateModel, Turn, GameOutcome, BoardName, initialGameState } from '../../model/game.model';
import {
  UpdateCell,
  IllegalMove,
  ToggleTurn,
  CheckWin,
  ClearIllegal,
  ResetGame
} from './game.actions';


@State<GameStateModel>({
  name: 'game',
  defaults: {
    ...initialGameState
  }
})
export class GameState {
  constructor(
    private _winnerService : WinnerService
  ) {}

  /**
   * Selectors
   */
  @Selector()
  static getCells(state: GameStateModel) {
    return (board: BoardName) => {
      return state[board].cells;
    };
  }

  @Selector()
  static getPlayerOneSymbol(state: GameStateModel) {
    return (board: BoardName) => {
      return state[board].playerOneSymbol;
    };
  }

  @Selector()
  static getPlayerTwoSymbol(state: GameStateModel) {
    return (board: BoardName) => {
      return state[board].playerTwoSymbol;
    };
  }

  @Selector()
  static getTurn(state: GameStateModel) {
    return(board: BoardName) => {
      return state[board].turn;
    };
  }

  @Selector()
  static getWinner(state: GameStateModel) {
    return (board: BoardName) => {
      return state[board].winner;
    };
  }

  @Selector()
  static getOutcome(state: GameStateModel) {
    return (board: BoardName) => {
      return state[board].outcome;
    };
  }

  /**
   * Commands
   */
  @Action(ToggleTurn)
  toggleTurn({ patchState, getState }: StateContext<GameStateModel>, event: ToggleTurn) {
    const state = getState();
    const board = state[event.board];
    const oldTurn = state[event.board].turn;
    const newTurn = (oldTurn === Turn.PlayerOne) ? Turn.PlayerTwo : Turn.PlayerOne;
    patchState({
      ...state,
      [event.board]: {
        ...board,
        turn: newTurn
      }
    });
  }

  @Action(ClearIllegal)
  clearIllegal({ getState, patchState }: StateContext<GameStateModel>, event: ClearIllegal ) {
    const state = getState();

    const newCells = [...state[event.board].cells];
    newCells[event.cell][1] = '';

    patchState({
      [event.board]: {
        ...state[event.board],
        cells: newCells
      }
    });
  }

  @Action(ResetGame)
  resetBoard({ setState }: StateContext<GameStateModel>) {
    setState({
      ...initialGameState
    });
  }

  /**
   * Events
   */
  @Action(UpdateCell)
  onUpdateCell({ patchState, dispatch, getState }: StateContext<GameStateModel>, event: UpdateCell) {
    const state = getState();

    const outcome = state[event.board].outcome;

    if (outcome !== null && outcome !== GameOutcome.Continue) {
      return;
    }

    if (state[event.board].cells[event.cell][0] !== '') {
      return dispatch(new IllegalMove(event.board, event.cell));
    }

    const playerSymbol = (state[event.board].turn === Turn.PlayerOne)
      ? state[event.board].playerOneSymbol
      : state[event.board].playerTwoSymbol;

    const newCells = [...state[event.board].cells];
    newCells[event.cell] = [playerSymbol, ''];

    patchState({
    [event.board]: {
        ...state[event.board],
        cells: newCells
      }
    });

    dispatch(new CheckWin(event.board, state[event.board][state[event.board].turn + 'Symbol'], newCells));

    dispatch(new ToggleTurn(event.board));
  }

  @Action(CheckWin)
  onCheckWin({ getState, patchState }: StateContext<GameStateModel>, event: CheckWin) {
    const outcome = this._winnerService.checkWin(event.playerSymbol, event.cells);
    const state = getState();

    if (outcome[0] === GameOutcome.Win) {
      const newCells = [...state[event.board].cells];
      newCells[outcome[1][0]][1] = 'win';
      newCells[outcome[1][1]][1] = 'win';
      newCells[outcome[1][2]][1] = 'win';

      patchState({
        [event.board]: {
          ...state[event.board],
          cells: newCells,
          winner: state[event.board].turn,
          outcome: outcome[0]
        }
      });
    } else if (outcome[0] === GameOutcome.Draw) {
      patchState({
        [event.board]: {
          ...state[event.board],
          outcome: outcome[0]
        }
      });
    }
  }

  @Action(IllegalMove)
  onIllegalMove({ getState, patchState, dispatch }: StateContext<GameStateModel>, event: IllegalMove) {
    const state = getState();

    const newCells = [...state[event.board].cells];
    newCells[event.cell][1] = 'illegal';

    patchState({
      [event.board]: {
        ...state[event.board],
        cells: newCells
      }
    });

    observableOf(0).pipe(
      delay(2000)
    ).subscribe(() => {
      dispatch(new ClearIllegal(event.board, event.cell));
    });
  }
}
