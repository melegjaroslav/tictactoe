import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { SignIn } from '../../store/players/players.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  playersForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.playersForm = this._fb.group({
      playerOne: ['Player 1', Validators.required],
      playerTwo: ['Player 2', Validators.required]
    });
  }

  signIn(): void {
    if(this.playersForm.valid) {
      this._store.dispatch(new SignIn(this.playersForm.value));
    }
    else {
      Object.keys(this.playersForm.controls).map((controlName: string) => {
        this.playersForm.get(controlName).markAsTouched();
      });
    }
  }

}
