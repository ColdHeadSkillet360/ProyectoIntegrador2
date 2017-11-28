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
var HomeAdminComponent = (function () {
    function HomeAdminComponent(_router) {
        this._router = _router;
    }
    HomeAdminComponent.prototype.Salir = function () {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    };
    HomeAdminComponent.prototype.Empleado = function () {
        this._router.navigate([{ outlets: { auxEmpleado: ['empleado'] } }]);
        $("#formEmpleado").show();
        $("#formCliente").hide();
    };
    HomeAdminComponent.prototype.Cliente = function () {
        this._router.navigate([{ outlets: { auxCliente: ['cliente'] } }]);
        $("#formEmpleado").hide();
        $("#formCliente").show();
    };
    return HomeAdminComponent;
}());
HomeAdminComponent = __decorate([
    core_1.Component({
        templateUrl: './home.admin.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HomeAdminComponent);
exports.HomeAdminComponent = HomeAdminComponent;
//# sourceMappingURL=home.admin.component.js.map