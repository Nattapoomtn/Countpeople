import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { VideoPage } from './video.page';
import { DPlayerModule } from 'angular-dplayer';
import { AppComponent } from '../app.component';
const routes: Routes = [
  {
    path: '',
    component: VideoPage
  }
];

@NgModule({
  imports: [
    DPlayerModule.forRoot({
      screenshot: true,
      logo: 'favicon.ico',
      subtitle: {url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt'},
      danmaku: {id: 'demo', api: 'https://api.prprpr.me/dplayer3/'}
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
export class VideoPageModule {}
