import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(payload: Auth): any {
    return this.http.post<Auth>(`/api/auth/signin`, payload);
  }

  signup(payload: Auth): any {
    return this.http.post<Auth>(`/api/auth/signup`, payload);
  }

  signout(token: string): any {
    return this.http.get<Auth>(`/api/auth/signout`);
  }
}
