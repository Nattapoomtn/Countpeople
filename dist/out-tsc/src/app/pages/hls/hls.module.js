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
import { IonicModule } from '@ionic/angular';
import { DPlayerModule } from 'angular-dplayer';
import { HlsPage } from './hls.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
var routes = [
    {
        path: '',
        component: HlsPage
    }
];
var HlsPageModule = /** @class */ (function () {
    function HlsPageModule() {
    }
    HlsPageModule = __decorate([
        NgModule({
            providers: [StreamingMedia],
            imports: [
                DPlayerModule.forRoot({
                    autoplay: true // All player can autoplay by default
                }),
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                VgCoreModule,
                VgControlsModule,
                VgOverlayPlayModule,
                VgBufferingModule
            ],
            declarations: [HlsPage],
        })
    ], HlsPageModule);
    return HlsPageModule;
}());
export { HlsPageModule };
//# sourceMappingURL=hls.module.js.map