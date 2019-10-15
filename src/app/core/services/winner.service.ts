import { Injectable } from '@angular/core';
import { GameOutcome } from 'src/app/model/game.model';

@Injectable()
export class WinnerService {

  constructor() { }

  checkWin(playerSymbol: string, cells: Array<[string, string]>): [GameOutcome, [number, number, number]] {
    const win = this._isWin(playerSymbol, cells);

    if (this._isWin(playerSymbol, cells) !== null) {
      return [GameOutcome.Win, win];
    }

    if (this._isDraw(cells)) {
      return [GameOutcome.Draw, null];
    }

    return [GameOutcome.Continue, null];
  }

  private _isWin(playerSymbol: string, cells: Array<[string, string]>): [number, number, number] {
    if ((cells[0][0] === cells[1][0] && cells[0][0] === cells[2][0] && (cells[0][0] === playerSymbol))) {
      return [0, 1, 2];
    }

    if (cells[3][0] === cells[4][0] && cells[3][0] === cells[5][0] && (cells[3][0] === playerSymbol)) {
      return [3, 4, 5];
    }

    if (cells[6][0] === cells[7][0] && cells[6][0] === cells[8][0] && (cells[6][0] === playerSymbol)) {
      return [6, 7, 8];
    }

    if (cells[0][0] === cells[3][0] && cells[0][0] === cells[6][0] && (cells[0][0] === playerSymbol)) {
      return [0, 3, 6];
    }

    if (cells[1][0] === cells[4][0] && cells[1][0] === cells[7][0] && (cells[1][0] === playerSymbol)) {
      return [1, 4, 7];
    }

    if (cells[2][0] === cells[5][0] && cells[2][0] === cells[8][0] && (cells[2][0] === playerSymbol)) {
      return [2, 5, 8];
    }

    if (cells[0][0] === cells[4][0] && cells[0][0] === cells[8][0] && (cells[0][0] === playerSymbol)) {
      return [0, 4, 8];
    }

    if (cells[2][0] === cells[4][0] && cells[2][0] === cells[6][0] && (cells[2][0] === playerSymbol)) {
      return [2, 4, 6];
    }

    return null;

  }

  private _isDraw(cells: Array<[string, string]>): boolean {
    return !cells.some(cell => cell[0] === '');
  }
}
