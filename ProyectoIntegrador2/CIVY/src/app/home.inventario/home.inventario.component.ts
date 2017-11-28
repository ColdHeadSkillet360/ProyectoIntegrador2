import { Component } from "@angular/core";
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    selector: 'my-home',
    templateUrl: './home.inventario.component.html',
})

export class HomeInventarioComponent {
    constructor(private _router: Router) { }

    salir(): void {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    }
    
    ///////INVENTARIO//////////

    RegistrarIn(): void {
        this._router.navigate([{ outlets: { auxRegIn: ['registrarIn'] } }]);
        $("div[name='container_view']").hide();
        $("#formRegIn").show();
    }

    ConsultarIn(): void {
        this._router.navigate([{ outlets: { auxConIn: ['consultarIn'] } }]);
        $("div[name='container_view']").hide();
        $("#formConIn").show();
    }

}