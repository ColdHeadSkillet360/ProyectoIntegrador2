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
var HomeConsignadorComponent = (function () {
    function HomeConsignadorComponent(_router) {
        this._router = _router;
    }
    HomeConsignadorComponent.prototype.salir = function () {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    };
    ///////GUIA REMISION//////////
    HomeConsignadorComponent.prototype.RegistrarGR = function () {
        this._router.navigate([{ outlets: { auxRegGR: ['registrarGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegGR").show();
    };
    HomeConsignadorComponent.prototype.ConsultarGR = function () {
        this._router.navigate([{ outlets: { auxConGR: ['consultarGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formConGR").show();
    };
    HomeConsignadorComponent.prototype.ReporteGR = function () {
        this._router.navigate([{ outlets: { auxRepGR: ['reporteGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formRepGR").show();
    };
    ///////VEHICULO//////////
    HomeConsignadorComponent.prototype.CrudVeh = function () {
        this._router.navigate([{ outlets: { auxCrudVeh: ['crudVeh'] } }]);
        $("div[name='container_view']").hide();
        $("#formCrudVeh").show();
    };
    return HomeConsignadorComponent;
}());
HomeConsignadorComponent = __decorate([
    core_1.Component({
        selector: 'my-home',
        templateUrl: './home.consignador.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HomeConsignadorComponent);
exports.HomeConsignadorComponent = HomeConsignadorComponent;
//# sourceMappingURL=home.consignador.component.js.map