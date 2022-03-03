import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as SharedActions from '../shared/store/shared.actions';
import * as OrderActions from '../order/store/order.actions';
import { map, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { User } from '../auth/user.model';

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
  user: User;
  constructor(
    private store: Store<FromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          this.user = authState.user;
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
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure do you want to Logout?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(new AuthActions.Logout(this.user.token));
        this.store.dispatch(new SharedActions.ClearState());
        this.store.dispatch(new OrderActions.ClearState());
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
