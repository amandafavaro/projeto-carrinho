import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})

export class CartModule { }
