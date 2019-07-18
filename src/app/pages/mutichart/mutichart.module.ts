import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChartsModule} from 'ng2-charts'
import { MutichartPage } from './mutichart.page';

const routes: Routes = [
  {
    path: '',
    component: MutichartPage
  }
];

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MutichartPage]
})
export class MutichartPageModule {}
