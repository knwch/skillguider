import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Signin, Signout } from './auth.action';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

export class AuthStateModel {
  token: string | null | any;
  username: string | null | any;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  },
})
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Signin)
  signin(ctx: StateContext<AuthStateModel>, action: Signin): any {
    return this.authService.signin(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          token: result?.userData?.accessToken,
          username: action.payload.username,
        });
      })
    );
  }

  @Action(Signout)
  signout(ctx: StateContext<AuthStateModel>): any {
    ctx.setState({
      token: null,
      username: null,
    });
  }

  // @Action(Signout)
  // signout(ctx: StateContext<AuthStateModel>): any {
  //   const state = ctx.getState();
  //   return this.authService.signout(state.token).pipe(
  //     tap(() => {
  //       ctx.setState({
  //         token: null,
  //         username: null,
  //       });
  //     })
  //   );
  // }
}
