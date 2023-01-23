import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Component, OnInit } from '@angular/core';
import Product from '../../models/Product';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  id: string = "";

  constructor(private productsService: ProductsService, private formBuilder: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.productsService.returnProduct(this.id).subscribe({
        next: (product) => {
          console.log(product);

          this.addForm = this.formBuilder.group({
            name: product.name,
            price: product.price
          });
        },
        error: (error) => console.error(error)
      })
    }
  }

  addForm = this.formBuilder.group({
    name: '',
    price: 0
  });

  onSubmit() {
    const product = new Product(
      this.addForm.value.name ?? '',
      this.addForm.value.price ?? 0,
      ''
    );

    if (!this.id) {
      this.productsService.addProduct(product).subscribe((retorno) => {
        console.log(retorno);
        this.route.navigate(['/home/products']);
      });
    } else {
      console.log('Product registration error.')
    }
  }
}
