import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { EmpleadoService } from "./empleado.service";
import { TipoEmpleado } from './tipoempleado';
import { Empleado } from './empleado';

import { AssetsService } from '../../assets.service';
import { EstadoCivil } from '../../../assets/estado_civil';
import { Sexo } from '../../../assets/Sexo';
import { Estado } from '../../estado';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { CustomValidators } from 'ng2-validation';

declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    templateUrl: './empleado.component.html'
})

export class EmpleadoComponent implements EventInit {

    today: Date = new Date();
    //Opcion de formato para el datapicker
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        todayBtnTxt: 'Hoy',
        dateFormat: 'dd/mm/yyyy',
        disableSince: {
            year: this.today.getFullYear(),
            month: this.today.getMonth(),
            day: this.today.getDate()+1
        }
    };

    //ngModel
    empleado: Empleado;
    tipoempleado: TipoEmpleado;
    estadocivil: EstadoCivil;
    estado: Estado;
    sexo: Sexo;
    filtro_descripcion: string;
    id_tipo_empleado: number;
    id_tipo_empleado_filtro: number;
    estado_civil: string;
    id_estado: number;
    select_sexo: string;
    fecha_nac: any;
    fecha: string;
    nombres: string;
    ape_paterno: string;
    ape_materno: string;
    dni: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    telefono: string;
    celular: string;
    email: string;


    //Nombre del Form
    emp: FormGroup;
    
    //GRILLA
    public datos_grilla: Array<any>;
   
    constructor(private _assetsService: AssetsService,
        private _empleadoService: EmpleadoService,
        private elRef: ElementRef,
        private fb: FormBuilder) {
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;

        //let today: Date = new Date();
        this.fecha_nac = {
            date: {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate()
            }
        };

        //Llenar CBO TIPO EMPLEADO
        var response = this._empleadoService.ListarTipoEmpleado(this.tipoempleado).subscribe(res => {
                this.tipoempleado = res;
                this.id_tipo_empleado_filtro = 1;
        });

        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._empleadoService.ListarEstado(this.estado).subscribe(res => {
            this.estado = res;
            this.id_estado = 1;
        });
        
        //Llenar GRILLA PRINCIPAL
        var response_grilla = this._empleadoService.BuscarEmpleado(null, 0).subscribe(data => {
                this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_empleado').bootstrapTable("load", data_grilla);
        });

        //Llenar CBO ESTADO CIVIL desde un ARCHIVO JSON
        this._assetsService.ListarEstadoCivil().subscribe((data) => {
            this.estadocivil = data;
            this.estado_civil = "SOLTERO";
        });

        //Llenar CBO SEXO desde un ARCHIVO JSON
        this._assetsService.ListarSexo().subscribe((data) => {
            this.sexo = data;
            this.select_sexo = "M";
        });

        //Validación de cada input del POPUP
        this.emp = new FormGroup({
            nombres: new FormControl('', CustomValidators.rangeLength([2, 30])),
            ape_paterno: new FormControl('', CustomValidators.rangeLength([2, 15])),
            ape_materno: new FormControl('', CustomValidators.rangeLength([2, 15])),
            id_tipo_empleado: new FormControl(),
            sexo: new FormControl(),
            id_estado: new FormControl(),
            estado_civil: new FormControl(),
            fecha_nacimiento: new FormControl(null, Validators.required),
            dni: new FormControl('', CustomValidators.number),
            direccion: new FormControl('', CustomValidators.rangeLength([2, 45])),
            departamento: new FormControl('', CustomValidators.rangeLength([2, 25])),
            provincia: new FormControl('', CustomValidators.rangeLength([2, 25])),
            distrito: new FormControl('', CustomValidators.rangeLength([2, 25])),
            telefono: new FormControl('', CustomValidators.number),
            celular: new FormControl('', CustomValidators.number),
            email: new FormControl('', CustomValidators.email)
        });
        
    }

    //METODO INICIAL:
    ngOnInit() {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;

        let metodosIns = new Metodos();
        //Declaracion de la bs para que mueste datos_grilla al cargar la pag en 5 segundos.
        $('#dt_empleado').bootstrapTable({
            columns: [
                { title: "DNI", field: "dni", halign: "center", valign: "middle" },
                { title: "Nombre", field: "nombres", halign: "center", valign: "middle" },
                { title: "Ape. Paterno", field: "ape_paterno", halign: "center", valign: "middle" },
                { title: "Ape. Materno", field: "ape_materno", halign: "center", valign: "middle" },
                { title: "Dep.", field: "departamento", halign: "center", valign: "middle" },
                { title: "Prov.", field: "provincia", halign: "center", valign: "middle" },
                { title: "Dist.", field: "distrito", halign: "center", valign: "middle" },
                { title: "Dirección", field: "direccion", halign: "center", valign: "middle" },
                { title: "Tipo", field: "tipo_empleado", halign: "center", valign: "middle" },
                { title: "Estado", field: "estado_descripcion", halign: "center", valign: "middle", formatter: this.Semaforo_Estado },
            ],
            data: this.datos_grilla,
            onDblClickRow: function (row: any, $element: any) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    }

    //METODOS FUNCIONALES:

    Grabar_Empleado({ value, valid }: { value: Empleado, valid: boolean }) {
        value.id_estado = Number(value.id_estado);
        value.id_tipo_empleado = Number(value.id_tipo_empleado);
        value.fecha_nacimiento = this.fecha;
        var flg_operacion = Number($('#flg_operacion').val());
        if (flg_operacion == 0) {
            var ingreso: any;
            this._empleadoService.RegistrarEmpleado(value).subscribe(
                data => {
                    ingreso = data;
                    if (ingreso == true) {
                        $('#dlgAgregarEmpleado').modal('hide');
                        alertify.success("Se registró correctamente");
                        this.emp.reset();
                        this.Buscar_Empleado();
                        $('#flg_operacion').val(0);
                    } else {
                        alertify.error("El registro no se guardó, empleado ya registrado.");
                    }
                }
            ); 
        } else {
            var edicion: any;
            value.id_empleado = Number.parseInt($('#id_empleado').val());;
            this._empleadoService.EditarEmpleado(value).subscribe(
                data => {
                    edicion = data;
                    if (edicion == true) {
                        $('#dlgAgregarEmpleado').modal('hide');
                        alertify.success("Se editó correctamente");
                        this.emp.reset();
                        this.Buscar_Empleado();
                        $('#flg_operacion').val(0);
                    } else {
                        alertify.error("El registro no editó.");
                    }
                }
            ); 
        }
        
    }

    Buscar_Empleado() {
        var componente = this;
        var data_grilla_filtrada;
        var response_grilla = this._empleadoService.BuscarEmpleado(this.filtro_descripcion, this.id_tipo_empleado_filtro  )
            .subscribe(data => {
                data_grilla_filtrada = data == null ? [] : data;
                $('#dt_empleado').bootstrapTable("load", data_grilla_filtrada);
            });
    }

    Eliminar_Registro(modalConfirm: string) {
        var id_empleado = Number.parseInt($('#id_empleado').val());
        var edicion: any;
        this._empleadoService.EliminarEmpleado(id_empleado).subscribe(data => {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                alertify.success("Se eliminó correctamente");
                this.Buscar_Empleado();
            } else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });

    }

    Editar_Registro(modalRegistro: string, modalOpciones: string) {
        $(modalOpciones).modal('hide');
       
        var id_empleado = Number.parseInt($('#id_empleado').val());;
        
        this._empleadoService.ObtenerDatosEmpleado(id_empleado).subscribe(data => {

            this.id_tipo_empleado = data[0].id_tipo_empleado;
            var fields = data[0].fecha_nacimiento.split('/');
            //var str = this.empleado.fecha_nacimiento;
            //var splitted = str.split("/");
            this.fecha_nac = {
                date: {
                    day: fields[0],
                    month: fields[1],
                    year: fields[2]
                }
            };
            this.estado_civil = data[0].estado_civil;
            this.select_sexo = data[0].sexo;
            
            this.nombres = data[0].nombres;
            this.ape_paterno = data[0].ape_paterno;
            this.ape_materno = data[0].ape_materno;
            this.dni = data[0].dni;
            this.direccion = data[0].direccion;
            this.departamento = data[0].departamento;
            this.provincia = data[0].provincia;
            this.distrito = data[0].distrito;
            this.telefono = data[0].telefono;
            this.celular = data[0].celular;
            this.email = data[0].email;
            this.id_estado = data[0].id_estado;
            $('#flg_operacion').val(1);
            $(modalRegistro).modal('show');
        });
    }

    //METODOS SECUNDARIOS:

    AbrirModalRegistro(modal: string) {
        this.ValoresxDefecto_Form_Emp();
        $(modal).modal('show');
    }

    AbrirModalEliminar(modalEliminar: string, modalOpciones: string) {
        $(modalOpciones).modal('hide');
        $(modalEliminar).modal('show');
    }

    ValoresxDefecto_Form_Emp() {
        $('#flg_operacion').val(0);
        //let today: Date = new Date();
        this.id_estado = 1;
        this.id_tipo_empleado = 1;
        this.fecha_nac = {
            date: {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate()
            }
        };
        this.estado_civil = "SOLTERO";
        this.select_sexo = "M";

        //limpieza
        this.nombres = "";
        this.ape_paterno = "";
        this.ape_materno = "";
        this.dni = "";
        this.direccion = "";
        this.departamento = "";
        this.provincia = "";
        this.distrito = "";
        this.telefono = "";
        this.celular = "";
        this.email = "";
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
        this.id_tipo_empleado_filtro = 1;
    }
}

export class Metodos {
    constructor() { }
    AbrirModalOpciones(row: any) {
        $('#id_empleado').val(row.id_empleado);
        $('#dlgEditarEliminar').modal('show');
    }
}