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
var cliente_service_1 = require("./cliente.service");
var assets_service_1 = require("../../assets.service");
var forms_1 = require("@angular/forms");
var ng2_validation_1 = require("ng2-validation");
//TEMPLATE
var ClienteComponent = (function () {
    function ClienteComponent(_clienteService, _assetsService, formB, elRef) {
        var _this = this;
        this._clienteService = _clienteService;
        this._assetsService = _assetsService;
        this.formB = formB;
        this.elRef = elRef;
        // El ngModel
        this.tipocliente = null;
        this.cliente = null;
        //En caso de necesidad, si desean ejecutar funciones antes del ngOnInit(),
        //las puede declarar aqui dentro del constructor
        var data_grilla;
        // ESTADO [ACTIVO - INACTIVO]
        var response = this._clienteService.ListarEstado(this.estado).subscribe(function (res) {
            _this.estado = res;
            _this.id_estado = 1;
        });
        //Combo Tipo_Cliente
        var response = this._clienteService.ListarTipoCliente(this.tipocliente)
            .subscribe(function (res) {
            _this.tipocliente = res;
            _this.id_tipo_cliente_filtro = 1;
        });
        //Grilla
        var response_grilla = this._clienteService.BuscarCliente(null, 0)
            .subscribe(function (data) {
            _this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_cliente').bootstrapTable("load", data_grilla);
        });
        //Llenar Combo SEXO desde un ARCHIVO JSON
        this._assetsService.ListarSexo().subscribe(function (data) {
            _this.sexo = data;
            _this.select_sexo = "M";
        });
        //Validación de cada input del POPUP
        this.comun = new forms_1.FormGroup({
            id_tipo_cliente: new forms_1.FormControl(),
            email: new forms_1.FormControl('', ng2_validation_1.CustomValidators.email),
            id_estado: new forms_1.FormControl(),
            direccion: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 45])),
            referencia: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 20])),
        });
        this.natural = new forms_1.FormGroup({
            //Natural
            nombre: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])),
            ape_paterno: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            ape_materno: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            //id_tipo_cliente: new FormControl(),
            sexo: new forms_1.FormControl(),
            dni: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            //email: new FormControl('', CustomValidators.email),
            //id_estado: new FormControl(),
            //direccion: new FormControl('', CustomValidators.rangeLength([2, 45])),
            //referencia: new FormControl('', CustomValidators.rangeLength([2, 25])),
            telefono: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            celular: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
        });
        this.juridico = new forms_1.FormGroup({
            //Juridico
            razonSocial: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])),
            nComercial: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            ruc: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 11])),
            telefono1: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            telefono2: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
        });
    }
    ClienteComponent.prototype.ngOnInit = function () {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        // a
        //Declaracion de la bs para que mueste datos_grilla al cargar la pag en 5 segundos.
        var metodos = new Metodos();
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
            onDblClickRow: function (row, $element) {
                metodos.AbrirModalOpciones(row);
            },
        });
    };
    ClienteComponent.prototype.Ingresar = function () {
        var flg_operacion = Number($('#flg_operacion').val());
        if (flg_operacion == 0) {
            if (this.id_tipo_cliente == 2) {
                this.Grabar_Juridico();
            }
            else {
                this.Grabar_Natural();
            }
        }
        else {
            if (this.id_tipo_cliente == 2) {
                this.Editar_Juridico();
            }
            else {
                this.Editar_Natural();
            }
        }
    };
    ClienteComponent.prototype.Editar_Juridico = function () {
        var _this = this;
        var edicion;
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
        this._clienteService.EditarClienteJuridico(body).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $('#dlgAgregarCliente').modal('hide');
                alertify.success("Se editó correctamente");
                _this.comun.reset();
                _this.natural.reset();
                _this.juridico.reset();
                _this.Buscar_Cliente();
                $('#flg_operacion').val(0);
            }
            else {
                alertify.error("El registro no editó.");
            }
        });
    };
    ClienteComponent.prototype.Editar_Natural = function () {
        var _this = this;
        var edicion;
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
        this._clienteService.EditarCliente(body).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $('#dlgAgregarCliente').modal('hide');
                alertify.success("Se editó correctamente");
                _this.comun.reset();
                _this.natural.reset();
                _this.juridico.reset();
                _this.Buscar_Cliente();
                $('#flg_operacion').val(0);
            }
            else {
                alertify.error("El registro no editó.");
            }
        });
    };
    ClienteComponent.prototype.Grabar_Juridico = function () {
        var _this = this;
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
        var ingreso;
        this._clienteService.RegistrarJuridico(body).subscribe(function (data) {
            ingreso = data;
            if (ingreso == true) {
                $('#dlgAgregarCliente').modal('hide');
                alertify.success("Se registró correctamente");
                _this.comun.reset();
                _this.natural.reset();
                _this.juridico.reset();
            }
            else {
                alertify.error("El registro no se guardó, Cliente Juridico ya registrado.");
            }
        });
    };
    ClienteComponent.prototype.Grabar_Natural = function () {
        var _this = this;
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
        var ingreso;
        this._clienteService.RegistrarCliente(body).subscribe(function (data) {
            ingreso = data;
            if (ingreso == true) {
                $('#dlgAgregarCliente').modal('hide');
                alertify.success("Se registró correctamente");
                _this.comun.reset();
                _this.natural.reset();
                _this.juridico.reset();
                _this.Buscar_Cliente();
                $('#flg_operacion').val(0);
            }
            else {
                alertify.error("El registro no se guardó, Cliente ya registrado.");
            }
        });
    };
    ClienteComponent.prototype.Buscar_Cliente = function () {
        var componente = this;
        var data_grilla_filtrada;
        console.log('filtro cliente:' + this.id_tipo_cliente_filtro);
        if (this.id_tipo_cliente_filtro == 1) {
            this._clienteService.BuscarCliente(this.filtro_descripcion, this.id_tipo_cliente_filtro)
                .subscribe(function (data) {
                console.log("data", data);
                data_grilla_filtrada = data == null ? [] : data;
                $('#dt_cliente').bootstrapTable("load", data_grilla_filtrada);
            });
        }
        else if (this.id_tipo_cliente_filtro == 2) {
            this._clienteService.BuscarClienteJuridico(this.filtro_descripcion, this.id_tipo_cliente_filtro)
                .subscribe(function (data) {
                console.log("data", data);
                data_grilla_filtrada = data == null ? [] : data;
                $('#dt_cliente').bootstrapTable("load", data_grilla_filtrada);
            });
        }
        else {
            alertify.error("ERROR");
        }
    };
    ClienteComponent.prototype.Eliminar_Registro = function (modalConfirm) {
        var _this = this;
        var id_cliente = Number.parseInt($('#id_cliente').val());
        var tipo_cliente = $('#tipocliente').val();
        ;
        var edicion;
        this._clienteService.EliminarCliente(id_cliente, tipo_cliente).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                _this.Buscar_Cliente();
                alertify.success("Se eliminó correctamente");
            }
            else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });
    };
    ClienteComponent.prototype.Editar_Registro = function (modalRegistro, modalOpciones) {
        var _this = this;
        $(modalOpciones).modal('hide');
        var id_cliente = Number.parseInt($('#id_cliente').val());
        ;
        var tipo_cliente = $('#tipocliente').val();
        this.metodoVista();
        $('#cbo_tipo_cliente').prop("disabled", true);
        if (tipo_cliente == 'Natural') {
            this._clienteService.ObtenerDatosCliente(id_cliente).subscribe(function (data) {
                _this.id_tipo_cliente = data[0].id_tipo_cliente;
                _this.select_sexo = data[0].sexo;
                _this.nombre = data[0].nombre;
                _this.ape_paterno = data[0].ape_paterno;
                _this.ape_materno = data[0].ape_materno;
                _this.dni = data[0].dni;
                _this.direccion = data[0].direccion;
                _this.email = data[0].email;
                //   this.direccion = data[0].direccion;
                _this.referencia = data[0].referencia;
                _this.telefono = data[0].telefono;
                _this.celular = data[0].celular;
                _this.id_estado = data[0].id_estado;
                //AGREGAMOS CONTROLES: CAMPO CLIENTE NATURAL
                _this.natural.addControl('nombre', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
                _this.natural.addControl('ape_paterno', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
                _this.natural.addControl('ape_materno', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
                _this.natural.addControl('sexo', new forms_1.FormControl());
                _this.natural.addControl('dni', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.natural.addControl('telefono', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.natural.addControl('celular', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE JURIDICO
                _this.juridico.removeControl('razonSocial');
                _this.juridico.removeControl('nComercial');
                _this.juridico.removeControl('ruc');
                _this.juridico.removeControl('telefono1');
                _this.juridico.removeControl('telefono2');
                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
            });
        }
        else {
            this._clienteService.ObtenerDatosClienteJuridico(id_cliente).subscribe(function (data) {
                _this.id_tipo_cliente = data[0].id_tipo_cliente;
                _this.razonSocial = data[0].razonSocial;
                _this.nComercial = data[0].nComercial;
                _this.ruc = data[0].ruc;
                _this.direccion = data[0].direccion;
                _this.email = data[0].email;
                // this.direccion = data[0].direccion;
                _this.referencia = data[0].referencia;
                _this.telefono1 = data[0].telefono1;
                _this.telefono2 = data[0].telefono2;
                _this.celular = data[0].celular;
                _this.id_estado = data[0].id_estado;
                //AGREGAMOS CONTROLES: CAMPO CLIENTE JURIDICO
                _this.juridico.addControl('razonSocial', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
                _this.juridico.addControl('nComercial', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
                _this.juridico.addControl('ruc', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 11])));
                _this.juridico.addControl('telefono1', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                _this.juridico.addControl('telefono2', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
                //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE NATURAL
                _this.natural.removeControl('nombre');
                _this.natural.removeControl('ape_paterno');
                _this.natural.removeControl('ape_materno');
                _this.natural.removeControl('sexo');
                _this.natural.removeControl('dni');
                _this.natural.removeControl('telefono');
                _this.natural.removeControl('celular');
                $('#flg_operacion').val(1);
                $(modalRegistro).modal('show');
            });
        }
    };
    ClienteComponent.prototype.AbrirModalRegistro = function (modal) {
        this.ValoresxDefecto_Form_Cli();
        this.handleSelectedValue();
        $(modal).modal('show');
        $('#cbo_tipo_cliente').prop("disabled", false);
    };
    ClienteComponent.prototype.AbrirModalEliminar = function (modalEliminar, modalOpciones) {
        $(modalOpciones).modal('hide');
        $(modalEliminar).modal('show');
    };
    ClienteComponent.prototype.limpieza = function () {
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
    };
    ClienteComponent.prototype.ValoresxDefecto_Form_Cli = function () {
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
    };
    ClienteComponent.prototype.Semaforo_Estado = function (value, row, index) {
        var opciones = "";
        if (value === "ACTIVO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else {
            opciones = '<span class="label label-default arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    ClienteComponent.prototype.Limpiar_Filtros = function () {
        this.filtro_descripcion = null;
        this.id_tipo_cliente_filtro = 1;
    };
    ClienteComponent.prototype.metodoVista = function () {
        return this.id_tipo_cliente == 1;
    };
    ClienteComponent.prototype.handleSelectedValue = function () {
        console.log(this.id_tipo_cliente);
        if (this.id_tipo_cliente == 1) {
            //AGREGAMOS CONTROLES: CAMPO CLIENTE NATURAL
            this.natural.addControl('nombre', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
            this.natural.addControl('ape_paterno', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
            this.natural.addControl('ape_materno', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
            this.natural.addControl('sexo', new forms_1.FormControl());
            this.natural.addControl('dni', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            this.natural.addControl('telefono', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            this.natural.addControl('celular', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE JURIDICO
            this.juridico.removeControl('razonSocial');
            this.juridico.removeControl('nComercial');
            this.juridico.removeControl('ruc');
            this.juridico.removeControl('telefono1');
            this.juridico.removeControl('telefono2');
        }
        else {
            //AGREGAMOS CONTROLES: CAMPO CLIENTE JURIDICO
            this.juridico.addControl('razonSocial', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])));
            this.juridico.addControl('nComercial', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])));
            this.juridico.addControl('ruc', new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 11])));
            this.juridico.addControl('telefono1', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            this.juridico.addControl('telefono2', new forms_1.FormControl('', ng2_validation_1.CustomValidators.number));
            //ELIMINAMOS FORMCONTROL: CAMPOS CLIENTE NATURAL
            this.natural.removeControl('nombre');
            this.natural.removeControl('ape_paterno');
            this.natural.removeControl('ape_materno');
            this.natural.removeControl('sexo');
            this.natural.removeControl('dni');
            this.natural.removeControl('telefono');
            this.natural.removeControl('celular');
        }
    };
    return ClienteComponent;
}());
ClienteComponent = __decorate([
    core_1.Component({
        templateUrl: './cliente.component.html',
    }),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService,
        assets_service_1.AssetsService,
        forms_1.FormBuilder,
        core_1.ElementRef])
], ClienteComponent);
exports.ClienteComponent = ClienteComponent;
var Metodos = (function () {
    function Metodos() {
    }
    Metodos.prototype.AbrirModalOpciones = function (row) {
        $('#id_cliente').val(row.id_cliente);
        $('#tipocliente').val(row.tipo_cliente);
        $('#dlgEditarEliminar').modal('show');
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=cliente.component.js.map