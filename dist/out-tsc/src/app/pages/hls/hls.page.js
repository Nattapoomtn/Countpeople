var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
var HlsPage = /** @class */ (function () {
    function HlsPage(streamingMedia) {
        this.streamingMedia = streamingMedia;
        this.types = [
            'MP4',
            'HLS',
            'DASH',
            'FLV'
        ];
        this.eventLog = [];
        var options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming'); },
            orientation: 'landscape',
            shouldAutoClose: true,
            controls: false
        };
        this.streamingMedia.playVideo('https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8', options);
    }
    HlsPage.prototype.ngOnInit = function () {
    };
    HlsPage = __decorate([
        Component({
            selector: 'app-hls',
            templateUrl: './hls.page.html',
            styleUrls: ['./hls.page.scss'],
        }),
        __metadata("design:paramtypes", [StreamingMedia])
    ], HlsPage);
    return HlsPage;
}());
export { HlsPage };
//# sourceMappingURL=hls.page.js.map