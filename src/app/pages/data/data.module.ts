import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from 'ionic4-date-picker';
import { DataPage } from './data.page';

const routes: Routes = [
  {
    path: '',
    component: DataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DatePickerModule
    
  ],
  declarations: [DataPage]
})
export class DataPageModule {}
