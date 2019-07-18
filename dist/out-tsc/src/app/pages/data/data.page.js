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
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ProviderService } from './../../provider.service';
import { ParamlocsService } from '../../paramlocs.service';
import { DataService } from '../../services/data.service';
var DataPage = /** @class */ (function () {
    function DataPage(modalCtrl, Provider, NavCtrl, Paramloc, loaddingCtrl, dataService) {
        this.modalCtrl = modalCtrl;
        this.Provider = Provider;
        this.NavCtrl = NavCtrl;
        this.Paramloc = Paramloc;
        this.loaddingCtrl = loaddingCtrl;
        this.dataService = dataService;
        this.search = '';
        this.searching = false;
        this.keyword = "";
        this.Select = [];
        this.searchControl = new FormControl();
        this.test();
        this.initializeItems();
    }
    DataPage.prototype.ngOnInit = function () {
    };
    DataPage.prototype.checkTrue = function (check) {
        this.Select.push(check);
        console.log(this.Select);
    };
    DataPage.prototype.checkfalse = function (check) {
        var _this = this;
        this.Select.forEach(function (item, index) {
            if (item._id === check._id)
                _this.Select.splice(index, 1);
        });
    };
    DataPage.prototype.check = function (check) {
        if (check.check == true)
            this.checkTrue(check);
        if (check.check == false)
            this.checkfalse(check);
    };
    DataPage.prototype.initializeItems = function () {
        this.items = this.dummy;
    };
    DataPage.prototype.getItems = function (ev) {
        var _this = this;
        // Reset items back to all of the items
        this.initializeItems();
        console.log(this.search);
        this.startD;
        this.endD;
        this.list = this.items.filter(function (item) {
            return _this.startD <= item.date && _this.endD >= item.date;
        });
        // if the value is an empty string don't filter the items
        if (this.search && this.search.trim() != '') {
            this.list = this.items.filter(function (item) {
                return (item.date.toLowerCase().indexOf(_this.search.toLowerCase()) > -1) ||
                    (item.nDayOfWeek.toLowerCase().indexOf(_this.search.toLowerCase()) > -1);
            });
        }
    };
    DataPage.prototype.test = function () {
        var _this = this;
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
                }
            },
            {
                $project: {
                    date: "$date",
                    time: "$time",
                    month: "$month",
                    year: "$year",
                    in: "$in",
                    out: "$out",
                    numDay: "$dayOfWeek",
                    nDayOfWeek: {
                        $switch: {
                            branches: [
                                {
                                    "case": { $eq: ["$dayOfWeek", 1] },
                                    then: 'Sunday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 2] },
                                    then: 'Monday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 3] },
                                    then: 'Tuesday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 4] },
                                    then: 'Wednesday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 5] },
                                    then: 'Thursday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 6] },
                                    then: 'Friday'
                                },
                                {
                                    "case": { $eq: ["$dayOfWeek", 7] },
                                    then: 'Saturday'
                                },
                            ],
                            default: "No scores found."
                        }
                    }
                }
            },
            {
                $sort: { date: -1 }
            }
        ])
            .subscribe(function (date) {
            date.forEach(function (element) {
                element.check = false;
            });
            _this.dummy = date;
            _this.list = date;
            console.log(date);
            _this.endD = date[0].date;
            _this.maxD = _this.endD;
            var i = date.length;
            _this.startD = date[i - 1].date;
            _this.minD = _this.startD;
            console.log(_this.minD);
            console.log(_this.maxD);
        });
    };
    DataPage.prototype.editTable = function () {
        this.Select = this.Select.sort(function (obj1, obj2) {
            if (obj1.year > obj2.year) {
                return 1;
            }
            if (obj1.year < obj2.year) {
                return -1;
            }
            return 0;
        });
        if (this.Select.length != 0) {
            // this.Select[0].in.push({time:"SSSS"})x
            if (this.Select.length == 1) {
                console.log(this.Select);
                this.Paramloc.setExtras(this.Select);
                this.NavCtrl.navigateForward('/charts');
                console.log("sss");
            }
            else {
                this.Paramloc.setExtras(this.Select);
                this.NavCtrl.navigateForward('/mutichart');
            }
        }
        else {
            console.log("please select");
        }
    };
    DataPage = __decorate([
        Component({
            selector: 'app-data',
            templateUrl: './data.page.html',
            styleUrls: ['./data.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            ProviderService,
            NavController,
            ParamlocsService,
            LoadingController,
            DataService])
    ], DataPage);
    return DataPage;
}());
export { DataPage };
//   presentLoadingBubbles() {
//   let loading = this.loaddingCtrl.create({
//       showBackdrop: true,
//     duration: 500
//   });
//   loading.present();
// }
//# sourceMappingURL=data.page.js.map