"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var mydatepicker_1 = require("mydatepicker");
var ng2_validation_1 = require("ng2-validation");
var ng2_completer_1 = require("ng2-completer");
//ASSETS
var assets_service_1 = require("./assets.service");
//ROLES MAIN
var home_admin_component_1 = require("./home.admin/home.admin.component");
var home_ventas_component_1 = require("./home.ventas/home.ventas.component");
var home_inventario_component_1 = require("./home.inventario/home.inventario.component");
var home_consignador_component_1 = require("./home.consignador/home.consignador.component");
//ADMIN
var empleado_component_1 = require("./home.admin/empleado/empleado.component");
var cliente_component_1 = require("./home.admin/cliente/cliente.component");
var usuario_service_1 = require("./usuario.service");
var empleado_service_1 = require("./home.admin/empleado/empleado.service");
var cliente_service_1 = require("./home.admin/cliente/cliente.service");
//COTIZACION
var aprobar_component_1 = require("./home.ventas/cotizacion/aprobar/aprobar.component");
var consultar_component_1 = require("./home.ventas/cotizacion/consultar/consultar.component");
var registrar_component_1 = require("./home.ventas/cotizacion/registrar/registrar.component");
//DOCUMENTO VENTA
var registrar_component_2 = require("./home.ventas/documentoventa/registrar/registrar.component");
var consultar_component_2 = require("./home.ventas/documentoventa/consultar/consultar.component");
var reporte_component_1 = require("./home.ventas/documentoventa/reporte/reporte.component");
var cotizacion_service_1 = require("./home.ventas/cotizacion/cotizacion.service");
//INVENTARIO
var registrar_component_3 = require("./home.inventario/inventario/registrar/registrar.component");
var consultar_component_3 = require("./home.inventario/inventario/consultar/consultar.component");
var producto_service_1 = require("./home.inventario/inventario/producto.service");
//CONSIGNADOR
var consultar_component_4 = require("./home.consignador/guiaremision/consultar/consultar.component");
var registrar_component_4 = require("./home.consignador/guiaremision/registrar/registrar.component");
var resporte_component_1 = require("./home.consignador/guiaremision/reporte/resporte.component");
var vehiculo_component_1 = require("./home.consignador/vehiculo/vehiculo.component");
var vehiculo_service_1 = require("./home.consignador/vehiculo/vehiculo.service");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, mydatepicker_1.MyDatePickerModule,
            forms_1.ReactiveFormsModule, ng2_validation_1.CustomFormsModule, ng2_completer_1.Ng2CompleterModule,
            router_1.RouterModule.forRoot([
                { path: 'home.admin', component: home_admin_component_1.HomeAdminComponent },
                { path: 'home.ventas', component: home_ventas_component_1.HomeVentasComponent },
                { path: 'home.inventario', component: home_inventario_component_1.HomeInventarioComponent },
                { path: 'home.consignador', component: home_consignador_component_1.HomeConsignadorComponent },
                //ADMIN
                { path: 'empleado', component: empleado_component_1.EmpleadoComponent, outlet: 'auxEmpleado' },
                { path: 'cliente', component: cliente_component_1.ClienteComponent, outlet: 'auxCliente' },
                //COTIZACION
                { path: 'registrarCO', component: registrar_component_1.RegistrarCotizacionComponent, outlet: 'auxRegCot' },
                { path: 'consultarCO', component: consultar_component_1.ConsultarCotizacionComponent, outlet: 'auxConCot' },
                { path: 'aprobarCO', component: aprobar_component_1.AprobarCotizacionComponent, outlet: 'auxApbCot' },
                //DOCUMENTO VENTA
                { path: 'registrarDV', component: registrar_component_2.RegistrarDocumentoVentaComponent, outlet: 'auxRegDV' },
                { path: 'consultarDV', component: consultar_component_2.ConsultarDocumentoVentaComponent, outlet: 'auxConDV' },
                { path: 'reporteDV', component: reporte_component_1.ReporteDocumentoVentaComponent, outlet: 'auxRepDV' },
                //INVENTARIO
                { path: 'registrarIn', component: registrar_component_3.RegistrarInventarioComponent, outlet: 'auxRegIn' },
                { path: 'consultarIn', component: consultar_component_3.ConsultarInventarioComponent, outlet: 'auxConIn' },
                //CONSIGNADOR
                { path: 'registrarGR', component: registrar_component_4.RegistrarGuiaRemisionComponent, outlet: 'auxRegGR' },
                { path: 'consultarGR', component: consultar_component_4.ConsultarGuiaRemisionComponent, outlet: 'auxConGR' },
                { path: 'reporteGR', component: resporte_component_1.ReporteGuiaRemisionComponent, outlet: 'auxRepGR' },
                { path: 'crudVeh', component: vehiculo_component_1.VehiculoComponent, outlet: 'auxCrudVeh' },
            ])
        ],
        declarations: [
            app_component_1.AppComponent, home_admin_component_1.HomeAdminComponent,
            home_ventas_component_1.HomeVentasComponent, home_inventario_component_1.HomeInventarioComponent, home_consignador_component_1.HomeConsignadorComponent,
            //COMPONENT ADMIN
            empleado_component_1.EmpleadoComponent, cliente_component_1.ClienteComponent,
            //COMPONENT COTIZACION
            aprobar_component_1.AprobarCotizacionComponent, consultar_component_1.ConsultarCotizacionComponent, registrar_component_1.RegistrarCotizacionComponent,
            //COMPONENT DOCUMENTO VENTA
            registrar_component_2.RegistrarDocumentoVentaComponent, consultar_component_2.ConsultarDocumentoVentaComponent, reporte_component_1.ReporteDocumentoVentaComponent,
            //COMPONENT INVENTARIO
            registrar_component_3.RegistrarInventarioComponent, consultar_component_3.ConsultarInventarioComponent,
            //COMPONENT CONSIGNADOR
            registrar_component_4.RegistrarGuiaRemisionComponent, consultar_component_4.ConsultarGuiaRemisionComponent, resporte_component_1.ReporteGuiaRemisionComponent, vehiculo_component_1.VehiculoComponent,
        ],
        providers: [
            usuario_service_1.UsuarioService,
            empleado_service_1.EmpleadoService,
            cliente_service_1.ClienteService,
            assets_service_1.AssetsService,
            cotizacion_service_1.CotizacionService,
            producto_service_1.ProductoService,
            vehiculo_service_1.VehiculoService,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map