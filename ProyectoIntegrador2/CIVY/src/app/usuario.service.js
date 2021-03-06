"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var UsuarioService = (function () {
    function UsuarioService(_http) {
        this._http = _http;
        this._LoginUrl = "http://localhost:58020/api/usuario/Login";
        this.usuario = null;
    }
    UsuarioService.prototype.Ingresar = function (usuario) {
        var _this = this;
        //definir el objeto tipo request
        var body = {
            usuario: usuario.usuario,
            contrasena: usuario.contrasena
        };
        var req = this._http.post(this._LoginUrl, body);
        //mapeo de datos en el post 'REQ'
        return req.map(function (respone) { return respone.json(); })
            .do(function (data) { return _this.usuario = data; })
            .catch(this.handleError);
    };
    UsuarioService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "server error");
    };
    return UsuarioService;
}());
UsuarioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map