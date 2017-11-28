import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ProductoService } from './../producto.service';
import { Producto } from './../producto';
import { TipoProducto } from './../tipoproducto';
import { AssetsService } from '../../../assets.service';
import { Estado } from '../../../estado';
import { Servicio } from '../servicio';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    templateUrl: './consultar.component.html',
})

export class ConsultarInventarioComponent implements EventInit {


    //ngModel
    producto: Producto;
    tipoproducto: TipoProducto;
    servicio: Servicio;
    estado: Estado;
   

    id_productos: number;

    filtro_descripcion: string;
    id_tipo_producto: number;
    id_tipo_producto_filtro: number;
    descripcion: string;
    marca: string;
    modelo: string;
    stock: string;
    unidad_medida: string;
    precio: string;
    codigo: string;
    id_estado: number;
   
    estado_descripcion: string;
    tipo_producto: string;

    //Nombre del Form
    pro: FormGroup;

    comunServ: FormGroup;
    //GRILLA
    public datos_grilla: Array<any>;

    constructor(private _assetsService: AssetsService,
        private _productoService: ProductoService,
        private elRef: ElementRef,
        private fb: FormBuilder) {
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;

        //Llenar CBO TIPO EMPLEADO
        var response = this._productoService.ListarTipoProducto(this.tipoproducto).subscribe(res => {
            this.tipoproducto = res;
            this.id_tipo_producto_filtro = 1;
        });

        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._productoService.ListarEstado(this.estado).subscribe(res => {
            this.estado = res;
            this.id_estado = 1;
        });

        //Llenar GRILLA PRINCIPAL
        var response_grilla = this._productoService.BuscarProducto(null, 0).subscribe(data => {
            this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_producto').bootstrapTable("load", data_grilla);
        });

        
        //Validación de cada input del POPUP
        this.pro = new FormGroup({

            marca: new FormControl('', CustomValidators.rangeLength([2, 15])),
            modelo: new FormControl('', CustomValidators.rangeLength([2, 15])),

            stock: new FormControl('', CustomValidators.number),
            unidad_medida: new FormControl('', CustomValidators.rangeLength([2, 45])),

        });

        this.comunServ = new FormGroup({
            descripcion: new FormControl('', CustomValidators.rangeLength([2, 30])),
            precio: new FormControl('', CustomValidators.number),
            codigo: new FormControl('', CustomValidators.rangeLength([9, 10])),
            id_tipo_producto: new FormControl(),
            id_estado: new FormControl(),
        });

      


    }

