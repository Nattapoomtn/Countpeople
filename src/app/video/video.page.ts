import { Component, OnInit } from '@angular/core';
import { DPlayerService } from 'angular-dplayer';



@Component({
  selector: 'app-video',
  template: `./video.page.html`,
  styleUrls: ['video.page.scss'],

})
export class VideoPage implements OnInit {
  public types = [
    'MP4',
    'HLS',
    'DASH',
    'FLV'
  ];
  public eventLog = [];


  constructor(private DPService: DPlayerService) { 

  }

  ngOnInit() {

  }
 
 
}
