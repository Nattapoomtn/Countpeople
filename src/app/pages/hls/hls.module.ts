import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DPlayerModule } from 'angular-dplayer';
import { HlsPage } from './hls.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
const routes: Routes = [
  {
    path: '',
    component: HlsPage
  }
];

@NgModule({
  providers:[StreamingMedia],
  imports: [
    DPlayerModule.forRoot({ // Global config
      autoplay: true      // All player can autoplay by default
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
export class HlsPageModule {}
