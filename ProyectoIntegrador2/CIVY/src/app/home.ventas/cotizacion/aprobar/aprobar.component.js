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
var AprobarCotizacionComponent = (function () {
    function AprobarCotizacionComponent(completerService, _clienteService, _cotizacionService) {
        var _this = this;
        this.completerService = completerService;
        this._clienteService = _clienteService;
        this._cotizacionService = _cotizacionService;
        this.today = new Date();
        this.checked = false;
        this.tipo_documento_cotizacion = 'Cotizacion';
        this.str_ids = [];
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
            _this.lst_cliente = res.map(function (a) { return a.autocomplete; });
        });
        //Llenar CBO ESTADO DOCUMENTO
        var response = this._cotizacionService.ListarEstadosDocumento(this.tipo_documento_cotizacion).subscribe(function (res) {
            _this.estado_documento = res;
            _this.filtro_estado_cotizacion = 1;
        });
    }
    //METODO INICIAL:
    AprobarCotizacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var metodosIns = new Metodos(this._cotizacionService);
        $('#dt_cotizacion_aprobar').bootstrapTable({
            columns: [
                { title: "", checkbox: "true" },
                { title: "Serie", field: "n_nro_serie", halign: "center", valign: "middle" },
                { title: "Nro.", field: "t_nro_documento", halign: "center", valign: "middle" },
                { title: "Cliente", field: "descripcion_registro", halign: "center", valign: "middle" },
                { title: "Identifación", field: "dni_ruc", halign: "center", valign: "middle" },
                { title: "Emisión", field: "f_fecha_emision", halign: "center", valign: "middle" },
                { title: "Vencimiento", field: "f_fecha_vencimiento", halign: "center", valign: "middle" },
                { title: "Forma Pago", field: "descripcion_formapago", halign: "center", valign: "middle" },
                { title: "Moneda", field: "t_moneda", halign: "center", valign: "middle" },
                { title: "Monto Total", field: "n_Total", halign: "center", valign: "middle" },
                { title: "Estado", field: "descripcion_estadodocumento", halign: "center", valign: "middle", formatter: this.Semaforo_Estado_Documento },
            ],
            data: this.datos_grilla,
            onExpandRow: function (index, row, $detail) {
                metodosIns.Listar_Detalle_Cotizacion(row.id_cotizacion_venta, $detail.html('<table class="table-striped table-hover table-condensed"  data-toggle="table" data-row-style="rowStyle" data-pagination="false"></table>').find('table'));
            }
        });
        //Llenar GRILLA PRINCIPAL
        var data_grilla;
        var response_grilla = this._cotizacionService.BuscarCotizacion('', '', '', null, 1).subscribe(function (data) {
            _this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
            $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
        });
    };
    AprobarCotizacionComponent.prototype.onStartDateChanged = function (event) {
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
    AprobarCotizacionComponent.prototype.onEndDateChanged = function (event) {
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
    AprobarCotizacionComponent.prototype.getCopyOfOptions = function (options) {
        return JSON.parse(JSON.stringify(options));
    };
    //METODOS FUNCIONALES:
    AprobarCotizacionComponent.prototype.Buscar_Cotizacion = function () {
        var _this = this;
        var data_grilla;
        if (!this.checked) {
            this._cotizacionService.BuscarCotizacion('', '', this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe(function (data) {
                _this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
                $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
            });
        }
        else {
            this._cotizacionService.BuscarCotizacion(this.inicio, this.fin, this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe(function (data) {
                _this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
                $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
            });
        }
    };
    //Aprobar_Cotizacion() {
    //    var data = $('#dt_cotizacion_aprobar').bootstrapTable('getSelections');
    //    var str_ids: any = [];
    //    if (!jQuery.isEmptyObject($('#dt_cotizacion_aprobar').bootstrapTable('getSelections'))) {
    //        $.map(data, function (value: any, index: any) {
    //            str_ids.push(value.id_cotizacion_venta);
    //        });
    //        alertify.confirm("¿ESTA SEGURO DE APROBAR LA(S) COTIZACION(ES) ?", function (result: any) {
    //            if (result) {
    //                console.log(str_ids)
    //            }
    //        });
    //    } else {
    //        alertify.error("Seleccione al menos una Cotizacion");
    //    }
    //}
    AprobarCotizacionComponent.prototype.Abrir_Aprobacion = function (modalAprobacion) {
        var data = $('#dt_cotizacion_aprobar').bootstrapTable('getSelections');
        var str_ids = [];
        //$.map(data, function (value: any, index: any) {
        //    str_ids.push(value.id_cotizacion_venta);
        //});
        if (!jQuery.isEmptyObject($('#dt_cotizacion_aprobar').bootstrapTable('getSelections'))) {
            if (data[0].descripcion_estadodocumento != 'APROBADO') {
                $(modalAprobacion).modal('show');
                data.map(function (value) {
                    str_ids.push(value.id_cotizacion_venta);
                });
                console.log(str_ids);
                this.str_ids = str_ids;
            }
            else {
                alertify.error("El registro seleccionado ya ha sido Aprobada");
            }
        }
        else {
            alertify.error("Seleccione al menos una Cotización");
        }
    };
    AprobarCotizacionComponent.prototype.Aprobar_Cotizacion = function (modalAprobacion, str_ids) {
        var _this = this;
        //var data = $('#dt_cotizacion_aprobar').bootstrapTable('getSelections');
        //var str_ids: any = [];
        var EsAprobado;
        console.log(str_ids);
        //$.map(data, function (value: any, index: any) {
        //    str_ids.push(value.id_cotizacion_venta);
        //});
        //console.log(str_ids);
        //if (!jQuery.isEmptyObject($('#dt_cotizacion_aprobar').bootstrapTable('getSelections'))) {
        //console.log(data);
        //  if (str_ids[0].descripcion_estadodocumento != 'APROBADO') {
        //    console.log(str_ids);
        var edicion;
        this._cotizacionService.AprobarCotizacion(str_ids).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $('#dlgConfirmAprobar').modal('hide');
                alertify.success("Se aprobó la(s) cotización(es) correctamente");
                _this.Buscar_Cotizacion();
            }
            else {
                $('#dlgConfirmAprobar').modal('hide');
                alertify.error("No se pudo aprobar correctamente");
            }
        });
        //    } else {
        //        alertify.error("El registro seleccionado ya ha sido Aprobada");
        //    }
        //} else {
        //    alertify.error("Seleccione al menos una Cotizacion");
        //}
    };
    //METODOS SECUNDARIOS:
    AprobarCotizacionComponent.prototype.Habilitar_Fechas_Busqueda = function () {
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
    AprobarCotizacionComponent.prototype.Limpiar_Filtros = function () {
        this.complete_cliente = '';
        this.filtro_nro_documento = '';
        this.filtro_estado_cotizacion = 1;
    };
    AprobarCotizacionComponent.prototype.Semaforo_Estado_Documento = function (value, row, index) {
        var opciones = "";
        if (value === "APROBADO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else if (value === "PENDIENTE") {
            opciones = '<span class="label label-warning arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    return AprobarCotizacionComponent;
}());
AprobarCotizacionComponent = __decorate([
    core_1.Component({
        templateUrl: './aprobar.component.html',
    }),
    __metadata("design:paramtypes", [ng2_completer_1.CompleterService,
        cliente_service_1.ClienteService,
        cotizacion_service_1.CotizacionService])
], AprobarCotizacionComponent);
exports.AprobarCotizacionComponent = AprobarCotizacionComponent;
var Metodos = (function () {
    //btn_editar: boolean;
    //btn_eliminar: boolean;
    //metodosInsPrincipal = new AprobarCotizacionComponent(this.completerService, this._clienteService, this._cotizacionService);
    function Metodos(_cotizacionService) {
        this._cotizacionService = _cotizacionService;
    }
    //AbrirModalOpciones(row: any) {
    //    $('#id_cotizacion').val(row.id_cotizacion_venta);
    //    $('#dlgConfirmAprobar').modal('show');
    //}
    Metodos.prototype.Listar_Detalle_Cotizacion = function (id_cotizacion_venta, $detail) {
        this._cotizacionService.ObtenerDetalleCotizacion(id_cotizacion_venta).subscribe(function (data) {
            console.log(data);
            var columns = [];
            columns.push({ field: 'codigo', title: 'Código', sortable: false });
            columns.push({ field: 'descripcion_pro_ser', title: 'Descripción', sortable: false });
            columns.push({ field: 'unidad_medida', title: 'UND.', sortable: false });
            columns.push({ field: 'cantidad', title: 'Cantidad', sortable: false, align: 'right' });
            columns.push({ field: 'precio', title: 'P. Unitario', sortable: false, align: 'right' });
            $detail.bootstrapTable({
                columns: columns,
                data: data
            });
        });
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=aprobar.component.js.map