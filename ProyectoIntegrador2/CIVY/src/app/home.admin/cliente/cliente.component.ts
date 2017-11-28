import { Component, ElementRef, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { ClienteService } from './cliente.service'

import { Cliente } from './cliente'
import { Juridico } from './juridico';
import { Comun } from './comun';


import { TipoCliente } from './tipocliente'

import { AssetsService } from '../../assets.service';
import { Sexo } from '../../../assets/Sexo';
import { Estado } from '../../estado';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';



declare var alertify: any;
declare var $: any;


//Declaracion de variables necesarias:
declare var T_Estado: any;
declare var id_empleado: any;


//TEMPLATE
@Component({
    templateUrl: './cliente.component.html',
})

export class ClienteComponent implements EventInit {

    //Nombre del Form
    natural: FormGroup;
    juridico: FormGroup;
    comun: FormGroup;

    //Clases:
    ClienteJuridico: Juridico;
    ClienteNarual: Cliente;

    // El ngModel
    tipocliente: TipoCliente = null;
    cliente: Cliente = null;
    filtro_descripcion: string;
    estado: Estado;
    sexo: Sexo;
    id_estado: number;
    select_sexo: string;
    id_tipo_cliente: number;
    id_tipo_cliente_filtro: number;

    nombre: string;
    ape_paterno: string;
    ape_materno: string;
    dni: string;

    email: string;
    direccion: string;
    referencia: string;
    telefono: string;
    celular: string;




    id_juridico: number;
    razonSocial: string;
    nComercial: string;
    ruc: string;

    telefono1: string;
    telefono2: string;
    

    //GRILLA
    public datos_grilla: Array<any>;

    constructor(private _clienteService: ClienteService,
        private _assetsService: AssetsService,
        private formB: FormBuilder,
        private elRef: ElementRef) {
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;


        // ESTADO [ACTIVO - INACTIVO]
        var response = this._clienteService.ListarEstado(this.estado).subscribe(res => {
            this.estado = res;
            this.id_estado = 1;
        });

        //Combo Tipo_Cliente
        var response = this._clienteService.ListarTipoCliente(this.tipocliente)
            .subscribe(res => {
                this.tipocliente = res;
                this.id_tipo_cliente_filtro = 1;
            });


        //Grilla
        var response_grilla = this._clienteService.BuscarCliente(null, 0
        )
            .subscribe(data => {
                this.datos_grilla = data;
                data_grilla = data == null ? [] : data;
                $('#dt_cliente').bootstrapTable("load", data_grilla);
            });



        //Llenar Combo SEXO desde un ARCHIVO JSON
        this._assetsService.ListarSexo().subscribe((data) => {
            this.sexo = data;
            this.select_sexo = "M";
        });


        //Validación de cada input del POPUP
        this.comun = new FormGroup({
            id_tipo_cliente: new FormControl(),
            email: new FormControl('', CustomValidators.email),
            id_estado: new FormControl(),
            direccion: new FormControl('', CustomValidators.rangeLength([2, 45])),
            referencia: new FormControl('', CustomValidators.rangeLength([2, 20])),
        });

        this.natural = new FormGroup({
            //Natural
            nombre: new FormControl('', CustomValidators.rangeLength([2, 30])),
            ape_paterno: new FormControl('', CustomValidators.rangeLength([2, 15])),
            ape_materno: new FormControl('', CustomValidators.rangeLength([2, 15])),
            //id_tipo_cliente: new FormControl(),
            sexo: new FormControl(),
            dni: new FormControl('', CustomValidators.number),
            //email: new FormControl('', CustomValidators.email),
            //id_estado: new FormControl(),
            //direccion: new FormControl('', CustomValidators.rangeLength([2, 45])),
            //referencia: new FormControl('', CustomValidators.rangeLength([2, 25])),
            telefono: new FormControl('', CustomValidators.number),
            celular: new FormControl('', CustomValidators.number),
        });

        this.juridico = new FormGroup({
            //Juridico
            razonSocial: new FormControl('', CustomValidators.rangeLength([2, 30])),
            nComercial: new FormControl('', CustomValidators.rangeLength([2, 15])),
            ruc: new FormControl('', CustomValidators.rangeLength([2, 11])),
            telefono1: new FormControl('', CustomValidators.number),
            telefono2: new FormControl('', CustomValidators.number),
        });
        
    }


    ngOnInit() {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        // a
        //Declaracion de la bs para que mueste datos_grilla al cargar la pag en 5 segundos.
        let metodos = new Metodos();
        $('#dt_cliente').bootstrapTable({
            columns: [

                { title: "N°", field: "id_cliente", halign: "center", valign: "middle" },
                { title: "Cliente", field: "tipo_cliente", halign: "center", valign: "middle" },
                { title: "Nombre", field: "nombre_razon", halign: "center", valign: "middle" },
                { title: "Direccion", field: "direccion", halign: "center", valign: "middle" },
                { title: "Documento.", field: "dni_ruc", halign: "center", valign: "middle" },
                { title: "Estado", field: "estado_descripcion", halign: "center", valign: "middle", formatter: this.Semaforo_Estado },
            ],
            data: this.datos_grilla,
            onDblClickRow: function (row: any, $element: any) {
                metodos.AbrirModalOpciones(row);
            },
        });
    }
    
    Ingresar(): void{
        var flg_operacion = Number($('#flg_operacion').val());
        if (flg_operacion == 0) {
            if (this.id_tipo_cliente == 2) {
                this.Grabar_Juridico();
            }
            else {
                this.Grabar_Natural();
            }

        } else {
            if (this.id_tipo_cliente == 2) {
                this.Editar_Juridico();
            }
            else {
                this.Editar_Natural();
            }
        }
    }


    Editar_Juridico() {
        var edicion: any;
        var body = {
            id_cliente: Number.parseInt($('#id_cliente').val()),
            razonSocial: this.juridico.get('razonSocial').value,
            nComercial: this.juridico.get('nComercial').value,
            ruc: this.juridico.get('ruc').value,
            email: this.comun.get('email').value,
            direccion: this.comun.get('direccion').value,
            referencia: this.comun.get('referencia').value,
            telefono1: this.juridico.get('telefono1').value,
            telefono2: this.juridico.get('telefono2').value,
            id_tipo_cliente: this.comun.get('id_tipo_cliente').value
        };

        this._clienteService.EditarClienteJuridico(body).subscribe(
            data => {
                edicion = data;
                if (edicion == true) {
                    $('#dlgAgregarCliente').modal('hide');
                    alertify.success("Se editó correctamente");
                    this.comun.reset();
                    this.natural.reset();
                    this.juridico.reset();
                    this.Buscar_Cliente();
                    $('#flg_operacion').val(0);
                } else {
                    alertify.error("El registro no editó.");
                }
            }
        ); 

    }

    Editar_Natural() {
        var edicion: any;

        var body = {
            id_cliente: Number.parseInt($('#id_cliente').val()),
            nombre: this.natural.get('nombre').value,
            ape_paterno: this.natural.get('ape_paterno').value,
            ape_materno: this.natural.get('ape_materno').value,
            dni: this.natural.get('dni').value,
            sexo: this.natural.get('sexo').value,
            email: this.comun.get('email').value,
            direccion: this.comun.get('direccion').value,
            referencia: this.comun.get('referencia').value,
            telefono: this.natural.get('telefono').value,
            celular: this.natural.get('celular').value,
            id_tipo_cliente: this.comun.get('id_tipo_cliente').value
        };

        this._clienteService.EditarCliente(body).subscribe(
            data => {
                edicion = data;
                if (edicion == true) {
                    $('#dlgAgregarCliente').modal('hide');
                    alertify.success("Se editó correctamente");
                    this.comun.reset();
                    this.natural.reset();
                    this.juridico.reset();
                    this.Buscar_Cliente();
                    $('#flg_operacion').val(0);
                } else {
                    alertify.error("El registro no editó.");
                }
            }
        ); 
    }

    Grabar_Juridico() {
        
        var body = {
            razonSocial: this.juridico.get('razonSocial').value,
            nComercial: this.juridico.get('nComercial').value,
            ruc: this.juridico.get('ruc').value,
            email: this.comun.get('email').value,
            direccion: this.comun.get('direccion').value,
            referencia: this.comun.get('referencia').value,
            telefono1: this.juridico.get('telefono1').value,
            telefono2: this.juridico.get('telefono2').value,
            id_tipo_cliente: this.comun.get('id_tipo_cliente').value
        };
            var ingreso: any;
            this._clienteService.RegistrarJuridico(body).subscribe(
                data => {
                    ingreso = data;
                    if (ingreso == true) {
                        $('#dlgAgregarCliente').modal('hide');
                        alertify.success("Se registró correctamente");
                        this.comun.reset();
                        this.natural.reset();
                        this.juridico.reset();
                   
                    } else {
                        alertify.error("El registro no se guardó, Cliente Juridico ya registrado.");
                    }
                }
            );
        }
        
    Grabar_Natural() {

        var body = {
            nombre: this.natural.get('nombre').value,
            ape_paterno: this.natural.get('ape_paterno').value,
            ape_materno: this.natural.get('ape_materno').value,
            dni: this.natural.get('dni').value,
            sexo: this.natural.get('sexo').value,
            email: this.comun.get('email').value,
            direccion: this.comun.get('direccion').value,
            referencia: this.comun.get('referencia').value,
            telefono: this.natural.get('telefono').value,
            celular: this.natural.get('celular').value,
            id_tipo_cliente: this.comun.get('id_tipo_cliente').value
        };
    
        var ingreso: any;
        this._clienteService.RegistrarCliente(body).subscribe(
            data => {
                ingreso = data;
                if (ingreso == true) {
                    $('#dlgAgregarCliente').modal('hide');
                    alertify.success("Se registró correctamente");
                    this.comun.reset();
                    this.natural.reset();
                    this.juridico.reset();
                    this.Buscar_Cliente();
                    $('#flg_operacion').val(0);
                }

                else {
                    alertify.error("El registro no se guardó, Cliente ya registrado.");
                        }
            }
        );
    }
    
    Buscar_Cliente() {
        var componente = this;
        var data_grilla_filtrada;
        console.log('filtro cliente:'+ this.id_tipo_cliente_filtro)
        if (this.id_tipo_cliente_filtro == 1) {
            this._clienteService.BuscarCliente(this.filtro_descripcion, this.id_tipo_cliente_filtro)
                .subscribe(data => {
                    console.log("data", data);
                    data_grilla_filtrada = data == null ? [] : data;
                    $('#dt_cliente').bootstrapTable("load", data_grilla_filtrada);
                });
        } else if (this.id_tipo_cliente_filtro == 2) {
            this._clienteService.BuscarClienteJuridico(this.filtro_descripcion, this.id_tipo_cliente_filtro)
                .subscribe(data => {
                    console.log("data", data);
                    data_grilla_filtrada = data == null ? [] : data;
                    $('#dt_cliente').bootstrapTable("load", data_grilla_filtrada);
                });
        } else {
            alertify.error("ERROR");
        }
        
    }

    Eliminar_Registro(modalConfirm: string) {
        var id_cliente = Number.parseInt($('#id_cliente').val());
        var tipo_cliente = $('#tipocliente').val();;
        var edicion: any;
        this._clienteService.EliminarCliente(id_cliente, tipo_cliente).subscribe(data => {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                this.Buscar_Cliente();
                alertify.success("Se eliminó correctamente");

            } else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });

    }

      
    Editar_Registro(modalRegistro: string, modalOpciones: string) {
        $(modalOpciones).modal('hide');

        var id_cliente = Number.parseInt($('#id_cliente').val());;
        var tipo_cliente = $('#tipocliente').val();
        
        this.metodoVista();
        $('#cbo_tipo_cliente').prop("disabled", true);

        if (tipo_cliente == 'Natural') {
            this._clienteService.ObtenerDatosCliente(id_cliente).subscribe((data) => {
                
                this.id_tipo_cliente = data[0].id_tipo_cliente;
                this.select_sexo = data[0].sexo;
                this.nombre = data[0].nombre;
                this.ape_paterno = data[0].ape_paterno;
                this.ape_materno = data[0].ape_materno;
                this.dni = data[0].dni;
                this.direccion = data[0].direccion;
                this.email = data[0].email;
             //   this.direccion = data[0].direccion;
                this.referencia = data[0].referencia;
                this.telefono = data[0].telefono;
                this.celular = data[0].celular;
                this.id_estado = data[0].id_estado;


                //AGREGAMOS CONTROLES: CAMPO CLIENTE NATURAL
                this.natural.addControl('nombre', new FormControl('', CustomValidators.rangeLength([2, 30])));
                this.natural.addControl('ape_paterno', new FormControl('', CustomValidators.rangeLength([2, 15])));
                this.natural.addControl('ape_materno', new FormControl('', CustomValidators.rangeLength([2, 15])));
                this.natural.addControl('sexo', new FormControl());
                this.natural.addControl('dni', new FormControl('', CustomValidators.number));
                this.natural.addControl('telefono', new FormControl('', CustomValidators.number));
                this.natural.addControl('celular', new FormControl('', CustomValidators.number));

                //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE JURIDICO
                this.juridico.removeControl('razonSocial');
                this.juridico.removeControl('nComercial');
                this.juridico.removeControl('ruc');
                this.juridico.removeControl('telefono1');
                this.juridico.removeControl('telefono2');


                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
                
            });
        } else {
            this._clienteService.ObtenerDatosClienteJuridico(id_cliente).subscribe((data) => {
                
                this.id_tipo_cliente = data[0].id_tipo_cliente;
                this.razonSocial = data[0].razonSocial;
                this.nComercial = data[0].nComercial;
                this.ruc = data[0].ruc;
                this.direccion = data[0].direccion;
                this.email = data[0].email;
               // this.direccion = data[0].direccion;
                this.referencia = data[0].referencia;
                this.telefono1 = data[0].telefono1;
                this.telefono2 = data[0].telefono2;
                this.celular = data[0].celular;
                this.id_estado = data[0].id_estado;



                //AGREGAMOS CONTROLES: CAMPO CLIENTE JURIDICO
                this.juridico.addControl('razonSocial', new FormControl('', CustomValidators.rangeLength([2, 30])));
                this.juridico.addControl('nComercial', new FormControl('', CustomValidators.rangeLength([2, 15])));
                this.juridico.addControl('ruc', new FormControl('', CustomValidators.rangeLength([2, 11])));
                this.juridico.addControl('telefono1', new FormControl('', CustomValidators.number));
                this.juridico.addControl('telefono2', new FormControl('', CustomValidators.number));

                //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE NATURAL
                this.natural.removeControl('nombre');
                this.natural.removeControl('ape_paterno');
                this.natural.removeControl('ape_materno');
                this.natural.removeControl('sexo');
                this.natural.removeControl('dni');
                this.natural.removeControl('telefono');
                this.natural.removeControl('celular');
                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
            });
        }



       
    }

    AbrirModalRegistro(modal: string) {
        this.ValoresxDefecto_Form_Cli();
        this.handleSelectedValue();
        $(modal).modal('show');
        $('#cbo_tipo_cliente').prop("disabled", false);
    }

    AbrirModalEliminar(modalEliminar: string, modalOpciones: string) {
        $(modalOpciones).modal('hide');
        $(modalEliminar).modal('show');
    }

    limpieza() {
        //limpieza natural

        this.id_tipo_cliente = 1;
        this.nombre = "";
        this.ape_paterno = "";
        this.ape_materno = "";
        this.dni = "";
        this.direccion = "";
        this.referencia = "";
        this.telefono = "";
        this.celular = "";
        this.email = "";

        //limpieza juridico
        this.nComercial = "";
        this.razonSocial = "";
        this.telefono1 = "";
        this.telefono2 = "";
        this.ruc = "";
    }

    ValoresxDefecto_Form_Cli() {
        $('#flg_operacion').val(0);
        //let today: Date = new Date();
        this.id_estado = 1;
        this.id_tipo_cliente = 1;

        this.select_sexo = "M";

        //limpieza natural
        this.nombre = "";
        this.ape_paterno = "";
        this.ape_materno = "";
        this.dni = "";
        this.direccion = "";
        this.referencia = "";
        this.telefono = "";
        this.celular = "";
        this.email = "";

        //limpieza juridico
        this.nComercial = "";
        this.razonSocial = "";
        this.telefono1 = "";
        this.telefono2 = "";
        this.ruc = "";

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
        this.id_tipo_cliente_filtro = 1;
    }


   

    metodoVista() {
        return this.id_tipo_cliente == 1;
    }

    handleSelectedValue() {
        console.log(this.id_tipo_cliente);

        if (this.id_tipo_cliente == 1) {
            //AGREGAMOS CONTROLES: CAMPO CLIENTE NATURAL
            this.natural.addControl('nombre', new FormControl('', CustomValidators.rangeLength([2, 30])));
            this.natural.addControl('ape_paterno', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.natural.addControl('ape_materno', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.natural.addControl('sexo', new FormControl());
            this.natural.addControl('dni', new FormControl('', CustomValidators.number));
            this.natural.addControl('telefono', new FormControl('', CustomValidators.number));
            this.natural.addControl('celular', new FormControl('', CustomValidators.number));
            
            //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE JURIDICO
            this.juridico.removeControl('razonSocial');
            this.juridico.removeControl('nComercial');
            this.juridico.removeControl('ruc');
            this.juridico.removeControl('telefono1');
            this.juridico.removeControl('telefono2');



         
            ////limpieza natural
            //this.nombre = "";
            //this.ape_paterno = "";
            //this.ape_materno = "";
            //this.dni = "";
            //this.direccion = "";
            //this.referencia = "";
            //this.telefono = "";
            //this.celular = "";
            //this.email = "";
            //this.select_sexo = "M";

            ////limpieza juridico
            //this.nComercial = "";
            //this.razonSocial = "";
            //this.telefono1 = "";
            //this.telefono2 = "";
            //this.ruc = "";


        } else {
            //AGREGAMOS CONTROLES: CAMPO CLIENTE JURIDICO
            this.juridico.addControl('razonSocial', new FormControl('', CustomValidators.rangeLength([2, 30])));
            this.juridico.addControl('nComercial', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.juridico.addControl('ruc', new FormControl('', CustomValidators.rangeLength([2, 11])));
            this.juridico.addControl('telefono1', new FormControl('', CustomValidators.number));
            this.juridico.addControl('telefono2', new FormControl('', CustomValidators.number));

            //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE NATURAL
            this.natural.removeControl('nombre');
            this.natural.removeControl('ape_paterno');
            this.natural.removeControl('ape_materno');
            this.natural.removeControl('sexo');
            this.natural.removeControl('dni');
            this.natural.removeControl('telefono');
            this.natural.removeControl('celular');


            
            ////limpieza natural
            //this.nombre = "";
            //this.ape_paterno = "";
            //this.ape_materno = "";
            //this.dni = "";
            //this.direccion = "";
            //this.referencia = "";
            //this.telefono = "";
            //this.celular = "";
            //this.email = "";

            ////limpieza juridico
            //this.nComercial = "";
            //this.razonSocial = "";
            //this.telefono1 = "";
            //this.telefono2 = "";
            //this.ruc = "";

        }
    }

}

export class Metodos {
    constructor() { }
    AbrirModalOpciones(row: any) {
        $('#id_cliente').val(row.id_cliente);
        $('#tipocliente').val(row.tipo_cliente);
        $('#dlgEditarEliminar').modal('show');
    }
}