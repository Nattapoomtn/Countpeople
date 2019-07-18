import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes= [
  { path: 'home-results', loadChildren: '../pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'data', loadChildren: '../pages/data/data.module#DataPageModule' },
  { path: 'charts', loadChildren: '../pages/charts/charts.module#ChartsPageModule' },
  { path: 'mutichart', loadChildren: '../pages/mutichart/mutichart.module#MutichartPageModule' },
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
   
  
})
export class MemberRoutingModule { }
