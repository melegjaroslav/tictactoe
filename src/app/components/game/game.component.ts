import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { BoardName, GameOutcome } from 'src/app/model/game.model';

import { PlayersState } from '../../store/players/players.state';
import { GameState } from '../../store/game/game.state';

import { UpdateCell, ResetGame } from '../../store/game/game.actions';
import { ChangeName } from '../../store/players/players.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy, AfterViewInit {

  @Select(PlayersState.getPlayerOne)
  playerOne$: Observable<string>;

  @Select(PlayersState.getPlayerTwo)
  playerTwo$: Observable<string>;

  @Select(GameState.getCells)
  cells$: Observable<(board: BoardName) => string[]>;

  @Select(GameState.getTurn)
  turn$: Observable<(board: BoardName) => string>;

  @Select(GameState.getPlayerOneSymbol)
  playerOneSymbol$: Observable<(board: BoardName) => string>;

  @Select(GameState.getPlayerTwoSymbol)
  playerTwoSymbol$: Observable<(board: BoardName) => string>;

  @Select(GameState.getWinner)
  winner$: Observable<(board: BoardName) => string>;

  @Select(GameState.getOutcome)
  outcome$: Observable<(board: BoardName) => GameOutcome>;

  get boardOneCells$(): Observable<string[]> {
    return this.cells$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardOneTurn$(): Observable<string> {
    return this.turn$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardOnePlayerOneSymbol$(): Observable<string> {
    return this.playerOneSymbol$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardOnePlayerTwoSymbol$(): Observable<string> {
    return this.playerTwoSymbol$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardOneWinner$(): Observable<string> {
    return this.winner$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardOneOutcome$(): Observable<GameOutcome> {
    return this.outcome$.pipe(map(fn => fn(BoardName.One)));
  }

  get boardTwoCells$(): Observable<string[]> {
    return this.cells$.pipe(map(fn => fn(BoardName.Two)));
  }

  get boardTwoTurn$(): Observable<string> {
    return this.turn$.pipe(map(fn => fn(BoardName.Two)));
  }

  get boardTwoPlayerOneSymbol$(): Observable<string> {
    return this.playerOneSymbol$.pipe(map(fn => fn(BoardName.Two)));
  }

  get boardTwoPlayerTwoSymbol$(): Observable<string> {
    return this.playerTwoSymbol$.pipe(map(fn => fn(BoardName.Two)));
  }

  get boardTwoWinner$(): Observable<string> {
    return this.winner$.pipe(map(fn => fn(BoardName.Two)));
  }

  get boardTwoOutcome$(): Observable<GameOutcome> {
    return this.outcome$.pipe(map(fn => fn(BoardName.Two)));
  }

  @ViewChild('playerOneRef', { static: false }) playerOneRef: ElementRef;
  @ViewChild('playerTwoRef', { static: false }) playerTwoRef: ElementRef;

  isBoardTwoEnabled = false;

  private _playerOneSub: Subscription;
  private _playerTwoSub: Subscription;

  constructor(private _store: Store) { }

  ngAfterViewInit(): void {
    this._playerOneSub = observableFromEvent(this.playerOneRef.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(name => this._store.dispatch(new ChangeName('playerOne', name)));

    this._playerTwoSub = observableFromEvent(this.playerTwoRef.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(name => this._store.dispatch(new ChangeName('playerTwo', name)));
  }

  onCellSelect(board: BoardName, cell: number): void {
    this._store.dispatch(new UpdateCell(board, cell));
  }

  resetGame(): void {
    this._store.dispatch(new ResetGame());
  }

  toggleBoardTwo(): void {
    this.isBoardTwoEnabled = !this.isBoardTwoEnabled;
  }

  ngOnDestroy(): void {
    if (this._playerOneSub) {
      this._playerOneSub.unsubscribe();
    }

    if (this._playerTwoSub) {
      this._playerTwoSub.unsubscribe();
    }
  }
}
