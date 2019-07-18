import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PopmenuComponent } from './../../components/popmenu/popmenu.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HomeResultsPage } from './home-results.page';
import { ChartsModule } from 'ng2-charts'

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  providers: [
   
    InAppBrowser
  ],
  imports: [
    CommonModule,
    FormsModule,


    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [HomeResultsPage, PopmenuComponent] 
})
export class HomeResultsPageModule {}
