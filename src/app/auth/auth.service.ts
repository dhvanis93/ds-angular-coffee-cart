import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../store/app.reducer';
import * as AuthACtions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpiratinTimer: any;
  constructor(private store: Store<FromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpiratinTimer = setTimeout(() => {
      this.store.dispatch(new AuthACtions.Logout());
    }, expirationDuration);
  }
  clearLogoutTimer() {
    if (this.tokenExpiratinTimer) {
      clearTimeout(this.tokenExpiratinTimer);
      this.tokenExpiratinTimer = null;
    }
  }
}
