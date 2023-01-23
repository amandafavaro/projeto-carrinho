import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import User from '../models/User'
import UserDto from '../models/UserDto'

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addUser = (user: User) => this.http.post('http://localhost:5000/signup', user);

  listUsers = (): Observable<User[]> => this.http.get<User[]>('http://localhost:5000/users', {headers: this.authService.buildHeaders()});

  returnUser = (id: String) => this.http.get<User>(`http://localhost:5000/users/${id}`, {headers: this.authService.buildHeaders()});

  returnRole = (id: String) => this.http.get<String>(`http://localhost:5000/users/${id}`, {headers: this.authService.buildHeaders()});

  updateUser = (user: UserDto) => this.http.put(`http://localhost:5000/users/${user._id}`, user, {headers: this.authService.buildHeaders()});

  removeUser = (id: string) => this.http.delete(`http://localhost:5000/users/${id}`, {headers: this.authService.buildHeaders()});

  searchUser = (name: string): Observable<User[]> => this.http.get<User[]>(`http://localhost:5000/searchUser?name=${name}`, {headers: this.authService.buildHeaders()});
}
