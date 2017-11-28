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
var ClienteService = (function () {
    function ClienteService(_http) {
        this._http = _http;
        this._ListarTipoClienteUrl = "http://localhost:58020/api/cliente/ListarTipoCliente";
        this._ListarEstadoUrl = "http://localhost:58020/api/cliente/ListarEstado";
        /**api cliente natural**/
        this._BuscarClienteUrl = "http://localhost:58020/api/cliente/BuscarCliente";
        this._RegistrarClienteUrl = "http://localhost:58020/api/cliente/RegistrarCliente";
        this._EditarClienteUrl = "http://localhost:58020/api/cliente/EditarCliente";
        this._EliminarClienteUrl = "http://localhost:58020/api/cliente/EliminarCliente";
        this._ObtenerClienteUrl = "http://localhost:58020/api/cliente/ObtenerCliente";
        /**api cliente juridico**/
        this._RegistrarJuridicoUrl = "http://localhost:58020/api/cliente/RegistrarJuridico";
        this._BuscarJuridicoUrl = "http://localhost:58020/api/cliente/BuscarClienteJuridico";
        this._EditarJuridicoUrl = "http://localhost:58020/api/cliente/EditarClienteJuridico";
        this._EliminarJuridicoUrl = "http://localhost:58020/api/cliente/EliminarClienteJuridico";
        this._ObtenerJuridicoUrl = "http://localhost:58020/api/cliente/ObtenerClienteJuridico";
        this._AutocompleteClienteUrl = "http://localhost:58020/api/cliente/AutocompleteCliente";
        this.tipoCliente = null;
        this.cliente = null;
    }
    ClienteService.prototype.ListarEstado = function (estado) {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.ListarTipoCliente = function (tipoCliente) {
        var req = this._http.get(this._ListarTipoClienteUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.BuscarCliente = function (filtro_descripcion, select_tipocliente) {
        var req;
        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarClienteUrl + '?descripcion=&tipocliente=' + select_tipocliente);
        }
        else {
            req = this._http.get(this._BuscarClienteUrl + '?descripcion=' + filtro_descripcion + '&tipocliente=' + select_tipocliente);
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    ClienteService.prototype.BuscarClienteJuridico = function (filtro_descripcion, select_tipocliente) {
        var req;
        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarJuridicoUrl + '?descripcion=&tipocliente=' + select_tipocliente);
        }
        else {
            req = this._http.get(this._BuscarJuridicoUrl + '?descripcion=' + filtro_descripcion + '&tipocliente=' + select_tipocliente);
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    ClienteService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "server error");
    };
    ClienteService.prototype.RegistrarCliente = function (body) {
        return this._http.post(this._RegistrarClienteUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.RegistrarJuridico = function (body) {
        return this._http.post(this._RegistrarJuridicoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.EditarCliente = function (body) {
        return this._http.post(this._EditarClienteUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.EditarClienteJuridico = function (body) {
        return this._http.post(this._EditarJuridicoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.ObtenerDatosCliente = function (id_natural) {
        var req = this._http.get(this._ObtenerClienteUrl + "?id_cliente=" + id_natural);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.ObtenerDatosClienteJuridico = function (id_juridico) {
        var req = this._http.get(this._ObtenerJuridicoUrl + "?id_juridico=" + id_juridico);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.EliminarCliente = function (id_cliente, tipo_cliente) {
        var body = { id_cliente: id_cliente, tipo_cliente: tipo_cliente };
        var req = this._http.post(this._EliminarClienteUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.EliminarClienteJuridico = function (id_juridico) {
        var body = { id_juridico: id_juridico };
        var req = this._http.post(this._EliminarJuridicoUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    ClienteService.prototype.ObtenerAutocompleteCliente = function () {
        var req = this._http.get(this._AutocompleteClienteUrl);
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    return ClienteService;
}());
ClienteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map