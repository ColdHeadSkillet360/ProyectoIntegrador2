import { TipoCliente} from "./tipocliente";
import { Cliente } from "./cliente";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Estado } from "../../estado";

import { Juridico } from "./juridico";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class ClienteService {
    private _ListarTipoClienteUrl: string = "http://localhost:58020/api/cliente/ListarTipoCliente";
    private _ListarEstadoUrl: string = "http://localhost:58020/api/cliente/ListarEstado";
    /**api cliente natural**/
    private _BuscarClienteUrl: string = "http://localhost:58020/api/cliente/BuscarCliente";
    private _RegistrarClienteUrl: string = "http://localhost:58020/api/cliente/RegistrarCliente";
    private _EditarClienteUrl: string = "http://localhost:58020/api/cliente/EditarCliente";
    private _EliminarClienteUrl: string = "http://localhost:58020/api/cliente/EliminarCliente";
    private _ObtenerClienteUrl: string = "http://localhost:58020/api/cliente/ObtenerCliente";
    /**api cliente juridico**/
    private _RegistrarJuridicoUrl: string = "http://localhost:58020/api/cliente/RegistrarJuridico";
    private _BuscarJuridicoUrl: string = "http://localhost:58020/api/cliente/BuscarClienteJuridico";
    private _EditarJuridicoUrl: string = "http://localhost:58020/api/cliente/EditarClienteJuridico";
    private _EliminarJuridicoUrl: string = "http://localhost:58020/api/cliente/EliminarClienteJuridico";
    private _ObtenerJuridicoUrl: string = "http://localhost:58020/api/cliente/ObtenerClienteJuridico";

    private _AutocompleteClienteUrl: string = "http://localhost:58020/api/cliente/AutocompleteCliente";



    tipoCliente: TipoCliente = null;
    cliente: Cliente = null;
    estado: Estado;
   

    constructor(private _http: Http) { }


    ListarEstado(estado: Estado): Observable<Estado> {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(data => <Estado>data.json()).catch(this.handleError);
    }


    ListarTipoCliente(tipoCliente: TipoCliente): Observable<TipoCliente> {

        var req = this._http.get(this._ListarTipoClienteUrl);
        //mapeo de datos en el GET
        return req.map(data => <TipoCliente>data.json()).catch(this.handleError);

    }

    BuscarCliente(filtro_descripcion: string,select_tipocliente: number){
       var req;  

       if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarClienteUrl + '?descripcion=&tipocliente=' + select_tipocliente);
        } else {
           req = this._http.get(this._BuscarClienteUrl + '?descripcion=' + filtro_descripcion + '&tipocliente=' + select_tipocliente);
        }
        //mapeo de datos en el GET
        return req.map(data => data.json())
            .catch(this.handleError);

    }

    BuscarClienteJuridico(filtro_descripcion: string, select_tipocliente: number) {
        var req;

        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarJuridicoUrl + '?descripcion=&tipocliente=' + select_tipocliente);
        } else {
            req = this._http.get(this._BuscarJuridicoUrl + '?descripcion=' + filtro_descripcion + '&tipocliente=' + select_tipocliente);
        }
        //mapeo de datos en el GET
        return req.map(data => data.json())
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "server error");
    }

    RegistrarCliente(body:any): Observable<Cliente> {
        return this._http.post(this._RegistrarClienteUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }

    RegistrarJuridico(body: any): Observable<Cliente> {
        return this._http.post(this._RegistrarJuridicoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }
    
 
    
   
    
    EditarCliente(body: any): Observable<Cliente> {
        return this._http.post(this._EditarClienteUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }


    EditarClienteJuridico(body: any): Observable<Juridico> {
        return this._http.post(this._EditarJuridicoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }
    

    ObtenerDatosCliente(id_natural: number): Observable<Cliente> {
        var req = this._http.get(this._ObtenerClienteUrl + "?id_cliente=" + id_natural);
        return req.map((response: Response) => <Cliente[]>response.json()).catch(this.handleError);
    }

    ObtenerDatosClienteJuridico(id_juridico: any): Observable<Juridico> {
        var req = this._http.get(this._ObtenerJuridicoUrl + "?id_juridico=" + id_juridico);
        return req.map((response: Response) => <Juridico[]>response.json()).catch(this.handleError);
    }

    EliminarCliente(id_cliente: number, tipo_cliente: string): Observable<Cliente> {
        var body = { id_cliente: id_cliente, tipo_cliente: tipo_cliente };

        var req = this._http.post(this._EliminarClienteUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }


    EliminarClienteJuridico(id_juridico: number): Observable<Juridico> {
        var body = { id_juridico: id_juridico };

        var req = this._http.post(this._EliminarJuridicoUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }




    ObtenerAutocompleteCliente() {
        var req = this._http.get(this._AutocompleteClienteUrl);
        return req.map(data => data.json())
            .catch(this.handleError);
    }


} 