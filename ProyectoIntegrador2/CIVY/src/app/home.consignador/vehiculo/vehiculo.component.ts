import { Component, ElementRef, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Vehiculo} from './vehiculo';
//import { Empleado } from './../empleado';
import { VehiculoService } from './vehiculo.service';
import { Estado } from '../../estado';
import { AssetsService } from '../../assets.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { CustomValidators } from 'ng2-validation';

declare var alertify: any;
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    templateUrl: './vehiculo.component.html',
})


export class VehiculoComponent implements EventInit {

    vehiculo: Vehiculo;
    estado: Estado;
    /*empleado: Empleado;*/

    id_vehiculo: number;
    placa_vehi: string;
    marca_vehiculo: string;
    capaMaxima_vehi: number;
    vencSoat: string;
    modelo_vehi: string;

    filtro_transportista: number;
    filtro_descripcion: string;

    id_estado: number;
    id_empleado: number;

    vehi: FormGroup

    public datos_grilla: Array<any>;

    constructor(private _assetsService: AssetsService,
                private _vehiculoService: VehiculoService,
                private elRef: ElementRef,
                private fb: FormBuilder) {

        var data_grilla:any;

        this._vehiculoService.BuscarVehiculo(0, '').subscribe((data: any) => {
            this.datos_grilla = data;
            console.log(data);
            data_grilla = data == null ? [] : data;

            console.log(data_grilla);

            $('#dt_vehiculo').bootstrapTable("load", data_grilla);
        });

    }

    ngOnInit() {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;

        let metodosIns = new Metodos();
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
            onDblClickRow: function (row: any, $element: any) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    }

    Buscar_Vehiculo() {
        var componente = this;
        var data_grilla_filtrada:any;
        var response_grilla = this._vehiculoService.BuscarVehiculo(0, this.filtro_descripcion)
            .subscribe((data:any) => {
                data_grilla_filtrada = data == null ? [] : data;
                console.log(data_grilla_filtrada);
                $('#dt_vehiculo').bootstrapTable("load", data_grilla_filtrada);
            });
    }

    Semaforo_Estado(value: any, row: any, index: any) {
        var opciones = "";
        if (value === "ACTIVO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        } else {
            opciones = '<span class="label label-default arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    }

    Limpiar_Filtros() {
        this.filtro_descripcion = null;
        this.filtro_transportista = 0;
    }

}

export class Metodos {
    constructor() { }
    AbrirModalOpciones(row: any) {
        $('#id_vehiculo').val(row.id_vehiculo);
     /*   $('#dlgEditarEliminar').modal('show');*/
    }
}

