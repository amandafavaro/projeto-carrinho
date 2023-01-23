import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import Product from '../models/Product';
import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  hasError: boolean = false;
  searchProductField: FormControl = new FormControl();

  cart: Product[] = [];
  quantity: number = 0;
  totalPrice: number = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('x-cart') ?? '');
    this.quantity = JSON.parse(localStorage.getItem('x-quantity') ?? '');
    this.totalPrice = JSON.parse(localStorage.getItem('x-totalPrice') ?? '');

    this.productService.listProducts().subscribe({
      next: (response) => { this.products = response },
      error: (error) => { this.hasError = true }
    });

    this.searchProductField.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap((search => this.productService.searchProduct(search)))).subscribe((products) => this.products = products);
  }

  remover(id: string): void {
    this.productService.removeProduct(id).subscribe({
      next: (response) => { this.products = this.products.filter(product => product._id != id)}
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

  addProductCart(product: Product): void {
    this.cart.push(product);
    this.quantity++;
    this.totalPrice += product.price;

    localStorage.setItem('x-cart', JSON.stringify(this.cart));
    localStorage.setItem('x-quantity', JSON.stringify(this.quantity));
    localStorage.setItem('x-totalPrice', JSON.stringify(this.totalPrice));
  }
}