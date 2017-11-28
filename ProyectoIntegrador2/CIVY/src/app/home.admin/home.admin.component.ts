import { Component } from "@angular/core";
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    templateUrl: './home.admin.component.html',
})

export class HomeAdminComponent {
    constructor(private _router: Router) { }

    Salir(): void {
        this._router.navigate(['']);
        $("#formLogin").show();
        $("#formHome").hide();
    }

    Empleado(): void {
        this._router.navigate([{ outlets: { auxEmpleado: ['empleado'] } }]);
        $("#formEmpleado").show();
        $("#formCliente").hide();
    }

    Cliente(): void {
        this._router.navigate([{ outlets: { auxCliente: ['cliente'] } }]);
        $("#formEmpleado").hide();
        $("#formCliente").show();
    }
}
