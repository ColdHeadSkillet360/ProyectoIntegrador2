import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { UsuarioService } from "./usuario.service";
import { Usuario } from './usuario';

declare var jQuery: any;
declare var $: any;
declare var alertify: any;

//TEMPLATE
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})

export class AppComponent {

    usuario: Usuario = null;

    constructor(private _userService: UsuarioService,
        private _router: Router) {
        this.usuario = <Usuario>{
            usuario: "",
            contrasena: ""
        };
    }

    ingresar(): void {
        //La contraseña ingresada en la GUI
        var contra = this.usuario.contrasena;
        $("#lb_mensaje_bloqueo").hide();
        //validamos si es que hay datos ingresados, de lo contrario mandar mensaje.
        if (this.usuario.usuario !== "" && this.usuario.contrasena !== "") {
            //obtener como response el method de usuario.service
            var response = this._userService.Ingresar(this.usuario).subscribe(
                usuario => {
                    this.usuario = usuario;

                    if (this.usuario == null) {
                        alertify.error("Usuario No identificado");
                        this.usuario = <Usuario>{
                            usuario: "",
                            contrasena: ""
                        };
                    }
                    else if (this.usuario.bloqueo || this.usuario.numero_intentos==0) {
                        alertify.error("El usuario se encuentra bloqueado");
                        $("#lb_mensaje_bloqueo").show();
                        this.usuario = <Usuario>{
                            usuario: "",
                            contrasena: ""
                        };
                    }
                    else if (this.usuario.contrasena != contra) {
                        alertify.error("Contraseña incorrecta, recuerde que tiene " + this.usuario.numero_intentos+" intentos para acceder al sistema.");
                        this.usuario = <Usuario>{
                            contrasena: ""
                        };
                    }
                    else if (this.usuario.descripcion_rol == "Administrador") {
                        this._router.navigate(['/home.admin']);
                        $("#formLogin").hide();
                        $("#formHome").show();
                        this.usuario.usuario = "";
                        this.usuario.contrasena = "";
                    }
                    else if (this.usuario.descripcion_rol == "Encargado de Ventas") {
                        this._router.navigate(['/home.ventas']);
                        $("#formLogin").hide();
                        $("#formHome").show();
                        this.usuario.usuario = "";
                        this.usuario.contrasena = "";
                    }
                    else if (this.usuario.descripcion_rol == "Encargado de Inventario") {
                        this._router.navigate(['/home.inventario']);
                        $("#formLogin").hide();
                        $("#formHome").show();
                        this.usuario.usuario = "";
                        this.usuario.contrasena = "";
                    }
                    else if (this.usuario.descripcion_rol == "Consignador") {
                        this._router.navigate(['/home.consignador']);
                        $("#formLogin").hide();
                        $("#formHome").show();
                        this.usuario.usuario = "";
                        this.usuario.contrasena = "";
                    } else {
                        this.usuario.usuario = "";
                        this.usuario.contrasena = "";
                    }
                }); 
        }
        else {
            alertify.error("Por favor ingrese en los campos obligatorios usuario/contraseña");
        }
            
    }
}

