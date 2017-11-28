import { Component } from "@angular/core";
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    selector: 'my-home',
    templateUrl: './home.consignador.component.html',
})

export class HomeConsignadorComponent {
    constructor(private _router: Router) { }

    salir(): void {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    }

    ///////GUIA REMISION//////////

    RegistrarGR(): void {
        this._router.navigate([{ outlets: { auxRegGR: ['registrarGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegGR").show();
    }

    ConsultarGR(): void {
        this._router.navigate([{ outlets: { auxConGR: ['consultarGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formConGR").show();
    }

    ReporteGR(): void {
        this._router.navigate([{ outlets: { auxRepGR: ['reporteGR'] } }]);
        $("div[name='container_view']").hide();
        $("#formRepGR").show();
    }

    ///////VEHICULO//////////

    CrudVeh(): void {
        this._router.navigate([{ outlets: { auxCrudVeh: ['crudVeh'] } }]);
        $("div[name='container_view']").hide();
        $("#formCrudVeh").show();
    }
}