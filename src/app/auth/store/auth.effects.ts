import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const apiURL = environment.api_url;

export interface AuthResponseData {
  user: {
    email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: string;
  expiresIn: string;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expiryDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({
    email: email,
    userId: userId,
    token: token,
    expiryDate: expiryDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';
  // console.log(errorRes);
  if (!errorRes.error.message)
    return of(new AuthActions.AuthenticationFail(errorMessage));
  return of(new AuthActions.AuthenticationFail(errorRes.error.message));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(`${apiURL}auth/signup`, {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
          })
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(
                +resData.expiresIn * 1000,
                resData.token
              );
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.user.email,
                resData.user._id,
                resData.token
              );
            }),
            catchError((errorRes) => {
              // console.log(errorRes);
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
            .post<AuthResponseData>(`${apiURL}auth/login`, {
              email: authData.payload.email,
              password: authData.payload.password,
            })
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(
                  +resData.expiresIn * 1000,
                  resData.token
                );
              }),
              map((resData) => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.user.email,
                  resData.user._id,
                  resData.token
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
  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        //console.log(userData);
        if (!userData) return { type: 'DUMMY' };
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expiresIn =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expiresIn, loadedUser.token);
          //console.log('ere');
          //this.user.next(loadedUser);
          return new AuthActions.AuthenticationSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expiryDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
        //
        // this.autoLogout(expiresIn);
      })
    );
  });

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticationSuccess) => {
          if (authSuccessAction.payload.redirect) this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        switchMap((logoutData: AuthActions.Logout) => {
          return this.http
            .post(
              `${apiURL}auth/logout`,
              {},
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${logoutData.payload}`,
                }),
              }
            )
            .pipe(
              tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
              })
            );
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
