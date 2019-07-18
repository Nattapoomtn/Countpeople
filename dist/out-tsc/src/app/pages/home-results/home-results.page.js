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
import { NavController, AlertController, MenuController, ToastController, PopoverController, ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as moment from 'moment';
import { ProviderService } from 'src/app/provider.service';
var HomeResultsPage = /** @class */ (function () {
    function HomeResultsPage(InAppBrowser, navCtrl, menuCtrl, popoverCtrl, alertCtrl, modalCtrl, toastCtrl, Provider) {
        this.InAppBrowser = InAppBrowser;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.Provider = Provider;
        this.testtime = "09.00";
        this.searchKey = '';
        this.yourLocation = '123 Test Street';
        this.test = 'assets/img/test.jpeg';
        this.lineChartData = [
            { data: [0, 2, 50], label: 'Time/IN' },
            { data: [0, 2, 50], label: 'Time/OUT' }
        ];
        this.lineChartLabels = ['00:00', "01:00", "02:00"];
        this.lineChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true,
            legend: { display: true },
            scales: {
                xAxes: [{
                        type: 'time',
                        time: {
                            format: "HH:mm",
                            unit: 'hour',
                            unitStepSize: 1,
                            displayFormats: {
                                'minute': 'HH:mm',
                                'hour': 'HH:mm',
                                min: '00:00',
                                max: '23:59'
                            },
                        }
                    }],
                yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Temp'
                        },
                        ticks: {
                            max: 300,
                            min: 0,
                            stepSize: 50
                        }
                    }]
            },
        };
        this.lineChartColours = [
            {
                backgroundColor: '#B3C1D9',
                borderColor: '#264E94',
                pointBackgroundColor: '#003082',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartType = 'line';
        this.check();
    }
    // events
    HomeResultsPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    HomeResultsPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    HomeResultsPage.prototype.wait = function (ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    };
    HomeResultsPage.prototype.playvideo = function () {
        // let browser = this.InAppBrowser.create('https://github.com/apache/cordova-plugin-inappbrowser', '_system');
        this.navCtrl.navigateForward('/video');
    };
    HomeResultsPage.prototype.increase = function () {
        var i = this.testtime.substring(0, 2);
        var y = +i;
        y += 1;
        i = y + ".00";
        this.testtime = i;
        console.log(this.lineChartLabels);
        console.log("*////////");
        var labeltime = this.lineChartLabels;
        labeltime.push(this.testtime);
        var clone;
        clone = JSON.parse(JSON.stringify(this.lineChartData));
        var random;
        random = this.randomInt(0, 3);
        clone[0].data.push(clone[0].data[clone[0].data.length - 1] + random);
        random = this.randomInt(0, 10);
        clone[1].data.push(clone[1].data[clone[1].data.length - 1] + random);
        this.lineChartData = clone;
        this.lineChartLabels = labeltime;
        console.log(this.lineChartData);
        console.log(this.lineChartLabels);
    };
    HomeResultsPage.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    HomeResultsPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(true);
    };
    HomeResultsPage.prototype.settings = function () {
        this.navCtrl.navigateForward('settings');
    };
    HomeResultsPage.prototype.randomize = function () {
        this.lineChartType = this.lineChartType === 'bar' ? 'line' : 'bar';
    };
    HomeResultsPage.prototype.check = function () {
        var _this = this;
        this.now = moment().format('YYYY-MM-DD');
        this.Provider.read("peopleCounting", [
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dayOfWeek: { $dayOfWeek: "$date" },
                    time: "$time",
                    in: "$in",
                    month: { $dateToString: { format: "%m", date: "$date" } },
                    out: "$out",
                    year: { $dateToString: { format: "%Y", date: "$date" } },
                    ISO: "$date"
                }
            },
            {
                $match: {
                    month: "this.now"
                }
            }
        ])
            .subscribe(function (date) {
            console.log(date);
            if (date.length == 0) {
                _this.createNowDate(_this.now);
            }
        });
    };
    HomeResultsPage.prototype.createNowDate = function (now) {
        console.log(moment(), moment.ISO_8601);
        // this.now = this.now+"'T00:00:00.000Z"
        var g = moment(this.now, moment.ISO_8601);
        var d = g.toDate;
        console.log(d);
        var date = { date: d, time: "sss"
        };
        console.log(date);
        this.Provider.create("users", date)
            .subscribe(function (date) {
            console.log(date);
        });
    };
    HomeResultsPage = __decorate([
        Component({
            selector: 'app-home-results',
            templateUrl: './home-results.page.html',
            styleUrls: ['./home-results.page.scss']
        }),
        __metadata("design:paramtypes", [InAppBrowser,
            NavController,
            MenuController,
            PopoverController,
            AlertController,
            ModalController,
            ToastController,
            ProviderService])
    ], HomeResultsPage);
    return HomeResultsPage;
}());
export { HomeResultsPage };
//# sourceMappingURL=home-results.page.js.map