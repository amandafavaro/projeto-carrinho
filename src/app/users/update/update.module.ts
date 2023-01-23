import { UpdateRoutingModule } from './update-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './../update/update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    UpdateRoutingModule
  ]
})

export class UpdateModule { }
