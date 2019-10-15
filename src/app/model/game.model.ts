export enum Turn {
  PlayerOne = 'playerOne',
  PlayerTwo = 'playerTwo'
}

export enum GameOutcome {
  Win = 'win',
  Draw = 'draw',
  Continue = ''
}

export enum BoardName {
  One = 'boardOne',
  Two = 'boardTwo'
}

export interface GameStateModel {
  boardOne: Board;
  boardTwo: Board;
}

interface Board {
  cells: Array<[string, string]>;
  playerOneSymbol: string;
  playerTwoSymbol: string;
  winner: string;
  outcome: GameOutcome;
  turn: Turn;
}

export const initialGameState: GameStateModel = {
  boardOne: {
    cells: Array(9).fill(['', '']),
    playerOneSymbol: 'X',
    playerTwoSymbol: 'O',
    winner: null,
    outcome: null,
    turn: Turn.PlayerOne
  },
  boardTwo: {
    cells: Array(9).fill(['', '']),
    playerOneSymbol: 'O',
    playerTwoSymbol: 'X',
    winner: null,
    outcome: null,
    turn: Turn.PlayerTwo
  }
};





