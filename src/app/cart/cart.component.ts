import { Subscription } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, OnInit, NgModule } from '@angular/core';
import Product from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  subscription: Subscription;

  cart: Product[] = [];
  quantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.subscription = this.cartService.getClickEvent().subscribe(() => {
      this.getCart();
    })
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cart = JSON.parse(localStorage.getItem('x-cart') ?? '');
    this.quantity = JSON.parse(localStorage.getItem('x-quantity') ?? '');
    this.totalPrice = JSON.parse(localStorage.getItem('x-totalPrice') ?? '');
  }

  cleanCart(): void {
    this.cart = [];
    this.quantity = 0;
    this.totalPrice = 0;

    localStorage.setItem('x-cart', JSON.stringify(this.cart));
    localStorage.setItem('x-quantity', JSON.stringify(this.quantity));
    localStorage.setItem('x-totalPrice', JSON.stringify(this.totalPrice));
  }

  checkout(): void {
    if (this.quantity > 0) {
      this.cleanCart();
      alert('Obrigado pela compra!');
    } else {
      alert('O carrinho está vazio.');
    }
  }
}
