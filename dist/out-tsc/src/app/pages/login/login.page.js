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
import { FormBuilder } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ProviderService } from 'src/app/provider.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, provider) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.provider = provider;
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    // // //
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.navigateRoot('/register');
    };
    LoginPage.prototype.goToHome = function () {
        var _this = this;
        var userName = this.ID;
        var passWord = this.password;
        console.log(userName, passWord);
        this.provider.readOne("users", [
            {
                $lookup: {
                    from: "types",
                    localField: "types",
                    foreignField: "_id",
                    as: "type"
                }
            },
            {
                $unwind: "$type"
            },
            {
                $match: {
                    $and: [
                        {
                            username: userName
                        },
                        {
                            password: passWord
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: "$_id",
                    name: '$fname',
                    type: "$type.typeName"
                }
            }
        ])
            .subscribe(function (user) {
            console.log(user);
            // if(user!=null){
            _this.navCtrl.navigateRoot('/home-results');
            // }
            console.log("valid");
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder,
            ProviderService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map