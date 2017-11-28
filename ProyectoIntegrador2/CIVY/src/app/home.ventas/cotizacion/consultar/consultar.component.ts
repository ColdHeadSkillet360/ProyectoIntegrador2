import { Component } from "@angular/core";
import { CompleterService, CompleterData } from 'ng2-completer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../home.admin/cliente/cliente';
import { ClienteService } from '../../../home.admin/cliente/cliente.service';
import { CotizacionService } from '../../../home.ventas/cotizacion/cotizacion.service';

import { EstadosDocumento } from '../estado.documento';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    templateUrl: './consultar.component.html',
})

export class ConsultarCotizacionComponent implements EventInit {
    //protected dataService: CompleterData;

    today: Date = new Date();
    ng_fecha_inicio: Object; 
    ng_fecha_fin: Object;

    inicio: any;
    fin: any;
    ruc_dni_cliente: any;

    //ngModel
    fecha: string;
    checked: boolean = false;
    cliente: Cliente;
    estado_documento: EstadosDocumento;
    
    filtro_nro_documento: number;
    filtro_estado_cotizacion: number;
    complete_cliente: string;
    lst_cliente: Array<any>;

    tipo_documento_cotizacion: string = 'Cotizacion';

    metodosIns = new Metodos();

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
                day: this.today.getDate()-7
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
            //this.lst_cliente = res.map((a:any) => a.autocomplete)
            this.lst_cliente = res.map(function (a:any) { return a.autocomplete; });

        });

        //Llenar CBO ESTADO DOCUMENTO
        var response = this._cotizacionService.ListarEstadosDocumento(this.tipo_documento_cotizacion).subscribe(res => {
            this.estado_documento = res;
            this.filtro_estado_cotizacion = 1
        });

    }

    //METODO INICIAL:
    ngOnInit() {
        let metodosIns = new Metodos();

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
            onDblClickRow: function (row: any, $element: any) {
                console.log(row);
                metodosIns.AbrirModalOpciones(row);
                if (row.descripcion_estadodocumento == 'APROBADO') {
                    metodosIns.btn_editar = true;
                    metodosIns.btn_eliminar = true;
                } else {
                    metodosIns.btn_editar = false;
                    metodosIns.btn_eliminar = false;
                }
            },
        });

        //Llenar GRILLA PRINCIPAL
        var data_grilla;
        var response_grilla = this._cotizacionService.BuscarCotizacion('', '', '', null, 1).subscribe((data: any) => {
            this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_cotizacion').bootstrapTable("load", data_grilla);
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

    public getCopyOfOptions(options:any): IMyDpOptions {
        return JSON.parse(JSON.stringify(options));
    }

    //METODOS FUNCIONALES:

    Buscar_Cotizacion() {
        var data_grilla;
        if (!this.checked) {
            this._cotizacionService.BuscarCotizacion('', '', this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe((data: any) => {
                    this.datos_grilla = data;
                    data_grilla = data == null ? [] : data;
                    $('#dt_cotizacion').bootstrapTable("load", data_grilla);
                });
        } else {
            this._cotizacionService.BuscarCotizacion(this.inicio, this.fin, this.complete_cliente, String(this.filtro_nro_documento), this.filtro_estado_cotizacion).subscribe((data: any) => {
                this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cotizacion').bootstrapTable("load", data_grilla);
            });
        }
    }

    Eliminar_Registro(modalConfirm: string) {
        var id_cotizacion = Number.parseInt($('#id_cotizacion').val());
        var edicion: any;
        this._cotizacionService.EliminarCotizacion(id_cotizacion).subscribe(data => {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                alertify.success("Se eliminó correctamente");
            } else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });

    }

    AutocompleteAsync(event:any) {
        if (this.complete_cliente && this.complete_cliente.length > 2){
            this._clienteService.ObtenerAutocompleteCliente().subscribe(res => {
                this.lst_cliente = res.map(function (a: any) { return a.autocomplete; });
            });
        }
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

    Semaforo_Estado_Documento(value: any, row: any, index: any) {
        var opciones = "";
        if (value === "APROBADO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        } else if (value ==="PENDIENTE") {
            opciones = '<span class="label label-warning arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    }
}

export class Metodos {
    btn_editar: boolean;
    btn_eliminar: boolean;

    constructor() { }
    AbrirModalOpciones(row: any) {
        $('#id_cotizacion').val(row.id_cotizacion_venta);
        $('#dlgEditarEliminar').modal('show');
    }
}