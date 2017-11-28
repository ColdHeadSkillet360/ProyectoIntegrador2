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
var ProductoService = (function () {
    //operacion: boolean;
    function ProductoService(_http) {
        this._http = _http;
        this._ListarTipoProductoUrl = "http://localhost:58020/api/producto/ListarTipoProducto";
        this._ListarEstadoUrl = "http://localhost:58020/api/producto/ListarEstado";
        this._BuscarProductoUrl = "http://localhost:58020/api/producto/BuscarProducto";
        this._BuscarServicioUrl = "http://localhost:58020/api/producto/BuscarServicio";
        this._ObtenertProductoUrl = "http://localhost:58020/api/producto/ObtenerProductos";
        this._ObtenertServicioUrl = "http://localhost:58020/api/producto/ObtenerServicios";
        this._EditarProductoUrl = "http://localhost:58020/api/producto/EditarProducto";
        this._EditarServicioUrl = "http://localhost:58020/api/producto/EditarServicios";
        this._EliminarProductoUrl = "http://localhost:58020/api/producto/EliminarProducto";
        this._RegistrarServicioUrl = "http://localhost:58020/api/producto/RegistrarServicio";
        this._RegistrarProductoUrl = "http://localhost:58020/api/producto/RegistrarProducto";
    }
    ProductoService.prototype.ListarTipoProducto = function (tipoProducto) {
        var req = this._http.get(this._ListarTipoProductoUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.ListarEstado = function (estado) {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.BuscarProducto = function (filtro_descripcion, select_tipoproducto) {
        var req;
        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarProductoUrl + '?descripcion=&tipoproducto=' + select_tipoproducto);
        }
        else {
            req = this._http.get(this._BuscarProductoUrl + '?descripcion=' + filtro_descripcion + '&tipoproducto=' + select_tipoproducto);
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    ProductoService.prototype.BuscarServicio = function (filtro_descripcion, select_tipoproducto) {
        var req;
        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarServicioUrl + '?descripcion=&tipoproducto=' + select_tipoproducto);
        }
        else {
            req = this._http.get(this._BuscarServicioUrl + '?descripcion=' + filtro_descripcion + '&tipoproducto=' + select_tipoproducto);
        }
        //mapeo de datos en el GET
        return req.map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    ProductoService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || "error al conectar con el servidor");
    };
    ProductoService.prototype.RegistrarProducto = function (body) {
        return this._http.post(this._RegistrarProductoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.RegistrarServicio = function (body) {
        return this._http.post(this._RegistrarServicioUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.EditarProducto = function (body) {
        return this._http.post(this._EditarProductoUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.EditarServicio = function (body) {
        return this._http.post(this._EditarServicioUrl, body, {}).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.ObtenerDatosProducto = function (id_productos) {
        var req = this._http.get(this._ObtenertProductoUrl + "?id_productos=" + id_productos);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    ProductoService.prototype.ObtenerDatosServicio = function (ID_Servicios) {
        var req = this._http.get(this._ObtenertServicioUrl + "?id_servicio=" + ID_Servicios);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    /*  EliminarProducto(id_productos: number): Observable<Producto> {
          var body = { id_productos: id_productos };
  
          var req = this._http.post(this._EliminarProductoUrl, body);
          return req.map(response => response.json()).catch(this.handleError);
      }*/
    ProductoService.prototype.EliminarProducto = function (id_proserv, tipo_producto) {
        var body = { id_proserv: id_proserv, tipo_producto: tipo_producto };
        var req = this._http.post(this._EliminarProductoUrl, body);
        return req.map(function (response) { return response.json(); }).catch(this.handleError);
    };
    return ProductoService;
}());
ProductoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductoService);
exports.ProductoService = ProductoService;
//# sourceMappingURL=producto.service.js.map