import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Login';
export const AUTHENTICATION_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expiryDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;
  constructor(public payload: string) {}
}
export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | AuthenticationSuccess
  | Logout
  | LoginStart
  | AuthenticationFail
  | SignupStart
  | ClearError;
