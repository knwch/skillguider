import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router, CanActivate } from '@angular/router';
import { AuthState } from './auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );

    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
    }

    return isAuthenticated;
  }
}
