import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChartsModule} from 'ng2-charts'
import { ChartsPage } from './charts.page';
import * as moment from 'moment'
const routes: Routes = [
  {
    path: '',
    component: ChartsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule,
    
  ],
  declarations: [ChartsPage]
})
export class ChartsPageModule {}
