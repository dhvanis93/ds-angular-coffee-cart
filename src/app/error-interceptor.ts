import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import * as AuthActions from './auth/store/auth.actions';
import * as FromApp from './store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private store: Store<FromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        let errorMessage = 'An Unknown Error Occured!';
        if (error.error.message) errorMessage = error.error.message;
        this.dialog.open(ErrorComponent, {
          data: {
            message: errorMessage,
          },
        });
        if (error.status === 401) {
          this.store.dispatch(new AuthActions.TokenLogout());
        }
        // if (error.url.includes('login') || error.url.includes('signup')) {
        //   this.store.dispatch(new AuthACtions.AuthenticationFail(errorMessage));
        // }
        return throwError(() => error);
      })
    );
  }
}
