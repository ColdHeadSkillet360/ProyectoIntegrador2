import { Component } from "@angular/core";
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    selector: 'my-home',
    templateUrl: './home.ventas.component.html',
})

export class HomeVentasComponent {
    constructor(private _router: Router) { }

    Salir(): void {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    }

    ///////////COTIZACION///////////

    RegistrarCO(): void {
        this._router.navigate([{ outlets: { auxRegCot: ['registrarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegCot").show();
    }

    ConsultarCO(): void {
        this._router.navigate([{ outlets: { auxConCot: ['consultarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formConCot").show();
    }

    AprobarCO(): void {
        this._router.navigate([{ outlets: { auxApbCot: ['aprobarCO'] } }]);
        $("div[name='container_view']").hide();
        $("#formApbCot").show();
    }

    ///////DOCUMENTO VENTA//////////

    RegistrarDV(): void {
        this._router.navigate([{ outlets: { auxRegDV: ['registrarDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegDV").show();
    }

    ConsultarDV(): void {
        this._router.navigate([{ outlets: { auxConDV: ['consultarDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formConDV").show();
    }

    ReporteDV(): void {
        this._router.navigate([{ outlets: { auxRepDV: ['reporteDV'] } }]);
        $("div[name='container_view']").hide();
        $("#formRepDV").show();
    }

}
