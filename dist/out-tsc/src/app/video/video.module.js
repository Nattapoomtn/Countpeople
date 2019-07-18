var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoPage } from './video.page';
import { DPlayerModule } from 'angular-dplayer';
var routes = [
    {
        path: '',
        component: VideoPage
    }
];
var VideoPageModule = /** @class */ (function () {
    function VideoPageModule() {
    }
    VideoPageModule = __decorate([
        NgModule({
            imports: [
                DPlayerModule.forRoot({
                    screenshot: true,
                    logo: 'favicon.ico',
                    subtitle: { url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt' },
                    danmaku: { id: 'demo', api: 'https://api.prprpr.me/dplayer3/' }
                }),
                BrowserModule,
                VgCoreModule,
                VgControlsModule,
                VgOverlayPlayModule,
                VgBufferingModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VideoPage],
            bootstrap: [VideoPage]
        })
    ], VideoPageModule);
    return VideoPageModule;
}());
export { VideoPageModule };
//# sourceMappingURL=video.module.js.map