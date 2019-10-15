import { BoardName } from '../../model/game.model';

export class UpdateCell {
  static readonly type = '[Game] UpdateCell';
  constructor(public board: BoardName, public cell: number) {}
}

export class ToggleTurn {
  static readonly type = '[Game] ToggleTurn';
  constructor(public board: BoardName) {}
}

export class IllegalMove {
  static readonly type = '[Game] IllegalMove';
  constructor(public board: BoardName, public cell: number) {}
}

export class ClearIllegal {
  static readonly type = '[Game] ClearIllegal';
  constructor(public board: BoardName, public cell: number) {}
}

export class CheckWin {
  static readonly type = '[Game] CheckWin';
  constructor(public board: BoardName, public playerSymbol: string, public cells: Array<[string, string]>) {}
}

export class ResetGame {
  static readonly type = '[Game] ResetGame';
}
