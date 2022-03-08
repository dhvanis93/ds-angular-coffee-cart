import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../store/app.reducer';
import * as AuthACtions from './store/auth.actions';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpiratinTimer: any;
  constructor(private store: Store<FromApp.AppState>) {}

  // setLogoutTimer(expirationDuration: number, token: string) {
  //   this.tokenExpiratinTimer = setTimeout(() => {
  //     this.store.dispatch(new AuthACtions.Logout(token));
  //   }, expirationDuration);
  // }
  // clearLogoutTimer() {
  //   if (this.tokenExpiratinTimer) {
  //     clearTimeout(this.tokenExpiratinTimer);
  //     this.tokenExpiratinTimer = null;
  //   }
  // }
}
