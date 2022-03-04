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
      map((menu) => new SharedActions.SaveMenu(menu))
    );
  });
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<FromApp.AppState>
  ) {}
}
