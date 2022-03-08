import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Login';
export const AUTHENTICATION_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const TOKEN_LOGOUT = '[Auth] Token Logout';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      role: string;
      expiryDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class TokenLogout implements Action {
  readonly type = TOKEN_LOGOUT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: string) {}
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
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticationSuccess
  | Logout
  | LoginStart
  | AuthenticationFail
  | SignupStart
  | ClearError
  | AutoLogin
  | TokenLogout;
