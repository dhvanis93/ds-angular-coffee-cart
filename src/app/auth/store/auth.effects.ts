import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  localId: string,
  idToken: string
) => {
  const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, idToken, expiryDate);
  return new AuthActions.AuthenticationSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expiryDate: expiryDate,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';
  if (!errorRes.error || !errorRes.error.error)
    return of(new AuthActions.AuthenticationFail(errorMessage));
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist. Please Sign Up first!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is incorrect. Please enter valid password!';
      break;
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseApiKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authLogin = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseApiKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
              map((resData) => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),
              catchError((errorRes) => {
                return handleError(errorRes);
              })
            );
        })
      );
    }
    //{ dispatch: false }
  );

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
