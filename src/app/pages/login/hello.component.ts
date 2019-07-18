import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <video id="video"></video>
  <script>
    if(Hls.isSupported()) {
      var video = document.getElementById('video');
      var hls = new Hls();
      hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
   }
  </script>
`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
