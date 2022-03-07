import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Menu } from '../shared/menu.model';

import * as FromApp from '../store/app.reducer';
import * as SharedActions from '../shared/store/shared.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MenuAddComponent } from './menu-add/menu-add.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menu: Observable<{ menu: Menu[] }>;
  totalCart: number;
  userSubscription: Subscription;
  isAdmin = false;
  // isOpen = true;
  // counter = 0;
  constructor(
    private store: Store<FromApp.AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.menu = this.store.select('menu');
    this.store.dispatch(new SharedActions.FetchMenu());
    this.userSubscription = this.store.select('auth').subscribe((authData) => {
      // console.log(authData);
      if (authData.user?.role === 'admin') this.isAdmin = true;
    });
    // this.menuSubscription = this.menu.subscribe((data) => {
    //   // console.log(data.menu.length);
    //   if (data.menu.length == 0) {
    //     this.store.dispatch(new SharedActions.FetchMenu());
    //   }
    // });
  }
  showSnackBar() {
    this.snackBar.open('Cart is updated!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
  onDecrease(index: number, quantity: number) {
    if (quantity > 0) {
      //this.isOpen = true;
      this.store.dispatch(new SharedActions.DecrementCount(index));
      this.showSnackBar();
    }
  }

  onIncrease(index: number) {
    // this.isOpen = true;
    // this.counter++;
    //if (this.counter % 3 == 1 && this.counter != 1) this.isOpen = false;
    this.store.dispatch(new SharedActions.IncrementCount(index));
    this.showSnackBar();
  }
  // onClose() {
  //   this.isOpen = false;
  // }
  // onAdd() {
  //   this.isOpen = true;
  //   this.store.dispatch(new SharedActions.IncrementCount(9));
  // }

  onAddMenu() {
    const dialogRef = this.dialog.open(MenuAddComponent, { width: '80%' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Menu is added!');
        // console.log(result);
        this.store.dispatch(new SharedActions.PostMenu(result));
      }
    });
  }

  ngOnDestroy(): void {
    // this.menuSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