    //METODO INICIAL:
    ngOnInit() {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;

        let metodosIns = new Metodos();
        //Declaracion de la bs para que mueste datos_grilla al cargar la pag en 5 segundos.
        $('#dt_producto').bootstrapTable({
            columns: [
                { title: "Tipo", field: "tipo_producto", halign: "center", valign: "middle" },
                { title: "Codigo.", field: "id_proserv", halign: "center", valign: "middle" },
                { title: "Descripcion.", field: "descripcion", halign: "center", valign: "middle" },
                { title: "Unidad_Medida", field: "unidad_medida", halign: "center", valign: "middle" },
                { title: "Precio", field: "precio", halign: "center", valign: "middle" },
                { title: "Stock", field: "stock", halign: "center", valign: "middle" },
                { title: "Estado", field: "estado_descripcion", halign: "center", valign: "middle", formatter: this.Semaforo_Estado },
            ],
            data: this.datos_grilla,
            onDblClickRow: function (row: any, $element: any) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    }

    
    //METODOS FUNCIONALES:

    metodoVista() {
        return this.id_tipo_producto == 1;
    }

  
    handleSelectedValue() {
        console.log(this.id_tipo_producto);

        if (this.id_tipo_producto == 2) {
            //AGREGAMOS CONTROLES: CAMPO SERVICIO
            this.comunServ.addControl('descripcion', new FormControl('', CustomValidators.rangeLength([2, 30])));
            this.comunServ.addControl('precio', new FormControl('', CustomValidators.number));
            this.comunServ.addControl('codigo', new FormControl('', CustomValidators.rangeLength([9, 10])));

            //ELIMINAMOS FORMCONTROL: CAMPOS PRODUCTO
            this.pro.removeControl('marca');
            this.pro.removeControl('modelo');
            this.pro.removeControl('stock');
            this.pro.removeControl('unidad_medida');


        }
        else {
            //AGREGAMOS CONTROLES: CAMPO PRODUCTO
            this.pro.addControl(' marca', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.pro.addControl(' modelo', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.pro.addControl('stock', new FormControl('', CustomValidators.number));
            this.pro.addControl('unidad_medida', new FormControl('', CustomValidators.rangeLength([2, 45])));


        }
    }




    Ingresar(): void {
        var flg_operacion = Number($('#flg_operacion').val());
      
        if (flg_operacion == 0) {

            if (this.id_tipo_producto == 1) {
              
            }
            else {
                
           
            }

        } else{
                if (this.id_tipo_producto == 2) {
                    this.Editar_Servicio();
                
                }
                else {
                    this.Editar_Producto();


               

                
                }
            }
        }
    
    


    Editar_Producto() {
        var edicion: any;
        var body = {
            id_proserv: Number.parseInt($('#id_proserv').val()),
            descripcion: this.comunServ.get('descripcion').value,
            marca: this.pro.get('marca').value,
            modelo: this.pro.get('modelo').value,
            stock: this.pro.get('stock').value,
            unidad_medida: this.pro.get('unidad_medida').value,
            precio: this.comunServ.get('precio').value,
            codigo: this.comunServ.get('codigo').value,
            id_estado: this.comunServ.get('id_estado').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value
        };

        this._productoService.EditarProducto(body).subscribe(
            data => {
                edicion = data;
                if (edicion == true) {
                    $('#dlgAgregarEmpleado').modal('hide');
                    alertify.success("Se editó correctamente");
                   this.pro.reset();
                    this.comunServ.reset();

                    this.Buscar();
                    $('#flg_operacion').val(0);
                } else {
                    alertify.error("El registro no editó.");
                }
            }
        ); 
    }


    Editar_Servicio() {
        var edicion: any;
        var body = {
            id_proserv: Number.parseInt($('#id_proserv').val()),
            descripcion: this.comunServ.get('descripcion').value,
            precio: this.comunServ.get('precio').value,
            codigo: this.comunServ.get('codigo').value,
            id_estado: this.comunServ.get('id_estado').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value
        };

        this._productoService.EditarServicio(body).subscribe(
            data => {
                edicion = data;
                if (edicion == true) {
                    $('#dlgAgregarEmpleado').modal('hide');
                    alertify.success("Se editó correctamente");
                    this.pro.reset();
                    this.comunServ.reset();
                    this.Buscar();
                  
                  
                    $('#flg_operacion').val(0);
                } else {
                    alertify.error("El registro no editó.");
                }
            }
        );
    }


    Buscar() {
        var componente = this;
        var data_grilla_filtrada;
        console.log('filtro cliente:' + this.id_tipo_producto_filtro)
        if (this.id_tipo_producto_filtro == 1) {
            this._productoService.BuscarProducto(this.filtro_descripcion, this.id_tipo_producto_filtro)
                .subscribe(data => {
                    console.log("data", data);
                    data_grilla_filtrada = data == null ? [] : data;
                    $('#dt_producto').bootstrapTable("load", data_grilla_filtrada);
                });
        } else if (this.id_tipo_producto_filtro == 2) {
            this._productoService.BuscarServicio(this.filtro_descripcion, this.id_tipo_producto_filtro)
                .subscribe(data => {
                    console.log("data", data);
                    data_grilla_filtrada = data == null ? [] : data;
                    $('#dt_producto').bootstrapTable("load", data_grilla_filtrada);
                });
        } else {
            alertify.error("ERROR");
        }

    }

    Eliminar_Registro(modalConfirm: string) {
        var id_productos = Number.parseInt($('#id_proserv').val());
        var tipo_producto = $('#tipoproducto').val();;
        var edicion: any;
        this._productoService.EliminarProducto(id_productos, tipo_producto).subscribe(data => {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                this.Buscar();
                alertify.success("Se eliminó correctamente");
                //   this.Buscar_Cliente();
            } else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });

    }

    Editar_Registro(modalRegistro: string, modalOpciones: string) {
        $(modalOpciones).modal('hide');

        var id_productos = Number.parseInt($('#id_proserv').val());;
        var tipo_producto = $('#tipoproducto').val();
        this.metodoVista();
        
        if (tipo_producto == "PRODUCTO") { 
            this._productoService.ObtenerDatosProducto(id_productos).subscribe(data => {
                console.log(data);
            this.id_tipo_producto = data[0].id_tipo_producto;
            this.descripcion = data[0].descripcion;
            this.marca = data[0].marca;
            this.modelo = data[0].modelo;
            this.stock = data[0].stock;
            this.unidad_medida = data[0].unidad_medida;
            this.precio = data[0].precio;
            this.codigo = data[0].codigo;
            this.id_estado = data[0].id_estado;

            //AGREGAMOS CONTROLES: CAMPO PRODUCTO
            this.pro.addControl('marca', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.pro.addControl('modelo', new FormControl('', CustomValidators.rangeLength([2, 15])));
            this.pro.addControl('stock', new FormControl('', CustomValidators.number));
            this.pro.addControl('unidad_medida', new FormControl('', CustomValidators.rangeLength([2, 45])));
            this.comunServ.addControl('descripcion', new FormControl('', CustomValidators.rangeLength([2, 30])));
            this.comunServ.addControl('precio', new FormControl('', CustomValidators.number));
            this.comunServ.addControl('codigo', new FormControl('', CustomValidators.rangeLength([9, 10])));

            $('#flg_operacion').val(1);
            $(modalRegistro).modal('show');
        });
        }
        else {
            this._productoService.ObtenerDatosServicio(id_productos).subscribe(data => {
                console.log(data);
                this.id_tipo_producto = data[0].id_tipo_producto;
                this.descripcion = data[0].descripcion;
                this.precio = data[0].precio;
                this.codigo = data[0].codigo;
                this.id_estado = data[0].id_estado;


                //AGREGAMOS CONTROLES: CAMPO SERVICIO
                this.comunServ.addControl('descripcion', new FormControl('', CustomValidators.rangeLength([2, 30])));
                this.comunServ.addControl('precio', new FormControl('', CustomValidators.number));
                this.comunServ.addControl('codigo', new FormControl('', CustomValidators.rangeLength([9, 10])));

                //ELIMINAMOS FORMCONTROL: CAMPOS PRODUCTO
                this.pro.removeControl('marca');
                this.pro.removeControl('modelo');
                this.pro.removeControl('stock');
                this.pro.removeControl('unidad_medida');

                

                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');

            });
        }
    }


  
    //METODOS SECUNDARIOS:

    AbrirModalRegistro(modal: string) {
        this.ValoresxDefecto_Form_Emp();
        this.handleSelectedValue();
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
        this.id_tipo_producto = 1;
     

        //limpieza
        this.descripcion = "";
        this.marca = "";
        this.modelo = "";
        this.stock = "";
        this.unidad_medida = "";
        this.precio = "";
        this.codigo = "";
       
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
        this.id_tipo_producto_filtro = 1;
    }


}

export class Metodos {
    constructor() { }
    AbrirModalOpciones(row: any) {
        $('#id_proserv').val(row.id_proserv);
        $('#tipoproducto').val(row.tipo_producto);
        $('#dlgEditarEliminar').modal('show');
    }
}