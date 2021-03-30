import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthState } from './auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const Authorization = `Bearer ${token}`;
    return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
  }
}
