import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<FromApp.AppState>
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        // console.log(authState);
        return authState.user;
      }),
      exhaustMap((user) => {
        // console.log(user);
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${user.token}`),
          // headers: req.headers.set(
          //   'Authorization',
          //   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIxZDRiYWNiM2VjMzkwNjE1YmNjYTIiLCJlbWFpbCI6ImRodmFuaXNoYWgyNjEyQGdtYWlsLmNvbSIsImlhdCI6MTY0NjgwNTA2NCwiZXhwIjoxNjQ2ODA4NjY0fQ.F0UlZi3qB8lgkEAaBaLr1Rpyr7uBGf05qWvU4I9LwMI`
          // ),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
