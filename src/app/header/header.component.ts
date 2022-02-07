import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  cartSub: Subscription;
  totalCart: number;
  private userSub: Subscription;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.cartSub = this.store
      .select('menu')
      .pipe(map((cartState) => cartState.totalCart))
      .subscribe((totalCart) => (this.totalCart = totalCart));
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cartSub.unsubscribe()
  }
}
