/// <reference path="../../../home.admin/cliente/comun.ts" />
import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ProductoService } from "../producto.service";
import { TipoProducto } from '../tipoproducto';
import { Producto } from '../producto';
import { Servicio } from '../servicio';
import { Estado } from '../../../estado';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetsService } from '../../../assets.service';
import { CustomValidators } from 'ng2-validation';

declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    templateUrl: './registrar.component.html',
})

export class RegistrarInventarioComponent implements EventInit {

    today: Date = new Date();
    //Opcion de formato para el datapicker

    //ngModel
    producto: Producto;
    servicio: Servicio;
    tipoproducto: TipoProducto;

    estado: Estado;


    //El NGMODEL
    id_productos: number;
    id_tipo_producto_filtro: number;
    filtro_descripcion: string;
    ID_Servicios: number;
    descripcion: string;
    marca: string;
    modelo: string;
    stock: string;
    unidad_medida: string;
    precio: string;
    id_estado: number;
    id_tipo_producto: number;
    estado_descripcion: string;
    tipo_producto: string;
    codigo: string;



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

        //let today: Date = new Date();


        //Llenar CBO TIPO PRODUCTO
        var response = this._productoService.ListarTipoProducto(this.tipoproducto).subscribe(res => {
            this.tipoproducto = res;
            this.id_tipo_producto = 1;
        });

        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._productoService.ListarEstado(this.estado).subscribe(res => {
            this.estado = res;
            this.id_estado = 1;
        });

        //Llenar GRILLA PRINCIPAL
        /*  var response_grilla = this._productoService.BuscarProducto(null, 0).subscribe(data => {
              this.datos_grilla = data;
              data_grilla = data == null ? [] : data;
              $('#dt_producto').bootstrapTable("load", data_grilla);
          });*/





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
    /* ngOnInit() {
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
     }*/


    metodoVista() {
        return this.id_tipo_producto == 1;
    }

    //METODOS FUNCIONALES:
    Limpiar_Filtros() {
        this.filtro_descripcion = null;
        this.descripcion = null;
    }

    limpiar_campos() {
        this.descripcion = null,
            this.marca = null,
            this.modelo = null,
            this.stock = null,
            this.unidad_medida = null,
            this.precio = null,
            this.codigo = null
        //   this.id_tipo_producto = 1
    }

    Grabar(): void {
      
        if (this.id_tipo_producto == 2) {
            this.Grabar_Servicio();


        }
        else {
            this.Grabar_Producto();



        }


    }


    Grabar_Producto() {

        var body = {
            descripcion: this.comunServ.get('descripcion').value,
            marca: this.pro.get('marca').value,
            modelo: this.pro.get('modelo').value,
            stock: this.pro.get('stock').value,
            unidad_medida: this.pro.get('unidad_medida').value,
            precio: this.comunServ.get('precio').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value,
            codigo: this.comunServ.get('codigo').value,
        };

        var ingreso: any;
        this._productoService.RegistrarProducto(body).subscribe(
            data => {
                ingreso = data;
                if (ingreso == true) {

                    alertify.success("Se registró correctamente");
                    this.limpiar_campos();


                } else {
                    alertify.error("El registro no se guardó, Producto ya registrado.");
                }
            }
        );

    }



    Grabar_Servicio() {

        var body = {
            descripcion: this.comunServ.get('descripcion').value,
            precio: this.comunServ.get('precio').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value,
            codigo: this.comunServ.get('codigo').value,
        };

        var ingreso: any;
        this._productoService.RegistrarServicio(body).subscribe(
            data => {
                ingreso = data;
                if (ingreso == true) {

                    alertify.success("Se registró correctamente");
                    this.limpiar_campos();


                } else {
                    alertify.error("El registro no se guardó, Producto ya registrado.");
                }
            }
        );

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


}