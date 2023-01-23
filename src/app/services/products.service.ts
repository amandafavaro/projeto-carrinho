import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addProduct = (product: Product) => this.http.post('http://localhost:5000/products', product, {headers: this.authService.buildHeaders()});

  listProducts = (): Observable<Product[]> => { return this.http.get<Product[]>('http://localhost:5000/products', {headers: this.authService.buildHeaders()});};

  returnProduct = (id: String) => this.http.get<Product>(`http://localhost:5000/products/${id}`, {headers: this.authService.buildHeaders()});

  updateProduct = (product: Product) => this.http.put(`http://localhost:5000/products/${product._id}`, product, {headers: this.authService.buildHeaders()});

  removeProduct = (id: string) => this.http.delete(`http://localhost:5000/products/${id}`, {headers: this.authService.buildHeaders()});

  searchProduct = (name: string): Observable<Product[]> => this.http.get<Product[]>(`http://localhost:5000/searchProduct?name=${name}`, {headers: this.authService.buildHeaders()});
}