import { PlayersStateModel } from '../../model/players.model';

export class SignIn {
  static readonly type = '[Players] SignIn';
  constructor(public players: PlayersStateModel) {}
}

export class SignInSuccess {
  static readonly type = '[Players] SignInSuccess';
}

export class ChangeName {
  static readonly type = '[Players] ChangeName';
  constructor(public player: string, public newName: string) {}
}
