import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { CustomFormsModule } from 'ng2-validation';
import { Ng2CompleterModule } from "ng2-completer";

//ASSETS
import { AssetsService } from './assets.service';

//ROLES MAIN
import { HomeAdminComponent } from './home.admin/home.admin.component';
import { HomeVentasComponent } from './home.ventas/home.ventas.component';
import { HomeInventarioComponent } from './home.inventario/home.inventario.component';
import { HomeConsignadorComponent } from './home.consignador/home.consignador.component';
//ADMIN
import { EmpleadoComponent } from './home.admin/empleado/empleado.component';
import { ClienteComponent } from './home.admin/cliente/cliente.component';
import { UsuarioService } from './usuario.service';
import { EmpleadoService } from './home.admin/empleado/empleado.service';
import { ClienteService } from './home.admin/cliente/cliente.service';
//COTIZACION
import { AprobarCotizacionComponent } from './home.ventas/cotizacion/aprobar/aprobar.component';
import { ConsultarCotizacionComponent } from './home.ventas/cotizacion/consultar/consultar.component';
import { RegistrarCotizacionComponent } from './home.ventas/cotizacion/registrar/registrar.component';
//DOCUMENTO VENTA
import { RegistrarDocumentoVentaComponent } from './home.ventas/documentoventa/registrar/registrar.component';
import { ConsultarDocumentoVentaComponent } from './home.ventas/documentoventa/consultar/consultar.component';
import { ReporteDocumentoVentaComponent } from './home.ventas/documentoventa/reporte/reporte.component';
import { CotizacionService } from './home.ventas/cotizacion/cotizacion.service';
//INVENTARIO
import { RegistrarInventarioComponent } from './home.inventario/inventario/registrar/registrar.component';
import { ConsultarInventarioComponent } from './home.inventario/inventario/consultar/consultar.component';
import { ProductoService } from './home.inventario/inventario/producto.service';
//CONSIGNADOR
import { ConsultarGuiaRemisionComponent } from './home.consignador/guiaremision/consultar/consultar.component';
import { RegistrarGuiaRemisionComponent } from './home.consignador/guiaremision/registrar/registrar.component';
import { ReporteGuiaRemisionComponent } from './home.consignador/guiaremision/reporte/resporte.component';
import { VehiculoComponent } from './home.consignador/vehiculo/vehiculo.component';
import { VehiculoService } from './home.consignador/vehiculo/vehiculo.service';

import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, MyDatePickerModule,
        ReactiveFormsModule, CustomFormsModule, Ng2CompleterModule,
        RouterModule.forRoot([
            { path: 'home.admin', component: HomeAdminComponent },
            { path: 'home.ventas', component: HomeVentasComponent },
            { path: 'home.inventario', component: HomeInventarioComponent },
            { path: 'home.consignador', component: HomeConsignadorComponent },
            //ADMIN
            { path: 'empleado', component: EmpleadoComponent, outlet: 'auxEmpleado' },
            { path: 'cliente', component: ClienteComponent, outlet: 'auxCliente' },
            //COTIZACION
            { path: 'registrarCO', component: RegistrarCotizacionComponent, outlet: 'auxRegCot' },
            { path: 'consultarCO', component: ConsultarCotizacionComponent, outlet: 'auxConCot' },
            { path: 'aprobarCO', component: AprobarCotizacionComponent, outlet: 'auxApbCot' },
            //DOCUMENTO VENTA
            { path: 'registrarDV', component: RegistrarDocumentoVentaComponent, outlet: 'auxRegDV' },
            { path: 'consultarDV', component: ConsultarDocumentoVentaComponent, outlet: 'auxConDV' },
            { path: 'reporteDV', component: ReporteDocumentoVentaComponent, outlet: 'auxRepDV' },
            //INVENTARIO
            { path: 'registrarIn', component: RegistrarInventarioComponent, outlet: 'auxRegIn' },
            { path: 'consultarIn', component: ConsultarInventarioComponent, outlet: 'auxConIn' },
            //CONSIGNADOR
            { path: 'registrarGR', component: RegistrarGuiaRemisionComponent, outlet: 'auxRegGR' },
            { path: 'consultarGR', component: ConsultarGuiaRemisionComponent, outlet: 'auxConGR' },
            { path: 'reporteGR', component: ReporteGuiaRemisionComponent, outlet: 'auxRepGR' },
            { path: 'crudVeh', component: VehiculoComponent, outlet: 'auxCrudVeh' },

        ])
    ],
    declarations: [
        AppComponent, HomeAdminComponent, 
        HomeVentasComponent,HomeInventarioComponent, HomeConsignadorComponent,
        //COMPONENT ADMIN
        EmpleadoComponent, ClienteComponent,
        //COMPONENT COTIZACION
        AprobarCotizacionComponent, ConsultarCotizacionComponent, RegistrarCotizacionComponent,
        //COMPONENT DOCUMENTO VENTA
        RegistrarDocumentoVentaComponent, ConsultarDocumentoVentaComponent, ReporteDocumentoVentaComponent,
        //COMPONENT INVENTARIO
        RegistrarInventarioComponent, ConsultarInventarioComponent,
        //COMPONENT CONSIGNADOR
        RegistrarGuiaRemisionComponent, ConsultarGuiaRemisionComponent, ReporteGuiaRemisionComponent, VehiculoComponent,

    ],
    providers: [
        UsuarioService,
        EmpleadoService,
        ClienteService,
        AssetsService,
        CotizacionService,
        ProductoService,
        VehiculoService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
