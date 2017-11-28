import { TipoProducto } from "./tipoproducto";
import { Producto } from "./producto";
import { Servicio } from "./servicio";
import { Estado } from "../../estado";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/Rx';

@Injectable()
export class ProductoService {
    private _ListarTipoProductoUrl: string = "http://localhost:58020/api/producto/ListarTipoProducto";
    private _ListarEstadoUrl: string = "http://localhost:58020/api/producto/ListarEstado";

    private _BuscarProductoUrl: string = "http://localhost:58020/api/producto/BuscarProducto";
    private _BuscarServicioUrl: string = "http://localhost:58020/api/producto/BuscarServicio";

   
    private _ObtenertProductoUrl: string = "http://localhost:58020/api/producto/ObtenerProductos";
    private _ObtenertServicioUrl: string = "http://localhost:58020/api/producto/ObtenerServicios";

    private _EditarProductoUrl: string = "http://localhost:58020/api/producto/EditarProducto";
    private _EditarServicioUrl: string = "http://localhost:58020/api/producto/EditarServicios";


    private _EliminarProductoUrl: string = "http://localhost:58020/api/producto/EliminarProducto";


    private _RegistrarServicioUrl: string = "http://localhost:58020/api/producto/RegistrarServicio";
    private _RegistrarProductoUrl: string = "http://localhost:58020/api/producto/RegistrarProducto"; 

    tipoProducto: TipoProducto;
    producto: Producto;
    servicio: Servicio;
   // registroEmpleado: Producto;
    estado: Estado;

    

    //operacion: boolean;

    constructor(private _http: Http) { }

    ListarTipoProducto(tipoProducto: TipoProducto): Observable<TipoProducto> {

        var req = this._http.get(this._ListarTipoProductoUrl);
        //mapeo de datos en el GET
        return req.map(data => <TipoProducto>data.json()).catch(this.handleError);

    }

    ListarEstado(estado: Estado): Observable<Estado> {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(data => <Estado>data.json()).catch(this.handleError);
    }

    BuscarProducto(filtro_descripcion: string, select_tipoproducto: number) {
        var req;

        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarProductoUrl + '?descripcion=&tipoproducto=' + select_tipoproducto);
        } else {
            req = this._http.get(this._BuscarProductoUrl + '?descripcion=' + filtro_descripcion + '&tipoproducto=' + select_tipoproducto);
        }

        //mapeo de datos en el GET
        return req.map(data => data.json())
            .catch(this.handleError);

    }

    BuscarServicio(filtro_descripcion: string, select_tipoproducto: number) {
        var req;

        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarServicioUrl + '?descripcion=&tipoproducto=' + select_tipoproducto);
        } else {
            req = this._http.get(this._BuscarServicioUrl + '?descripcion=' + filtro_descripcion + '&tipoproducto=' + select_tipoproducto);
        }

        //mapeo de datos en el GET
        return req.map(data => data.json())
            .catch(this.handleError);

    }




    private handleError(error: Response) {
        return Observable.throw(error.json().error || "error al conectar con el servidor");
    }

    RegistrarProducto(body: any): Observable<Producto> {
 
        return this._http.post(this._RegistrarProductoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }


    RegistrarServicio(body: any): Observable<Producto> {
        return this._http.post(this._RegistrarServicioUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }



    EditarProducto(body: any): Observable<Producto[]> {
        return this._http.post(this._EditarProductoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }

    EditarServicio(body: any): Observable<Producto[]> {
        return this._http.post(this._EditarServicioUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }


    ObtenerDatosProducto(id_productos: any): Observable<Producto> {
        var req = this._http.get(this._ObtenertProductoUrl + "?id_productos=" + id_productos);
        return req.map((response: Response) => <Producto[]>response.json()).catch(this.handleError);
    }

    ObtenerDatosServicio(ID_Servicios: any): Observable<Servicio> {
        var req = this._http.get(this._ObtenertServicioUrl + "?id_servicio=" + ID_Servicios);
        return req.map((response: Response) => <Servicio[]>response.json()).catch(this.handleError);
    }

  /*  EliminarProducto(id_productos: number): Observable<Producto> {
        var body = { id_productos: id_productos };

        var req = this._http.post(this._EliminarProductoUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }*/


    EliminarProducto(id_proserv: number, tipo_producto: string): Observable<Producto> {
        var body = { id_proserv: id_proserv, tipo_producto: tipo_producto };

        var req = this._http.post(this._EliminarProductoUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }

} 