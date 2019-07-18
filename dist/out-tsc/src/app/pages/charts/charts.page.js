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
import { ParamlocsService } from 'src/app/paramlocs.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
var ChartsPage = /** @class */ (function () {
    function ChartsPage(pramloc) {
        var _this = this;
        this.pramloc = pramloc;
        this.peakhour = [];
        this.lineChartData = [
            { data: [0, 1], label: 'Time/IN' },
            { data: [0], label: 'Time/OUT' }
        ];
        this.lineChartLabels = ['00:00'];
        this.lineChartOptions = {
            plugins: {
                datalabels: {
                    display: false,
                    color: '#000000',
                }
            },
            scaleShowVerticalLines: true,
            responsive: true,
            legend: { display: false },
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
                            max: 50,
                            min: 0,
                            stepSize: 10
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
        //pieChart//
        this.pieChartData = [34, 50];
        this.pieChartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
            responsive: true,
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    formatter: function (value, ctx) {
                        var sum = 0;
                        sum = _this.pieChartData[0] + _this.pieChartData[1];
                        var percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    color: '#00000',
                }
            }
        };
        this.pieChartLabels = [['In'], ['out']];
        this.pieChartType = 'pie';
        this.pieChartLegend = true;
        this.pieChartPlugins = [pluginDataLabels];
        this.pieChartColors = [
            {
                backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
            },
        ];
        this.ngOnInit();
        this.randomize();
    }
    // events
    ChartsPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ChartsPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ChartsPage.prototype.wait = function (ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    };
    ChartsPage.prototype.ngOnInit = function () {
        console.log("1234");
        console.log(this.pramloc.getExtras());
    };
    ChartsPage.prototype.randomize = function () {
        var _this = this;
        this.lineChartType = this.lineChartType === 'bar' ? 'line' : 'bar';
        console.log(this.pramloc.getExtras());
        this.data = this.pramloc.getExtras();
        console.log(this.data[0]);
        var i = 0;
        var inn = 0;
        var out = 0;
        var numPeak = 0;
        var clone = [];
        var cloneC = JSON.parse(JSON.stringify(this.lineChartData));
        var clonL = JSON.parse(JSON.stringify(this.lineChartLabels));
        clonL = [];
        cloneC[0].data = [];
        cloneC[1].data = [];
        this.data[0].time.forEach(function (num) {
            out = _this.data[0].out[i].Number + out;
            inn = _this.data[0].in[i].Number + inn;
            cloneC[0].data.push(_this.data[0].in[i].Number);
            cloneC[1].data.push(_this.data[0].out[i].Number);
            console.log(moment(num.time).format("HH:mm"));
            console.log(num.time);
            clonL.push(moment(num.time).format("HH:mm"));
            if (numPeak == _this.data[0].in[i].Number + _this.data[0].out[i].Number) {
                numPeak = _this.data[0].in[i].Number + _this.data[0].out[i].Number;
                _this.peakhour.push(num.time);
            }
            if (numPeak < _this.data[0].in[i].Number + _this.data[0].out[i].Number) {
                numPeak = _this.data[0].in[i].Number + _this.data[0].out[i].Number;
                _this.peakhour = clone;
                _this.peakhour[0] = num.time;
            }
            console.log(_this.data[0].in[i].Number + _this.data[0].out[i].Number);
            console.log(_this.peakhour);
            i++;
        });
        console.log(cloneC);
        console.log(clonL);
        this.lineChartData = cloneC;
        this.lineChartLabels = clonL;
        console.log("total" + "in" + inn + "out" + out);
        this.totalIn = inn;
        this.totalOut = out;
        console.log(this.peakhour);
    };
    ChartsPage.prototype.update = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    };
    ChartsPage = __decorate([
        Component({
            selector: 'app-charts',
            templateUrl: './charts.page.html',
            styleUrls: ['./charts.page.scss'],
        }),
        __metadata("design:paramtypes", [ParamlocsService])
    ], ChartsPage);
    return ChartsPage;
}());
export { ChartsPage };
//# sourceMappingURL=charts.page.js.map