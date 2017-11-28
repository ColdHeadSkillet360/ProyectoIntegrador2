import { EstadosDocumento } from "../cotizacion/estado.documento";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Cotizacion } from "./cotizacion";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/Rx';

@Injectable()
export class CotizacionService {

    constructor(private _http: Http) { }

    private _ListarEstadosDocumentoUrl: string = "http://localhost:58020/api/cotizacion/ListarEstadosDocumento";
    private _BuscarCotizacionUrl: string = "http://localhost:58020/api/cotizacion/BuscarCotizacion";
    private _EliminarCotizacionUrl: string = "http://localhost:58020/api/cotizacion/EliminarCotizacion";
    private _AprobarCotizacionUrl: string = "http://localhost:58020/api/cotizacion/AprobarCotizacion";
    private _ObtenerDetalleCotizacionUrl: string = "http://localhost:58020/api/cotizacion/ObtenerDetalleCotizacion";

    ListarEstadosDocumento(TipoDocumento: string): Observable<EstadosDocumento> {
        var req = this._http.get(this._ListarEstadosDocumentoUrl + '?TipoDocumento=' + TipoDocumento);
        return req.map(data => <EstadosDocumento>data.json()).catch(this.handleError);
    }

    BuscarCotizacion(fechaInicio: any, fechaFin: any, ruc_dni: any, nro_doc: string, estado_documento: number) {

        let f_inicio: string;
        let f_fin: string;
        let req: any;
        let cliente = "";

        if (ruc_dni !== "" && ruc_dni !== undefined) {
            if (ruc_dni.split("-")[1] !== undefined) {
                let ruc_dni_cliente = ruc_dni.split("-");
                cliente = ruc_dni_cliente[1].trim();
            }
        }

        if (typeof fechaInicio == "string") {

            req = this._http.get(this._BuscarCotizacionUrl + '?fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin + '&cliente=' + cliente + '&nro_doc=' + nro_doc + '&estado_documento=' + estado_documento);

        } else {
            Object.keys(fechaInicio).filter(key => {

                f_inicio = String(fechaInicio[key].day) + "/" + String(fechaInicio[key].month) + "/" + String(fechaInicio[key].year);
            });

            Object.keys(fechaFin).filter(key => {
                f_fin = String(fechaFin[key].day) + "/" + String(fechaFin[key].month) + "/" + String(fechaFin[key].year);
            });

            req = this._http.get(this._BuscarCotizacionUrl + '?fechaInicio=' + f_inicio + '&fechaFin=' + f_fin + '&cliente=' + cliente + '&nro_doc=' + nro_doc + '&estado_documento=' + estado_documento);
        }

        return req.map((data:any) => data.json()).catch(this.handleError);
    }

    EliminarCotizacion(id_cliente: number): Observable<Cotizacion> {
        var body = { id_cliente: id_cliente };
        var req = this._http.post(this._EliminarCotizacionUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }

    AprobarCotizacion(str_ids: any): Observable<Cotizacion> {
        var body = { ID_Ordenes: str_ids.toString() };
        console.log(body);
        var req = this._http.post(this._AprobarCotizacionUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }

    ObtenerDetalleCotizacion(id: number){
        console.log(id);
        var req = this._http.get(this._ObtenerDetalleCotizacionUrl + '?id_cotizacion_venta=' + id);
        return req.map(response => response.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "server error");
    }

}