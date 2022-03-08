import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as FromApp from '../../store/app.reducer';
import { Menu } from '../menu.model';
import * as SharedActions from './shared.actions';

const apiURL = environment.api_url;

@Injectable()
export class SharedEffects {
  menuFetch = createEffect(() => {
    return this.action$.pipe(
      ofType(SharedActions.FETCH_MENU),
      switchMap(() => {
        // console.log('here in effect');
        return this.http.get<Menu[]>(`${apiURL}menu`);
      }),
      map((menu) => {
        // console.log(menu);
        const modifiedMenu = menu.map((el) => {
          return {
            _id: el._id,
            name: el.name,
            price: el.price,
            ingredients: el.ingredients,
            quantity: 0,
            itemTotal: 0,
          };
        });
        return new SharedActions.SaveMenu(modifiedMenu);
      })
    );
  });

  menuPost = createEffect(() => {
    return this.action$.pipe(
      ofType(SharedActions.POST_MENU),
      switchMap((menuData: SharedActions.PostMenu) => {
        // console.log(menuData);
        return this.http.post<{
          message: string;
          data: {
            _id: string;
            name: string;
            price: number;
            ingredients: { name: string; quantity: number }[];
          };
        }>(`${apiURL}menu`, menuData.payload);
      }),
      map((resData) => {
        const modifiedMenu = {
          ...resData.data,
          quantity: 0,
          itemTotal: 0,
        };
        // console.log(modifiedMenu);
        return new SharedActions.AddMenu(modifiedMenu);
      })
    );
  });

  deleteMenu = createEffect(() => {
    return this.action$.pipe(
      ofType(SharedActions.DELETE_MENU),
      switchMap((deleteID: SharedActions.DeleteMenu) => {
        return this.http.delete(`${apiURL}menu/delete/${deleteID.payload}`);
      }),
      map(() => {
        return new SharedActions.FetchMenu();
      })
    );
  });

  editMenu = createEffect(() => {
    return this.action$.pipe(
      ofType(SharedActions.EDIT_MENU),
      switchMap((editMenu: SharedActions.EditMenu) => {
        return this.http.put(`${apiURL}menu/edit/${editMenu.payload.id}`, {
          ...editMenu.payload.menu,
        });
      }),
      map(() => {
        return new SharedActions.FetchMenu();
      })
    );
  });

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<FromApp.AppState>
  ) {}
}
