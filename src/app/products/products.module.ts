import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ]
})

export class ProductsModule { }
