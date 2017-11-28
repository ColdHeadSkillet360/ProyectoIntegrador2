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
var empleado_service_1 = require("./empleado.service");
var assets_service_1 = require("../../assets.service");
var forms_1 = require("@angular/forms");
var ng2_validation_1 = require("ng2-validation");
//TEMPLATE
var EmpleadoComponent = (function () {
    function EmpleadoComponent(_assetsService, _empleadoService, elRef, fb) {
        var _this = this;
        this._assetsService = _assetsService;
        this._empleadoService = _empleadoService;
        this.elRef = elRef;
        this.fb = fb;
        this.today = new Date();
        //Opcion de formato para el datapicker
        this.myDatePickerOptions = {
            // other options...
            todayBtnTxt: 'Hoy',
            dateFormat: 'dd/mm/yyyy',
            disableSince: {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate() + 1
            }
        };
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
        var response = this._empleadoService.ListarTipoEmpleado(this.tipoempleado).subscribe(function (res) {
            _this.tipoempleado = res;
            _this.id_tipo_empleado_filtro = 1;
        });
        //Llenar CBO ESTADO [ACTIVO - INACTIVO]
        var response = this._empleadoService.ListarEstado(this.estado).subscribe(function (res) {
            _this.estado = res;
            _this.id_estado = 1;
        });
        //Llenar GRILLA PRINCIPAL
        var response_grilla = this._empleadoService.BuscarEmpleado(null, 0).subscribe(function (data) {
            _this.datos_grilla = data;
            data_grilla = data == null ? [] : data;
            $('#dt_empleado').bootstrapTable("load", data_grilla);
        });
        //Llenar CBO ESTADO CIVIL desde un ARCHIVO JSON
        this._assetsService.ListarEstadoCivil().subscribe(function (data) {
            _this.estadocivil = data;
            _this.estado_civil = "SOLTERO";
        });
        //Llenar CBO SEXO desde un ARCHIVO JSON
        this._assetsService.ListarSexo().subscribe(function (data) {
            _this.sexo = data;
            _this.select_sexo = "M";
        });
        //Validación de cada input del POPUP
        this.emp = new forms_1.FormGroup({
            nombres: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 30])),
            ape_paterno: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            ape_materno: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 15])),
            id_tipo_empleado: new forms_1.FormControl(),
            sexo: new forms_1.FormControl(),
            id_estado: new forms_1.FormControl(),
            estado_civil: new forms_1.FormControl(),
            fecha_nacimiento: new forms_1.FormControl(null, forms_1.Validators.required),
            dni: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            direccion: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 45])),
            departamento: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 25])),
            provincia: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 25])),
            distrito: new forms_1.FormControl('', ng2_validation_1.CustomValidators.rangeLength([2, 25])),
            telefono: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            celular: new forms_1.FormControl('', ng2_validation_1.CustomValidators.number),
            email: new forms_1.FormControl('', ng2_validation_1.CustomValidators.email)
        });
    }
    //METODO INICIAL:
    EmpleadoComponent.prototype.ngOnInit = function () {
        //Aqui se encuentran el llamado a las funciones cada vez que se inicia
        //este componente(cuando se carga la pagina).
        //var rower;
        var metodosIns = new Metodos();
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
            onDblClickRow: function (row, $element) {
                metodosIns.AbrirModalOpciones(row);
            },
        });
    };
    //METODOS FUNCIONALES:
    EmpleadoComponent.prototype.Grabar_Empleado = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value.id_estado = Number(value.id_estado);
        value.id_tipo_empleado = Number(value.id_tipo_empleado);
        value.fecha_nacimiento = this.fecha;
        var flg_operacion = Number($('#flg_operacion').val());
        if (flg_operacion == 0) {
            var ingreso;
            this._empleadoService.RegistrarEmpleado(value).subscribe(function (data) {
                ingreso = data;
                if (ingreso == true) {
                    $('#dlgAgregarEmpleado').modal('hide');
                    alertify.success("Se registró correctamente");
                    _this.emp.reset();
                    _this.Buscar_Empleado();
                    $('#flg_operacion').val(0);
                }
                else {
                    alertify.error("El registro no se guardó, empleado ya registrado.");
                }
            });
        }
        else {
            var edicion;
            value.id_empleado = Number.parseInt($('#id_empleado').val());
            ;
            this._empleadoService.EditarEmpleado(value).subscribe(function (data) {
                edicion = data;
                if (edicion == true) {
                    $('#dlgAgregarEmpleado').modal('hide');
                    alertify.success("Se editó correctamente");
                    _this.emp.reset();
                    _this.Buscar_Empleado();
                    $('#flg_operacion').val(0);
                }
                else {
                    alertify.error("El registro no editó.");
                }
            });
        }
    };
    EmpleadoComponent.prototype.Buscar_Empleado = function () {
        var componente = this;
        var data_grilla_filtrada;
        var response_grilla = this._empleadoService.BuscarEmpleado(this.filtro_descripcion, this.id_tipo_empleado_filtro)
            .subscribe(function (data) {
            data_grilla_filtrada = data == null ? [] : data;
            $('#dt_empleado').bootstrapTable("load", data_grilla_filtrada);
        });
    };
    EmpleadoComponent.prototype.Eliminar_Registro = function (modalConfirm) {
        var _this = this;
        var id_empleado = Number.parseInt($('#id_empleado').val());
        var edicion;
        this._empleadoService.EliminarEmpleado(id_empleado).subscribe(function (data) {
            edicion = data;
            if (edicion == true) {
                $(modalConfirm).modal('hide');
                alertify.success("Se eliminó correctamente");
                _this.Buscar_Empleado();
            }
            else {
                $(modalConfirm).modal('hide');
                alertify.success("No se pudo eliminar correctamente");
            }
        });
    };
    EmpleadoComponent.prototype.Editar_Registro = function (modalRegistro, modalOpciones) {
        var _this = this;
        $(modalOpciones).modal('hide');
        var id_empleado = Number.parseInt($('#id_empleado').val());
        ;
        this._empleadoService.ObtenerDatosEmpleado(id_empleado).subscribe(function (data) {
            _this.id_tipo_empleado = data[0].id_tipo_empleado;
            var fields = data[0].fecha_nacimiento.split('/');
            //var str = this.empleado.fecha_nacimiento;
            //var splitted = str.split("/");
            _this.fecha_nac = {
                date: {
                    day: fields[0],
                    month: fields[1],
                    year: fields[2]
                }
            };
            _this.estado_civil = data[0].estado_civil;
            _this.select_sexo = data[0].sexo;
            _this.nombres = data[0].nombres;
            _this.ape_paterno = data[0].ape_paterno;
            _this.ape_materno = data[0].ape_materno;
            _this.dni = data[0].dni;
            _this.direccion = data[0].direccion;
            _this.departamento = data[0].departamento;
            _this.provincia = data[0].provincia;
            _this.distrito = data[0].distrito;
            _this.telefono = data[0].telefono;
            _this.celular = data[0].celular;
            _this.email = data[0].email;
            _this.id_estado = data[0].id_estado;
            $('#flg_operacion').val(1);
            $(modalRegistro).modal('show');
        });
    };
    //METODOS SECUNDARIOS:
    EmpleadoComponent.prototype.AbrirModalRegistro = function (modal) {
        this.ValoresxDefecto_Form_Emp();
        $(modal).modal('show');
    };
    EmpleadoComponent.prototype.AbrirModalEliminar = function (modalEliminar, modalOpciones) {
        $(modalOpciones).modal('hide');
        $(modalEliminar).modal('show');
    };
    EmpleadoComponent.prototype.ValoresxDefecto_Form_Emp = function () {
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
    };
    EmpleadoComponent.prototype.Semaforo_Estado = function (value, row, index) {
        var opciones = "";
        if (value === "ACTIVO") {
            opciones = '<span class="label label-success arrowed-right arrowed-in">' + value + '</span>';
        }
        else {
            opciones = '<span class="label label-default arrowed-right arrowed-in">' + value + '</span>';
        }
        return opciones;
    };
    EmpleadoComponent.prototype.Limpiar_Filtros = function () {
        this.filtro_descripcion = null;
        this.id_tipo_empleado_filtro = 1;
    };
    return EmpleadoComponent;
}());
EmpleadoComponent = __decorate([
    core_1.Component({
        templateUrl: './empleado.component.html'
    }),
    __metadata("design:paramtypes", [assets_service_1.AssetsService,
        empleado_service_1.EmpleadoService,
        core_1.ElementRef,
        forms_1.FormBuilder])
], EmpleadoComponent);
exports.EmpleadoComponent = EmpleadoComponent;
var Metodos = (function () {
    function Metodos() {
    }
    Metodos.prototype.AbrirModalOpciones = function (row) {
        $('#id_empleado').val(row.id_empleado);
        $('#dlgEditarEliminar').modal('show');
    };
    return Metodos;
}());
exports.Metodos = Metodos;
//# sourceMappingURL=empleado.component.js.map