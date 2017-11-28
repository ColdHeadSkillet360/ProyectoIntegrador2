import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Cliente } from '../../../home.admin/cliente/cliente';
import { ClienteService } from '../../../home.admin/cliente/cliente.service';
import { CotizacionService } from '../../../home.ventas/cotizacion/cotizacion.service';
import { EstadosDocumento } from '../estado.documento';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

declare var jQuery: any;
declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    templateUrl: './aprobar.component.html',
})

export class AprobarCotizacionComponent implements EventInit {
    today: Date = new Date();

    inicio: any;
    fin: any;
    ruc_dni_cliente: any;

    //ngModel
    fecha: string;
    checked: boolean = false;
    cliente: Cliente;
    estado_documento: EstadosDocumento;

    //filtros
    ng_fecha_inicio: Object;
    ng_fecha_fin: Object;
    filtro_nro_documento: string;
    filtro_estado_cotizacion: number;
    complete_cliente: string;
    lst_cliente: Array<any>;

    tipo_documento_cotizacion: string = 'Cotizacion';

    str_ids: any = [];

    //metodosIns = new Metodos(this.completerService, this._clienteService, this._cotizacionService);

    //GRILLA
    public datos_grilla: Array<any>;

    constructor(private completerService: CompleterService,
        private _clienteService: ClienteService,
        private _cotizacionService: CotizacionService) {

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
        var response = this._clienteService.ObtenerAutocompleteCliente().subscribe(res => {
            this.lst_cliente = res.map(function (a: any) { return a.autocomplete; });
        });

        //Llenar CBO ESTADO DOCUMENTO
        var response = this._cotizacionService.ListarEstadosDocumento(this.tipo_documento_cotizacion).subscribe(res => {
            this.estado_documento = res;
            this.filtro_estado_cotizacion = 1
        });
        
    }

