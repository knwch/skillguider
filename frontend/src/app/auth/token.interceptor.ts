import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthState } from './auth.state';
import { catchError, tap } from 'rxjs/operators';
import { Signout } from './auth.action';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const Authorization = `Bearer ${token}`;
    return next
      .handle(httpRequest.clone({ setHeaders: { Authorization } }))
      .pipe(
        catchError((error) => {
          console.log('dash', error);
          if (error.status === 401) {
            this.store.dispatch(new Signout()).subscribe(() => {
              this.router.navigate(['/auth']);
            });
          }
          return throwError(error);
        })
      );
  }
}
