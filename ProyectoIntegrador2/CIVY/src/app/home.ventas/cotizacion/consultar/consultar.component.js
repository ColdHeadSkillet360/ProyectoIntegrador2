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
var ng2_completer_1 = require("ng2-completer");
var cliente_service_1 = require("../../../home.admin/cliente/cliente.service");
var cotizacion_service_1 = require("../../../home.ventas/cotizacion/cotizacion.service");
//TEMPLATE
var ConsultarCotizacionComponent = (function () {
    function ConsultarCotizacionComponent(completerService, _clienteService, _cotizacionService) {
        var _this = this;
        this.completerService = completerService;
        this._clienteService = _clienteService;
        this._cotizacionService = _cotizacionService;
        //protected dataService: CompleterData;
        this.today = new Date();
        this.checked = false;
        this.tipo_documento_cotizacion = 'Cotizacion';
        this.metodosIns = new Metodos();
        //CONFIGURANDO RANGOS DE FECHAS :
        this.FechaInicioOptions = {
            dateFormat: 'dd/mm/yyyy',
            editableDateField: false,
            showClearDateBtn: false,
            componentDisabled: true,
        };
        this.FechaFinOptions = {
            dateFormat: 'dd/mm/yyyy',
            editableDateField: false,
            showClearDateBtn: false,
            componentDisabled: true,
        };
        var data_grilla;
        this.ng_fecha_inicio = {
            date: {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate() - 7
            }
        };
        this.ng_fecha_fin = {
            date: {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate()
            }
        };
        //LLENAR DATOS AL AUTOCOMPLETE
        var response = this._clienteService.ObtenerAutocompleteCliente().subscribe(function (res) {
            //this.lst_cliente = res.map((a:any) => a.autocomplete)
            _this.lst_cliente = res.map(function (a) { return a.autocomplete; });
        });
        //Llenar CBO ESTADO DOCUMENTO
        var response = this._cotizacionService.ListarEstadosDocumento(this.tipo_documento_cotizacion).subscribe(function (res) {
            _this.estado_documento = res;
            _this.filtro_estado_cotizacion = 1;
        });
    }
    //METODO INICIAL:
    ConsultarCotizacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var metodosIns = new Metodos();
        $('#dt_cotizacion').bootstrapTable({
            columns: [
                { title: "Serie", field: "n_nro_serie", halign: "center", valign: "middle" },
                { title: "Nro.", field: "t_nro_documento", halign: "center", valign: "middle" },
                { title: "Cliente", field: "descripcion_registro", halign: "center", valign: "middle" },
                { title: "Dni", field: "dni_ruc", halign: "center", valign: "middle" },
                { title: "Emisión", field: "f_fecha_emision", halign: "center", valign: "middle" },
                { title: "Vencimiento", field: "f_fecha_vencimiento", halign: "center", valign: "middle" },
                { title: "Forma Pago", field: "descripcion_formapago", halign: "center", valign: "middle" },
                { title: "Moneda", field: "t_moneda", halign: "center", valign: "middle" },
                { title: "Monto Total", field: "n_Total", halign: "center", valign: "middle" },
                { title: "Estado", field: "descripcion_estadodocumento", halign: "center", valign: "middle", formatter: this.Semaforo_Estado_Documento },
            ],
            data: this.datos_grilla,
            onDblClickRow: function (row, $element) {
                console.log(row);
                metodosIns.AbrirModalOpciones(row);
                if (row.descripcion_estadodocumento == 'APROBADO') {
                    metodosIns.btn_editar = true;
                    metodosIns.btn_eliminar = true;
                }
                else {
                    metodosIns.btn_editar = false;
                    metodosIns.btn_eliminar = false;
                }
            },
        });
        //Llenar GRILLA PRINCIPAL
        var data_grilla;
        var response_grilla = this._cotizacionService.BuscarCotizacion('', '', '', null, 1).subscribe(function (data) {
            _this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_cotizacion').bootstrapTable("load", data_grilla);
        });
    };
    ConsultarCotizacionComponent.prototype.onStartDateChanged = function (event) {
        if (!event.jsdate) {
            return;
        }
        var d = new Date(event.jsdate.getTime());
        d.setDate(d.getDate() - 1);
        var copy = this.getCopyOfOptions(this.FechaFinOptions);
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.FechaFinOptions = copy;
        this.inicio = event.formatted;
    };
    ConsultarCotizacionComponent.prototype.onEndDateChanged = function (event) {
        if (!event.jsdate) {
            return;
        }
        var d = new Date(event.jsdate.getTime());
        d.setDate(d.getDate() + 1);
        var copy = this.getCopyOfOptions(this.FechaInicioOptions);
        copy.disableSince = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.FechaInicioOptions = copy;
        this.fin = event.formatted;
    };
    ConsultarCotizacionComponent.prototype.getCopyOfOptions = function (options) {
        return JSON.parse(JSON.stringify(options));
    };
    //METODOS FUNCIONALES:
    ConsultarCotizacionComponent.prototype.Buscar_Cotizacion = function () {
        var _this = this;
        var data_grilla;
        if (!this.checked) {
            this._cotizacionService.BuscarCotizacion('', '', this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe(function (data) {
                _this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion').bootstrapTable("load", data_grilla);
            });
        }
        else {
            this._cotizacionService.BuscarCotizacion(this.inicio, this.fin, this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe(function (data) {
                _this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion').bootstrapTable("load", data_grilla);
            });
        }
    };
    ConsultarCotizacionComponent.prototype.Eliminar_Registro = function (modalConfirm) {
        var id_cotizacion = Number.parseInt($('#id_cotizacion').val());
        var edicion;
        this._cotizacionService.EliminarCotizacion(id_cotizacion).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                alertify.success("Se eliminó correctamente");
            }
            else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });
    };
    ConsultarCotizacionComponent.prototype.AutocompleteAsync = function (event) {
        var _this = this;
        if (this.complete_cliente && this.complete_cliente.length > 2) {
            this._clienteService.ObtenerAutocompleteCliente().subscribe(function (res) {
                _this.lst_cliente = res.map(function (a) { return a.autocomplete; });
            });
        }
    };
    //METODOS SECUNDARIOS:
    ConsultarCotizacionComponent.prototype.Habilitar_Fechas_Busqueda = function () {
        //SI el 'checked' es True , HABILITA RANGO DE FECHAS.
        if (this.checked) {
            this.FechaInicioOptions = { componentDisabled: true };
            this.FechaFinOptions = { componentDisabled: true };
        }
        else {
            this.FechaInicioOptions = { componentDisabled: false };
            this.FechaFinOptions = { componentDisabled: false };
        }
    };
    ConsultarCotizacionComponent.prototype.Semaforo_Estado_Documento = function (value, row, index) {
        var opciones = "";
        if (value === "APROBADO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else if (value === "PENDIENTE") {
            opciones = '<span class="label label-warning arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    return ConsultarCotizacionComponent;
}());
ConsultarCotizacionComponent = __decorate([
    core_1.Component({
        templateUrl: './consultar.component.html',
    }),
    __metadata("design:paramtypes", [ng2_completer_1.CompleterService,
        cliente_service_1.ClienteService,
        cotizacion_service_1.CotizacionService])
], ConsultarCotizacionComponent);
exports.ConsultarCotizacionComponent = ConsultarCotizacionComponent;
var Metodos = (function () {
    function Metodos() {
    }
    Metodos.prototype.AbrirModalOpciones = function (row) {
        $('#id_cotizacion').val(row.id_cotizacion_venta);
        $('#dlgEditarEliminar').modal('show');
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=consultar.component.js.map