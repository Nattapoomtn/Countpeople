import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalPageModule } from './modal/modal/modal.module'

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';

// Components
import { IonicStorageModule } from '@ionic/storage'


import { Conf } from './conf/conf'
import { ProviderService } from './provider.service'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
let Server = Conf.Server
const config: SocketIoConfig = {
  url: Server.protocol + '://' + Server.host + ':' + Server.port,
  options: {}
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ModalPageModule,

    MbscModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    AppRoutingModule,

    ImagePageModule,
    SearchFilterPageModule,


  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProviderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
