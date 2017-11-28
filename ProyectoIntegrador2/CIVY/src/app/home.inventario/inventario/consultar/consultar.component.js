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
var producto_service_1 = require("./../producto.service");
var assets_service_1 = require("../../../assets.service");
var forms_1 = require("@angular/forms");
var ng2_validation_1 = require("ng2-validation");
//TEMPLATE
var ConsultarInventarioComponent = (function () {
    function ConsultarInventarioComponent(_assetsService, _productoService, elRef, fb) {
        var _this = this;
        this._assetsService = _assetsService;
        this._productoService = _productoService;
        this.elRef = elRef;
        this.fb = fb;
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;
        //Llenar CBO TIPO EMPLEADO
        var response = this._productoService.ListarTipoProducto(this.tipoproducto).subscribe(function (res) {
            _this.tipoproducto = res;
            _this.id_tipo_producto_filtro = 1;
        });
        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._productoService.ListarEstado(this.estado).subscribe(function (res) {
            _this.estado = res;
            _this.id_estado = 1;
        });
        //Llenar GRILLA PRINCIPAL
        var response_grilla = this._productoService.BuscarProducto(null, 0).subscribe(function (data) {
            _this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_producto').bootstrapTable("load", data_grilla);
        });
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
    ConsultarInventarioComponent.prototype.ngOnInit = function () {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;
        var metodosIns = new Metodos();
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
            onDblClickRow: function (row, $element) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    };
    //METODOS FUNCIONALES:
    ConsultarInventarioComponent.prototype.metodoVista = function () {
        return this.id_tipo_producto == 1;
    };
    ConsultarInventarioComponent.prototype.handleSelectedValue = function () {
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
    ConsultarInventarioComponent.prototype.Ingresar = function () {
        var flg_operacion = Number($('#flg_operacion').val());
        if (flg_operacion == 0) {
            if (this.id_tipo_producto == 1) {
            }
            else {
            }
        }
        else {
            if (this.id_tipo_producto == 2) {
                this.Editar_Servicio();
            }
            else {
                this.Editar_Producto();
            }
        }
    };
    ConsultarInventarioComponent.prototype.Editar_Producto = function () {
        var _this = this;
        var edicion;
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
        this._productoService.EditarProducto(body).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $('#dlgAgregarEmpleado').modal('hide');
                alertify.success("Se editó correctamente");
                _this.pro.reset();
                _this.comunServ.reset();
                _this.Buscar();
                $('#flg_operacion').val(0);
            }
            else {
                alertify.error("El registro no editó.");
            }
        });
    };
    ConsultarInventarioComponent.prototype.Editar_Servicio = function () {
        var _this = this;
        var edicion;
        var body = {
            id_proserv: Number.parseInt($('#id_proserv').val()),
            descripcion: this.comunServ.get('descripcion').value,
            precio: this.comunServ.get('precio').value,
            codigo: this.comunServ.get('codigo').value,
            id_estado: this.comunServ.get('id_estado').value,
            id_tipo_producto: this.comunServ.get('id_tipo_producto').value
        };
        this._productoService.EditarServicio(body).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $('#dlgAgregarEmpleado').modal('hide');
                alertify.success("Se editó correctamente");
                _this.pro.reset();
                _this.comunServ.reset();
                _this.Buscar();
                $('#flg_operacion').val(0);
            }
            else {
                alertify.error("El registro no editó.");
            }
        });
    };
    ConsultarInventarioComponent.prototype.Buscar = function () {
        var componente = this;
        var data_grilla_filtrada;
        console.log('filtro cliente:' + this.id_tipo_producto_filtro);
        if (this.id_tipo_producto_filtro == 1) {
            this._productoService.BuscarProducto(this.filtro_descripcion, this.id_tipo_producto_filtro)
                .subscribe(function (data) {
                console.log("data", data);
                data_grilla_filtrada = data == null ? [] : data;
                $('#dt_producto').bootstrapTable("load", data_grilla_filtrada);
            });
        }
        else if (this.id_tipo_producto_filtro == 2) {
            this._productoService.BuscarServicio(this.filtro_descripcion, this.id_tipo_producto_filtro)
                .subscribe(function (data) {
                console.log("data", data);
                data_grilla_filtrada = data == null ? [] : data;
                $('#dt_producto').bootstrapTable("load", data_grilla_filtrada);
            });
        }
        else {
            alertify.error("ERROR");
        }
    };
    ConsultarInventarioComponent.prototype.Eliminar_Registro = function (modalConfirm) {
        var _this = this;
        var id_productos = Number.parseInt($('#id_proserv').val());
        var tipo_producto = $('#tipoproducto').val();
        ;
        var edicion;
        this._productoService.EliminarProducto(id_productos, tipo_producto).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                _this.Buscar();
                alertify.success("Se eliminó correctamente");
            }
            else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });
    };
    ConsultarInventarioComponent.prototype.Editar_Registro = function (modalRegistro, modalOpciones) {
        var _this = this;
        $(modalOpciones).modal('hide');
        var id_productos = Number.parseInt($('#id_proserv').val());
        ;
        var tipo_producto = $('#tipoproducto').val();
        this.metodoVista();
        if (tipo_producto == "PRODUCTO") {
            this._productoService.ObtenerDatosProducto(id_productos).subscribe(function (data) {
                console.log(data);
                _this.id_tipo_producto = data[0].id_tipo_producto;
                _this.descripcion = data[0].descripcion;
                _this.marca = data[0].marca;
                _this.modelo = data[0].modelo;
                _this.stock = data[0].stock;
                _this.unidad_medida = data[0].unidad_medida;
                _this.precio = data[0].precio;
                _this.codigo = data[0].codigo;
                _this.id_estado = data[0].id_estado;
                //AGREGAMOS CONTROLES: CAMPO PRODUCTO
                _this.pro.addControl('marca', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
                _this.pro.addControl('modelo', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
                _this.pro.addControl('stock', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.pro.addControl('unidad_medida', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 45])));
                _this.comunServ.addControl('descripcion', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
                _this.comunServ.addControl('precio', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.comunServ.addControl('codigo', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([9, 10])));
                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
            });
        }
        else {
            this._productoService.ObtenerDatosServicio(id_productos).subscribe(function (data) {
                console.log(data);
                _this.id_tipo_producto = data[0].id_tipo_producto;
                _this.descripcion = data[0].descripcion;
                _this.precio = data[0].precio;
                _this.codigo = data[0].codigo;
                _this.id_estado = data[0].id_estado;
                //AGREGAMOS CONTROLES: CAMPO SERVICIO
                _this.comunServ.addControl('descripcion', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
                _this.comunServ.addControl('precio', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.comunServ.addControl('codigo', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([9, 10])));
                //ELIMINAMOS FORMCONTROL: CAMPOS PRODUCTO
                _this.pro.removeControl('marca');
                _this.pro.removeControl('modelo');
                _this.pro.removeControl('stock');
                _this.pro.removeControl('unidad_medida');
                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
            });
        }
    };
    //METODOS SECUNDARIOS:
    ConsultarInventarioComponent.prototype.AbrirModalRegistro = function (modal) {
        this.ValoresxDefecto_Form_Emp();
        this.handleSelectedValue();
        $(modal).modal('show');
    };
    ConsultarInventarioComponent.prototype.AbrirModalEliminar = function (modalEliminar, modalOpciones) {
        $(modalOpciones).modal('hide');
        $(modalEliminar).modal('show');
    };
    ConsultarInventarioComponent.prototype.ValoresxDefecto_Form_Emp = function () {
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
    };
    ConsultarInventarioComponent.prototype.Semaforo_Estado = function (value, row, index) {
        var opciones = "";
        if (value === "ACTIVO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else {
            opciones = '<span class="label label-default arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    ConsultarInventarioComponent.prototype.Limpiar_Filtros = function () {
        this.filtro_descripcion = null;
        this.id_tipo_producto_filtro = 1;
    };
    return ConsultarInventarioComponent;
}());
ConsultarInventarioComponent = __decorate([
    core_1.Component({
        templateUrl: './consultar.component.html',
    }),
    __metadata("design:paramtypes", [assets_service_1.AssetsService,
        producto_service_1.ProductoService,
        core_1.ElementRef,
        forms_1.FormBuilder])
], ConsultarInventarioComponent);
exports.ConsultarInventarioComponent = ConsultarInventarioComponent;
var Metodos = (function () {
    function Metodos() {
    }
    Metodos.prototype.AbrirModalOpciones = function (row) {
        $('#id_proserv').val(row.id_proserv);
        $('#tipoproducto').val(row.tipo_producto);
        $('#dlgEditarEliminar').modal('show');
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=consultar.component.js.map