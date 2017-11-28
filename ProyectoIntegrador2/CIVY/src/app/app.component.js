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
var usuario_service_1 = require("./usuario.service");
//TEMPLATE
var AppComponent = (function () {
    function AppComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.usuario = null;
        this.usuario = {
            usuario: "",
            contrasena: ""
        };
    }
    AppComponent.prototype.ingresar = function () {
        var _this = this;
        //La contrase�a ingresada en la GUI
        var contra = this.usuario.contrasena;
        $("#lb_mensaje_bloqueo").hide();
        //validamos si es que hay datos ingresados, de lo contrario mandar mensaje.
        if (this.usuario.usuario !== "" && this.usuario.contrasena !== "") {
            //obtener como response el method de usuario.service
            var response = this._userService.Ingresar(this.usuario).subscribe(function (usuario) {
                _this.usuario = usuario;
                if (_this.usuario == null) {
                    alertify.error("Usuario No identificado");
                    _this.usuario = {
                        usuario: "",
                        contrasena: ""
                    };
                }
                else if (_this.usuario.bloqueo || _this.usuario.numero_intentos == 0) {
                    alertify.error("El usuario se encuentra bloqueado");
                    $("#lb_mensaje_bloqueo").show();
                    _this.usuario = {
                        usuario: "",
                        contrasena: ""
                    };
                }
                else if (_this.usuario.contrasena != contra) {
                    alertify.error("Contrase�a incorrecta, recuerde que tiene " + _this.usuario.numero_intentos + " intentos para acceder al sistema.");
                    _this.usuario = {
                        contrasena: ""
                    };
                }
                else if (_this.usuario.descripcion_rol == "Administrador") {
                    _this._router.navigate(['/home.admin']);
                    $("#formLogin").hide();
                    $("#formHome").show();
                    _this.usuario.usuario = "";
                    _this.usuario.contrasena = "";
                }
                else if (_this.usuario.descripcion_rol == "Encargado de Ventas") {
                    _this._router.navigate(['/home.ventas']);
                    $("#formLogin").hide();
                    $("#formHome").show();
                    _this.usuario.usuario = "";
                    _this.usuario.contrasena = "";
                }
                else if (_this.usuario.descripcion_rol == "Encargado de Inventario") {
                    _this._router.navigate(['/home.inventario']);
                    $("#formLogin").hide();
                    $("#formHome").show();
                    _this.usuario.usuario = "";
                    _this.usuario.contrasena = "";
                }
                else if (_this.usuario.descripcion_rol == "Consignador") {
                    _this._router.navigate(['/home.consignador']);
                    $("#formLogin").hide();
                    $("#formHome").show();
                    _this.usuario.usuario = "";
                    _this.usuario.contrasena = "";
                }
                else {
                    _this.usuario.usuario = "";
                    _this.usuario.contrasena = "";
                }
            });
        }
        else {
            alertify.error("Por favor ingrese en los campos obligatorios usuario/contrase�a");
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
    }),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map