
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import User from '../models/User';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: User[] = [];
  hasError: boolean = false;
  searchUserField: FormControl = new FormControl();
  
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe({
      next: (response) => { this.users = response },
      error: (error) => { this.hasError = true }
    });

    this.searchUserField.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap((search => this.userService.searchUser(search)))).subscribe((users) => this.users = users);
  }

  remover(id: string): void {
    this.userService.removeUser(id).subscribe({
      next: (response) => { this.users = this.users.filter(user => user._id != id)}
    });
  }
}
