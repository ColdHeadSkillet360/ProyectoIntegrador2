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
require("rxjs/Rx");
var CotizacionService = (function () {
    function CotizacionService(_http) {
        this._http = _http;
        this._ListarEstadosDocumentoUrl = "http://localhost:58020/api/cotizacion/ListarEstadosDocumento";
        this._BuscarCotizacionUrl = "http://localhost:58020/api/cotizacion/BuscarCotizacion";
        this._EliminarCotizacionUrl = "http://localhost:58020/api/cotizacion/EliminarCotizacion";
        this._AprobarCotizacionUrl = "http://localhost:58020/api/cotizacion/AprobarCotizacion";
        this._ObtenerDetalleCotizacionUrl = "http://localhost:58020/api/cotizacion/ObtenerDetalleCotizacion";
    }
    CotizacionService.prototype.ListarEstadosDocumento = function (TipoDocumento) {
        var req = this._http.get(this._ListarEstadosDocumentoUrl + '?TipoDocumento=' + TipoDocumento);
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    CotizacionService.prototype.BuscarCotizacion = function (fechaInicio, fechaFin, ruc_dni, nro_doc, estado_documento) {
        var f_inicio;
        var f_fin;
        var req;
        var cliente = "";
        if (ruc_dni !== "" && ruc_dni !== undefined) {
            if (ruc_dni.split("-")[1] !== undefined) {
                var ruc_dni_cliente = ruc_dni.split("-");
                cliente = ruc_dni_cliente[1].trim();
            }
        }
        if (typeof fechaInicio == "string") {
            req = this._http.get(this._BuscarCotizacionUrl + '?fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin + '&cliente=' + cliente + '&nro_doc=' + nro_doc + '&estado_documento=' + estado_documento);
        }
        else {
            Object.keys(fechaInicio).filter(function (key) {
                f_inicio = String(fechaInicio[key].day) + "/" + String(fechaInicio[key].month) + "/" + String(fechaInicio[key].year);
            });
            Object.keys(fechaFin).filter(function (key) {
                f_fin = String(fechaFin[key].day) + "/" + String(fechaFin[key].month) + "/" + String(fechaFin[key].year);
            });
            req = this._http.get(this._BuscarCotizacionUrl + '?fechaInicio=' + f_inicio + '&fechaFin=' + f_fin + '&cliente=' + cliente + '&nro_doc=' + nro_doc + '&estado_documento=' + estado_documento);
        }
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    CotizacionService.prototype.EliminarCotizacion = function (id_cliente) {
        var body = { id_cliente: id_cliente };
        var req = this._http.post(this._EliminarCotizacionUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    CotizacionService.prototype.AprobarCotizacion = function (str_ids) {
        var body = { ID_Ordenes: str_ids.toString() };
        console.log(body);
        var req = this._http.post(this._AprobarCotizacionUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    CotizacionService.prototype.ObtenerDetalleCotizacion = function (id) {
        console.log(id);
        var req = this._http.get(this._ObtenerDetalleCotizacionUrl + '?id_cotizacion_venta=' + id);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    CotizacionService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "server error");
    };
    return CotizacionService;
}());
CotizacionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CotizacionService);
exports.CotizacionService = CotizacionService;
//# sourceMappingURL=cotizacion.service.js.map