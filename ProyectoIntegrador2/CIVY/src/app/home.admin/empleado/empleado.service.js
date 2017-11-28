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
var EmpleadoService = (function () {
    //operacion: boolean;
    function EmpleadoService(_http) {
        this._http = _http;
        this._ListarTipoEmpleadoUrl = "http://localhost:58020/api/empleado/ListarTipoEmpleado";
        this._ListarEstadoUrl = "http://localhost:58020/api/empleado/ListarEstado";
        this._BuscarEmpleadoUrl = "http://localhost:58020/api/empleado/BuscarEmpleado";
        this._RegistrarEmpleadoUrl = "http://localhost:58020/api/empleado/RegistrarEmpleado";
        this._EditarEmpleadoUrl = "http://localhost:58020/api/empleado/EditarEmpleado";
        this._EliminarEmpleadoUrl = "http://localhost:58020/api/empleado/EliminarEmpleado";
        this._ObtenerEmpleadoUrl = "http://localhost:58020/api/empleado/ObtenerEmpleado";
    }
    EmpleadoService.prototype.ListarTipoEmpleado = function (tipoEmpleado) {
        var req = this._http.get(this._ListarTipoEmpleadoUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    EmpleadoService.prototype.ListarEstado = function (estado) {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    EmpleadoService.prototype.BuscarEmpleado = function (filtro_descripcion, select_tipoempleado) {
        var req;
        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarEmpleadoUrl + '?descripcion=&tipoempleado=' + select_tipoempleado);
        }
        else {
            req = this._http.get(this._BuscarEmpleadoUrl + '?descripcion=' + filtro_descripcion + '&tipoempleado=' + select_tipoempleado);
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    EmpleadoService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "error al conectar con el servidor");
    };
    EmpleadoService.prototype.RegistrarEmpleado = function (registroEmpleado) {
        var operacion;
        var body = {
            nombres: registroEmpleado.nombres,
            ape_paterno: registroEmpleado.ape_paterno,
            ape_materno: registroEmpleado.ape_materno,
            dni: registroEmpleado.dni,
            sexo: registroEmpleado.sexo,
            departamento: registroEmpleado.departamento,
            provincia: registroEmpleado.provincia,
            distrito: registroEmpleado.distrito,
            direccion: registroEmpleado.direccion,
            email: registroEmpleado.email,
            estado_civil: registroEmpleado.estado_civil,
            telefono: registroEmpleado.telefono,
            celular: registroEmpleado.celular,
            fecha_nacimiento: registroEmpleado.fecha_nacimiento,
            id_tipo_empleado: registroEmpleado.id_tipo_empleado
        };
        return this._http.post(this._RegistrarEmpleadoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    EmpleadoService.prototype.EditarEmpleado = function (editarEmpleado) {
        var operacion;
        var body = {
            id_empleado: editarEmpleado.id_empleado,
            nombres: editarEmpleado.nombres,
            ape_paterno: editarEmpleado.ape_paterno,
            ape_materno: editarEmpleado.ape_materno,
            dni: editarEmpleado.dni,
            sexo: editarEmpleado.sexo,
            departamento: editarEmpleado.departamento,
            provincia: editarEmpleado.provincia,
            distrito: editarEmpleado.distrito,
            direccion: editarEmpleado.direccion,
            email: editarEmpleado.email,
            estado_civil: editarEmpleado.estado_civil,
            telefono: editarEmpleado.telefono,
            celular: editarEmpleado.celular,
            fecha_nacimiento: editarEmpleado.fecha_nacimiento,
            id_tipo_empleado: editarEmpleado.id_tipo_empleado
        };
        return this._http.post(this._EditarEmpleadoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    EmpleadoService.prototype.ObtenerDatosEmpleado = function (id_empleado) {
        var req = this._http.get(this._ObtenerEmpleadoUrl + "?id_empleado=" + id_empleado);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    EmpleadoService.prototype.EliminarEmpleado = function (id_empleado) {
        var body = { id_empleado: id_empleado };
        var req = this._http.post(this._EliminarEmpleadoUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    return EmpleadoService;
}());
EmpleadoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EmpleadoService);
exports.EmpleadoService = EmpleadoService;
//# sourceMappingURL=empleado.service.js.map