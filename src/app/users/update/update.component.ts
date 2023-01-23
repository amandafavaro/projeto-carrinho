import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import UserDto from '../../models/UserDto';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  id: string = "";
  
  constructor(private userService: UsersService, private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.userService.returnUser(this.id).subscribe({
        next: (user) => {
          console.log(user);

          this.updateUserForm = this.formBuilder.group({
            name: user.name,
            email: user.email,
            role: user.role
          });
        },
        error: (error) => console.error(error)
      })
    }
  }

  updateUserForm = this.formBuilder.group({
    name: '',
    email: '',
    role: ''
  });

  onSubmit() {
    const user = new UserDto(
      this.updateUserForm.value.name ?? '',
      this.updateUserForm.value.email ?? '',
      this.updateUserForm.value.role ?? '',
      ''
    );

    if (this.id) {
      user._id = this.id;
      this.userService.updateUser(user).subscribe({next: (retorno) => this.route.navigate(["/home/users"])});
    } else {
      console.log('User update error.');
    }
  }
}
