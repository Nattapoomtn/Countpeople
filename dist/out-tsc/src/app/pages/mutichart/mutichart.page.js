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
var MutichartPage = /** @class */ (function () {
    function MutichartPage(pramloc) {
        var _this = this;
        this.pramloc = pramloc;
        this.data = [];
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
        this.barChartOptions = {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: { xAxes: [{}], yAxes: [{}] },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                }
            }
        };
        this.barChartLabels = ['20012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartPlugins = [pluginDataLabels];
        this.barChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
            { data: [0, 0, 20, 0, 0, 0, 0], label: 'Out' }
        ];
        this.data = this.pramloc.getExtras();
        console.log(this.data);
    }
    MutichartPage.prototype.ngOnInit = function () {
        this.dSelect = "Days";
        this.segmentChanged("Days");
    };
    MutichartPage.prototype.segmentChanged = function (select) {
        console.log(select);
        if (select == "Days") {
            this.days();
        }
        else if (select == "Months") {
            this.month();
        }
        else {
            this.years();
        }
    };
    MutichartPage.prototype.days = function () {
        var tempIn = [0, 0, 0, 0, 0, 0, 0];
        var tempOut = [0, 0, 0, 0, 0, 0, 0];
        var countIn, countOut;
        this.clone = JSON.parse(JSON.stringify(this.barChartData));
        this.clone = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
        ];
        console.log(this.clone);
        this.barChartData = this.clone;
        this.barChartLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.data.forEach(function (element, j) {
            console.log(j);
            countIn = 0;
            countOut = 0;
            element.time.forEach(function (num, i) {
                countIn = element.in[i].Number + countIn;
                countOut = element.in[i].Number + countOut;
            });
            console.log(countIn);
            tempIn[element.numDay - 1] += countIn;
            tempOut[element.numDay - 1] += countOut;
            // this.clone[0].data[element.numDay-1] += countIn
            // this.clone[1].data[element.numDay-1] += countOut
        });
        this.clone[0].data = tempIn;
        this.clone[1].data = tempOut;
        console.log(this.clone);
        this.barChartData = this.clone;
        console.log(this.barChartOptions);
    };
    MutichartPage.prototype.month = function () {
        this.barChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var tempIn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var tempOut = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var countIn, countOut;
        this.cloneM = JSON.parse(JSON.stringify(this.barChartData));
        this.cloneM = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
        ];
        this.data.forEach(function (element, j) {
            console.log(j);
            countIn = 0;
            countOut = 0;
            element.time.forEach(function (num, i) {
                countIn = element.in[i].Number + countIn;
                countOut = element.in[i].Number + countOut;
            });
            console.log(countIn);
            var x = +element.month - 1;
            tempIn[x] += countIn;
            tempOut[x] += countOut;
            // this.clone[0].data[element.numDay-1] += countIn
            // this.clone[1].data[element.numDay-1] += countOut
        });
        this.cloneM[0].data = tempIn;
        this.cloneM[1].data = tempOut;
        console.log(this.cloneM);
        this.barChartData = this.cloneM;
        console.log(this.barChartOptions);
    };
    MutichartPage.prototype.years = function () {
        this.barChartLabels = ["2015"];
        var tempIn = [0];
        var tempOut = [0];
        var countIn, countOut;
        var year = [];
        var tempY = [];
        var compare;
        this.cloneY = [
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'In' },
            { data: [0, 0, 0, 0, 0, 0, 0], label: 'Out' }
        ];
        this.data.forEach(function (element, j) {
            console.log(element.year);
            year.push(element.year);
        });
        year = year.sort();
        console.log(year);
        var j = 0;
        year.forEach(function (year, i) {
            console.log(year);
            if (i == 0) {
                tempY.push(year);
            }
            if (i > 0) {
                if (tempY[j] != year) {
                    tempY.push(year);
                    tempIn.push(0);
                    tempOut.push(0);
                    j++;
                }
            }
        });
        console.log(tempY);
        this.barChartLabels = tempY;
        j = 0;
        this.data.forEach(function (element, i) {
            countIn = 0;
            countOut = 0;
            console.log(i);
            if (i == 0) {
                compare = element.year;
            }
            if (compare != element.year) {
                console.log(compare);
                console.log(element.year);
                compare = element.year;
                j++;
            }
            element.in.forEach(function (num) {
                countIn += num.Number;
                countOut += num.Number;
            });
            tempIn[j] += countIn;
            tempOut[j] += countOut;
        });
        this.cloneY[0].data = tempIn;
        this.cloneY[1].data = tempOut;
        this.barChartData = this.cloneY;
    };
    MutichartPage = __decorate([
        Component({
            selector: 'app-mutichart',
            templateUrl: './mutichart.page.html',
            styleUrls: ['./mutichart.page.scss'],
        }),
        __metadata("design:paramtypes", [ParamlocsService])
    ], MutichartPage);
    return MutichartPage;
}());
export { MutichartPage };
//# sourceMappingURL=mutichart.page.js.map