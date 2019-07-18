var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Conf } from './conf/conf';
var ProviderService = /** @class */ (function () {
    function ProviderService(socket) {
        this.socket = socket;
        this.socket.connect();
    }
    ProviderService.prototype.read = function (collection, queries) {
        var _this = this;
        return Observable.create(function (observer) {
            var data = {
                collection: collection,
                queries: queries
            };
            _this.socket.emit('read', data, function (documents) {
                observer.next(documents);
                observer.complete();
            });
        });
    };
    ProviderService.prototype.readOne = function (collection, queries) {
        var _this = this;
        return Observable.create(function (observer) {
            var data = {
                collection: collection,
                queries: queries
            };
            _this.socket.emit('read_one', data, function (document) {
                observer.next(document);
                observer.complete();
            });
        });
    };
    ProviderService.prototype.readDatetime = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.socket.emit('read_datetime', {}, function (datetime) {
                observer.next(datetime);
                observer.complete();
            });
        });
    };
    ProviderService.prototype.create = function (collection, item) {
        var _this = this;
        return Observable.create(function (observer) {
            var data = {
                collection: collection,
                item: item
            };
            _this.socket.emit('create', data, function (_id) {
                observer.next(_id);
                observer.complete();
            });
        });
    };
    ProviderService.prototype.update = function (collection, item) {
        var _this = this;
        return Observable.create(function (observer) {
            var data = {
                collection: collection,
                query: {
                    _id: item._id
                },
                item: item
            };
            _this.socket.emit('update', data, function (updated) {
                observer.next(updated);
                observer.complete();
            });
        });
    };
    ProviderService.prototype.getOriginPath = function () {
        var server = Conf.Server;
        return server.protocol + '://' + server.host + ':' + server.port + '/';
    };
    ProviderService.prototype.submit = function (path) {
        var server = Conf.Server;
        var form = document.createElement("form");
        form.action = server.protocol + '://' + server.host + ':' + server.port + '/' + path;
        form.method = 'GET';
        form.target = '_blank';
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
    };
    ProviderService.prototype.notify = function (message) {
        // return Observable.create(observer => {
        //     let data = {
        //         token: Conf.token,
        //         message: message
        //     }
        //     this.socket.emit('notify', data, (notified) => {
        //         observer.next(notified)
        //         observer.complete()
        //     })
        // })
    };
    ProviderService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Socket])
    ], ProviderService);
    return ProviderService;
}());
export { ProviderService };
//# sourceMappingURL=provider.service.js.map