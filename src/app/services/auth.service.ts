import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token = localStorage.getItem('token') ?? '';

  constructor(private router: Router, private http: HttpClient) {}

  buildHeaders = () =>
    new HttpHeaders().set('X-token', localStorage.getItem('token') ?? '');

  validateLogin = (token: string) =>
    this.http.post(
      'http://localhost:5000/validate', { token }, { headers: this.buildHeaders() }
  );

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  login = (email: string, password: string) =>
    this.http.post('http://localhost:5000/login', { email, password });

  logout = () => this.http.post('http://localhost:5000/logout', this.getToken());

  persistToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
