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
var VehiculoService = (function () {
    function VehiculoService(_http) {
        this._http = _http;
        this._BuscarVehiculoUrl = "http://localhost:58020/api/vehiculo/BuscarVehiculo";
    }
    VehiculoService.prototype.BuscarVehiculo = function (id_transportista, filtro_descripcion) {
        var req;
        if (id_transportista == undefined) {
            id_transportista = 0;
        }
        else if (filtro_descripcion == 'undefined') {
            filtro_descripcion = '';
        }
        if (id_transportista != 0 && filtro_descripcion != '') {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=' + id_transportista + '&descripcion=' + filtro_descripcion);
        }
        else if (filtro_descripcion == '' && id_transportista != 0) {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=' + id_transportista + '&descripcion=');
        }
        else if (filtro_descripcion != '' && id_transportista == 0) {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=0&descripcion=' + filtro_descripcion);
        }
        else {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=0&descripcion=');
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    VehiculoService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "error al conectar con el servidor");
    };
    return VehiculoService;
}());
VehiculoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VehiculoService);
exports.VehiculoService = VehiculoService;
//# sourceMappingURL=vehiculo.service.js.map