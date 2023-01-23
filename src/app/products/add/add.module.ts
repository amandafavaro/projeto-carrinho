import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './../add/add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoutingModule } from './add-routing.module';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddRoutingModule
  ]
})

export class AddModule { }
