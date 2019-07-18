import { Component, OnInit } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-hls',
  templateUrl: './hls.page.html',
  styleUrls: ['./hls.page.scss'],
})
export class HlsPage implements OnInit {
  public types = [
    'MP4',
    'HLS',
    'DASH',
    'FLV'
  ];
  public eventLog = [];
  constructor(private streamingMedia: StreamingMedia) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    
    this.streamingMedia.playVideo('https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8', options);
   }

    

  ngOnInit() {
  }
  

}
