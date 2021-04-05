import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(payload: Auth): any {
    return this.http.post<Auth>(
      `${environment.backendUrl}/auth/signin`,
      payload
    );
  }

  signup(payload: Auth): any {
    return this.http.post<Auth>(
      `${environment.backendUrl}/auth/signup`,
      payload
    );
  }

  signout(token: string): any {
    return this.http.get<Auth>(`${environment.backendUrl}/auth/signout`);
  }
}
