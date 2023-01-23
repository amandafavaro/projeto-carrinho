import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartService();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (r) => {
        this.authService.deleteToken();
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        console.error("Logout error.", err);
      }
    });
  }

  isSeller(): boolean {
    const role = localStorage.getItem('x-role');
    if (role == 'seller') {
      return true;
    } else {
      return false;
    }
  }

  getCartService(): void {
    this.cartService.sendClickEvent();
  }
}
