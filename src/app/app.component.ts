import { Component, OnInit } from '@angular/core';
import * as FromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'menu-cart';
  constructor(private store: Store<FromApp.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
