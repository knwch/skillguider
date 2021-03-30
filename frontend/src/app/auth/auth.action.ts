import { Auth } from './auth.model';

export class Signin {
  static readonly type = '[Auth] Signin';
  constructor(public payload: Auth) {}
}

export class Signup {
  static readonly type = '[Auth] Signup';
  constructor(public payload: Auth) {}
}

export class Signout {
  static readonly type = '[Auth] Signout';
}
