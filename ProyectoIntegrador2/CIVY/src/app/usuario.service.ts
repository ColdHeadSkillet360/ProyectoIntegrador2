import { Usuario } from "./usuario";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class UsuarioService {
    private _LoginUrl: string = "http://localhost:58020/api/usuario/Login";

    usuario: Usuario = null;
    constructor(private _http: Http) { }

    Ingresar(usuario: Usuario): Observable<Usuario> {
        //definir el objeto tipo request
        var body = {
            usuario: usuario.usuario,
            contrasena: usuario.contrasena
        };
        var req = this._http.post(this._LoginUrl, body);
        //mapeo de datos en el post 'REQ'
        return req.map((respone: Response) => <Usuario>respone.json())
               .do(data => this.usuario = data)
               .catch(this.handleError);

    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "server error");
    }
} 