    //METODO INICIAL:
    ngOnInit() {
        let metodosIns = new Metodos(this._cotizacionService);

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
            onExpandRow: function (index: any, row: any, $detail: any) {
                metodosIns.Listar_Detalle_Cotizacion(row.id_cotizacion_venta, $detail.html('<table class="table-striped table-hover table-condensed"  data-toggle="table" data-row-style="rowStyle" data-pagination="false"></table>').find('table'));
            }
            //onDblClickRow: function (row: any, $element: any) {
            //    console.log(row);
            //    metodosIns.AbrirModalOpciones(row);
            //    if (row.descripcion_estadodocumento == 'APROBADO') {
            //        metodosIns.btn_editar = true;
            //        metodosIns.btn_eliminar = true;
            //    } else {
            //        metodosIns.btn_editar = false;
            //        metodosIns.btn_eliminar = false;
            //    }
            //},
        });
        
        //Llenar GRILLA PRINCIPAL
        var data_grilla;
        var response_grilla = this._cotizacionService.BuscarCotizacion('', '', '', null, 1 ).subscribe((data: any) => {
            this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
            $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
        });
    }

    //CONFIGURANDO RANGOS DE FECHAS :
    FechaInicioOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        editableDateField: false,
        showClearDateBtn: false,
        componentDisabled: true,
    };

    FechaFinOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        editableDateField: false,
        showClearDateBtn: false,
        componentDisabled: true,
    };

    onStartDateChanged(event: IMyDateModel) {
        if (!event.jsdate) {
            return;
        }
        let d: Date = new Date(event.jsdate.getTime());
        d.setDate(d.getDate() - 1);
        let copy: IMyDpOptions = this.getCopyOfOptions(this.FechaFinOptions);
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.FechaFinOptions = copy;
        this.inicio = event.formatted;
    }

    onEndDateChanged(event: IMyDateModel) {
        if (!event.jsdate) {
            return;
        }

        let d: Date = new Date(event.jsdate.getTime());

        d.setDate(d.getDate() + 1);
        let copy: IMyDpOptions = this.getCopyOfOptions(this.FechaInicioOptions);
        copy.disableSince = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.FechaInicioOptions = copy;
        this.fin = event.formatted;
    }

    public getCopyOfOptions(options: any): IMyDpOptions {
        return JSON.parse(JSON.stringify(options));
    }


    //METODOS FUNCIONALES:

    Buscar_Cotizacion() {
        var data_grilla;
        if (!this.checked) {
            this._cotizacionService.BuscarCotizacion('', '', this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe((data: any) => {
                this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
                $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
            });
        } else {
            this._cotizacionService.BuscarCotizacion(this.inicio, this.fin, this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe((data: any) => {
                this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion_aprobar').bootstrapTable("load", data_grilla);
                $('#dt_cotizacion_aprobar').bootstrapTable('uncheckAll');
            });
        }
    }

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

    Abrir_Aprobacion(modalAprobacion:any) {
        let data = $('#dt_cotizacion_aprobar').bootstrapTable('getSelections');
        let str_ids: any = [];
        //$.map(data, function (value: any, index: any) {
        //    str_ids.push(value.id_cotizacion_venta);
        //});
        if (!jQuery.isEmptyObject($('#dt_cotizacion_aprobar').bootstrapTable('getSelections'))) {
            if (data[0].descripcion_estadodocumento != 'APROBADO') {
                $(modalAprobacion).modal('show');
                data.map(function (value: any) {
                    str_ids.push(value.id_cotizacion_venta);
                });
                console.log(str_ids);
                this.str_ids = str_ids;
            } else {
                alertify.error("El registro seleccionado ya ha sido Aprobada");
            }
        } else {
            alertify.error("Seleccione al menos una Cotización");
        }
    }

    Aprobar_Cotizacion(modalAprobacion: any, str_ids:any) {
        //var data = $('#dt_cotizacion_aprobar').bootstrapTable('getSelections');
        //var str_ids: any = [];
        var EsAprobado: boolean;
       
        console.log(str_ids);
        //$.map(data, function (value: any, index: any) {
        //    str_ids.push(value.id_cotizacion_venta);
        //});
        //console.log(str_ids);
        //if (!jQuery.isEmptyObject($('#dt_cotizacion_aprobar').bootstrapTable('getSelections'))) {
            //console.log(data);
          //  if (str_ids[0].descripcion_estadodocumento != 'APROBADO') {
            //    console.log(str_ids);
                var edicion: any;
                this._cotizacionService.AprobarCotizacion(str_ids).subscribe((data: any) => {
                    edicion = data;
                    if (edicion == true) {
                        $('#dlgConfirmAprobar').modal('hide');
                        alertify.success("Se aprobó la(s) cotización(es) correctamente");
                        this.Buscar_Cotizacion();
                    } else {
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
        

    }




    //METODOS SECUNDARIOS:

    Habilitar_Fechas_Busqueda() {
        //SI el 'checked' es True , HABILITA RANGO DE FECHAS.
        if (this.checked) {
            this.FechaInicioOptions = { componentDisabled: true };
            this.FechaFinOptions = { componentDisabled: true };
        } else {
            this.FechaInicioOptions = { componentDisabled: false };
            this.FechaFinOptions = { componentDisabled: false };
        }
    }

    Limpiar_Filtros() {
        this.complete_cliente = '';
        this.filtro_nro_documento = '';
        this.filtro_estado_cotizacion = 1;
    }
    
    Semaforo_Estado_Documento(value: any, row: any, index: any) {
        var opciones = "";
        if (value === "APROBADO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        } else if (value === "PENDIENTE") {
            opciones = '<span class="label label-warning arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    }

}



export class Metodos {
    //btn_editar: boolean;
    //btn_eliminar: boolean;

    //metodosInsPrincipal = new AprobarCotizacionComponent(this.completerService, this._clienteService, this._cotizacionService);

    constructor( private _cotizacionService: CotizacionService) { }
    //AbrirModalOpciones(row: any) {
    //    $('#id_cotizacion').val(row.id_cotizacion_venta);
    //    $('#dlgConfirmAprobar').modal('show');
    //}

    Listar_Detalle_Cotizacion(id_cotizacion_venta: any, $detail:any) {
        this._cotizacionService.ObtenerDetalleCotizacion(id_cotizacion_venta).subscribe((data: any) => {

            console.log(data);
            var columns = []
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
    }

}