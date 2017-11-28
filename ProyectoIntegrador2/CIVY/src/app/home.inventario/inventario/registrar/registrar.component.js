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
/// <reference path="../../../home.admin/cliente/comun.ts" />
var core_1 = require("@angular/core");
var producto_service_1 = require("../producto.service");
var forms_1 = require("@angular/forms");
var assets_service_1 = require("../../../assets.service");
var ng2_validation_1 = require("ng2-validation");
//TEMPLATE
var RegistrarInventarioComponent = (function () {
    function RegistrarInventarioComponent(_assetsService, _productoService, elRef, fb) {
        var _this = this;
        this._assetsService = _assetsService;
        this._productoService = _productoService;
        this.elRef = elRef;
        this.fb = fb;
        this.today = new Date();
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;
        //let today: Date = new Date();
        //Llenar CBO TIPO PRODUCTO
        var response = this._productoService.ListarTipoProducto(this.tipoproducto).subscribe(function (res) {
            _this.tipoproducto = res;
            _this.id_tipo_producto = 1;
        });
        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._productoService.ListarEstado(this.estado).subscribe(function (res) {
            _this.estado = res;
            _this.id_estado = 1;
        });
        //Llenar GRILLA PRINCIPAL
        /*  var response_grilla = this._productoService.BuscarProducto(null, 0).subscribe(data => {
              this.datos_grilla = data;
              data_grilla = data == null ? [] : data;
              $('#dt_producto').bootstrapTable("load", data_grilla);
          });*/
        //Validación de cada input del POPUP
        this.pro = new forms_1.FormGroup({
            marca: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            modelo: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            stock: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            unidad_medida: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 45])),
        });
        this.comunServ = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])),
            precio: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            codigo: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([9, 10])),
            id_tipo_producto: new forms_1.FormControl(),
            id_estado: new forms_1.FormControl(),
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
    RegistrarInventarioComponent.prototype.metodoVista = function () {
        return this.id_tipo_producto == 1;
    };
    //METODOS FUNCIONALES:
    RegistrarInventarioComponent.prototype.Limpiar_Filtros = function () {
        this.filtro_descripcion = null;
        this.descripcion = null;
    };
    RegistrarInventarioComponent.prototype.limpiar_campos = function () {
        this.descripcion = null,
            this.marca = null,
            this.modelo = null,
            this.stock = null,
            this.unidad_medida = null,
            this.precio = null,
            this.codigo = null;
        //   this.id_tipo_producto = 1
    };
    RegistrarInventarioComponent.prototype.Grabar = function () {
        if (this.id_tipo_producto == 2) {
            this.Grabar_Servicio();
        }
        else {
            this.Grabar_Producto();
        }
    };
    RegistrarInventarioComponent.prototype.Grabar_Producto = function () {
        var _this = this;
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
        var ingreso;
        this._productoService.RegistrarProducto(body).subscribe(function (data) {
            ingreso = data;
            if (ingreso == true) {
                alertify.success("Se registró correctamente");
                _this.limpiar_campos();
            }
            else {
                alertify.error("El registro no se guardó, Producto ya registrado.");
            }
        });
    };
    RegistrarInventarioComponent.prototype.Grabar_Servicio = function () {
        var _this = this;
        var body = {
            descripcion: this.comunServ.get('descripcion').value,
            precio: this.comunServ.get('precio').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value,
            codigo: this.comunServ.get('codigo').value,
        };
        var ingreso;
        this._productoService.RegistrarServicio(body).subscribe(function (data) {
            ingreso = data;
            if (ingreso == true) {
                alertify.success("Se registró correctamente");
                _this.limpiar_campos();
            }
            else {
                alertify.error("El registro no se guardó, Producto ya registrado.");
            }
        });
    };
    RegistrarInventarioComponent.prototype.handleSelectedValue = function () {
        console.log(this.id_tipo_producto);
        if (this.id_tipo_producto == 2) {
            //AGREGAMOS CONTROLES: CAMPO SERVICIO
            this.comunServ.addControl('descripcion', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
            this.comunServ.addControl('precio', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            this.comunServ.addControl('codigo', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([9, 10])));
            //ELIMINAMOS FORMCONTROL: CAMPOS PRODUCTO
            this.pro.removeControl('marca');
            this.pro.removeControl('modelo');
            this.pro.removeControl('stock');
            this.pro.removeControl('unidad_medida');
        }
        else {
            //AGREGAMOS CONTROLES: CAMPO PRODUCTO
            this.pro.addControl(' marca', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
            this.pro.addControl(' modelo', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
            this.pro.addControl('stock', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            this.pro.addControl('unidad_medida', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 45])));
        }
    };
    return RegistrarInventarioComponent;
}());
RegistrarInventarioComponent = __decorate([
    core_1.Component({
        templateUrl: './registrar.component.html',
    }),
    __metadata("design:paramtypes", [assets_service_1.AssetsService,
        producto_service_1.ProductoService,
        core_1.ElementRef,
        forms_1.FormBuilder])
], RegistrarInventarioComponent);
exports.RegistrarInventarioComponent = RegistrarInventarioComponent;
//# sourceMappingURL=registrar.component.js.map