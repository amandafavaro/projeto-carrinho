import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import User from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  id: string = "";
  
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
    
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.usersService.returnUser(this.id).subscribe({
        next: (user) => {
          console.log(user);

          this.registerForm = this.formBuilder.group({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role
          });
        },
        error: (error) => console.error(error)
      })
    }
  }

  registerForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  onSubmit() {
    const user = new User(
      this.registerForm.value.name ?? '',
      this.registerForm.value.email ?? '',
      this.registerForm.value.password ?? '',
      'client' ?? '',
      ''
    );

    if (!this.id) {
      this.usersService.addUser(user).subscribe((retorno) => {
        console.log(retorno);
        this.route.navigate(['/login']);
      });
    } else {
      console.log('User registration error.');
    }
  }
}
