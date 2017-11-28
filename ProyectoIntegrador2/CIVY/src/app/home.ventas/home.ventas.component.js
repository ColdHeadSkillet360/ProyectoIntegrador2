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
var router_1 = require("@angular/router");
//TEMPLATE
var HomeVentasComponent = (function () {
    function HomeVentasComponent(_router) {
        this._router = _router;
    }
    HomeVentasComponent.prototype.Salir = function () {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    };
    ///////////COTIZACION///////////
    HomeVentasComponent.prototype.RegistrarCO = function () {
        this._router.navigate([{ outlets: { auxRegCot: ['registrarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegCot").show();
    };
    HomeVentasComponent.prototype.ConsultarCO = function () {
        this._router.navigate([{ outlets: { auxConCot: ['consultarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formConCot").show();
    };
    HomeVentasComponent.prototype.AprobarCO = function () {
        this._router.navigate([{ outlets: { auxApbCot: ['aprobarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formApbCot").show();
    };
    ///////DOCUMENTO VENTA//////////
    HomeVentasComponent.prototype.RegistrarDV = function () {
        this._router.navigate([{ outlets: { auxRegDV: ['registrarDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegDV").show();
    };
    HomeVentasComponent.prototype.ConsultarDV = function () {
        this._router.navigate([{ outlets: { auxConDV: ['consultarDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formConDV").show();
    };
    HomeVentasComponent.prototype.ReporteDV = function () {
        this._router.navigate([{ outlets: { auxRepDV: ['reporteDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formRepDV").show();
    };
    return HomeVentasComponent;
}());
HomeVentasComponent = __decorate([
    core_1.Component({
        selector: 'my-home',
        templateUrl: './home.ventas.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HomeVentasComponent);
exports.HomeVentasComponent = HomeVentasComponent;
//# sourceMappingURL=home.ventas.component.js.map