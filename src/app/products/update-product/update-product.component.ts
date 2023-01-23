import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Product from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {
  id: string = "";
  
  constructor(private productsService: ProductsService, private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.productsService.returnProduct(this.id).subscribe({
        next: (product) => {
          console.log(product);

          this.updateProductForm = this.formBuilder.group({
            name: product.name,
            price: product.price
          });
        },
        error: (error) => console.error(error)
      })
    }
  }

  updateProductForm = this.formBuilder.group({
    name: '',
    price: 0
  });

  onSubmit() {
    const product = new Product(
      this.updateProductForm.value.name ?? '',
      this.updateProductForm.value.price ?? 0,
      ''
    );

    if (this.id) {
      product._id = this.id;
      this.productsService.updateProduct(product).subscribe({next: (retorno) => this.route.navigate(['/home/products'])});
    } else {
      console.log('Product update error.');
    }
  }
}
