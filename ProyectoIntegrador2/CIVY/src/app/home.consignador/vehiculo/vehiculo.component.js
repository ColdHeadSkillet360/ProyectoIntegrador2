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
//import { Empleado } from './../empleado';
var vehiculo_service_1 = require("./vehiculo.service");
var assets_service_1 = require("../../assets.service");
var forms_1 = require("@angular/forms");
//TEMPLATE
var VehiculoComponent = (function () {
    function VehiculoComponent(_assetsService, _vehiculoService, elRef, fb) {
        var _this = this;
        this._assetsService = _assetsService;
        this._vehiculoService = _vehiculoService;
        this.elRef = elRef;
        this.fb = fb;
        var data_grilla;
        this._vehiculoService.BuscarVehiculo(0, '').subscribe(function (data) {
            _this.datos_grilla = data;
            console.log(data);
            data_grilla = data == null ? [] : data;
            console.log(data_grilla);
            $('#dt_vehiculo').bootstrapTable("load", data_grilla);
        });
    }
    VehiculoComponent.prototype.ngOnInit = function () {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;
        var metodosIns = new Metodos();
        //Declaracion de la bs para que mueste datos_grilla al cargar la pag en 5 segundos.
        $('#dt_vehiculo').bootstrapTable({
            columns: [
                { title: "N°PLACA", field: "placa_vehi", halign: "center", valign: "middle" },
                { title: "MARCA", field: "marca_vehiculo", halign: "center", valign: "middle" },
                { title: "CAPACIDAD MÁXIMA", field: "capaMaxima_vehi", halign: "center", valign: "middle" },
                { title: "VENCIMIENTO DE SOAT", field: "vencSoat", halign: "center", valign: "middle" },
                { title: "MODELO", field: "modelo_vehi", halign: "center", valign: "middle" },
                { title: "ESTADO", field: "estado_descripcion", halign: "center", valign: "middle", formatter: this.Semaforo_Estado },
            ],
            data: this.datos_grilla,
            onDblClickRow: function (row, $element) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    };
    VehiculoComponent.prototype.Buscar_Vehiculo = function () {
        var componente = this;
        var data_grilla_filtrada;
        var response_grilla = this._vehiculoService.BuscarVehiculo(0, this.filtro_descripcion)
            .subscribe(function (data) {
            data_grilla_filtrada = data == null ? [] : data;
            console.log(data_grilla_filtrada);
            $('#dt_vehiculo').bootstrapTable("load", data_grilla_filtrada);
        });
    };
    VehiculoComponent.prototype.Semaforo_Estado = function (value, row, index) {
        var opciones = "";
        if (value === "ACTIVO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else {
            opciones = '<span class="label label-default arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    VehiculoComponent.prototype.Limpiar_Filtros = function () {
        this.filtro_descripcion = null;
        this.filtro_transportista = 0;
    };
    return VehiculoComponent;
}());
VehiculoComponent = __decorate([
    core_1.Component({
        templateUrl: './vehiculo.component.html',
    }),
    __metadata("design:paramtypes", [assets_service_1.AssetsService,
        vehiculo_service_1.VehiculoService,
        core_1.ElementRef,
        forms_1.FormBuilder])
], VehiculoComponent);
exports.VehiculoComponent = VehiculoComponent;
var Metodos = (function () {
    function Metodos() {
    }
    Metodos.prototype.AbrirModalOpciones = function (row) {
        $('#id_vehiculo').val(row.id_vehiculo);
        /*   $('#dlgEditarEliminar').modal('show');*/
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=vehiculo.component.js.map