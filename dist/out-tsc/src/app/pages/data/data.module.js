var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from 'ionic4-date-picker';
import { DataPage } from './data.page';
var routes = [
    {
        path: '',
        component: DataPage
    }
];
var DataPageModule = /** @class */ (function () {
    function DataPageModule() {
    }
    DataPageModule = __decorate([
        NgModule({
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
    ], DataPageModule);
    return DataPageModule;
}());
export { DataPageModule };
//# sourceMappingURL=data.module.js.map