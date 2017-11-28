
import { Vehiculo } from "./vehiculo";
import { Estado } from "../../estado";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class VehiculoService {

    private _BuscarVehiculoUrl: string = "http://localhost:58020/api/vehiculo/BuscarVehiculo";

    vehiculo: Vehiculo;
    estado: Estado;

    constructor(private _http: Http) { }

    BuscarVehiculo(id_transportista: number, filtro_descripcion: string) {
        var req:any;


        if (id_transportista == undefined) {
            id_transportista = 0;
        } else if (filtro_descripcion == 'undefined') {
            filtro_descripcion = '';
        }

        if (id_transportista != 0 && filtro_descripcion != '') {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=' + id_transportista + '&descripcion=' + filtro_descripcion);
        } else if (filtro_descripcion == '' && id_transportista != 0) {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=' + id_transportista + '&descripcion=');
        } else if (filtro_descripcion != '' && id_transportista == 0) {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=0&descripcion=' + filtro_descripcion);
        } else {
            req = this._http.get(this._BuscarVehiculoUrl + '?id_empleado=0&descripcion=');
        }
        //mapeo de datos en el GET
        return req.map((data:any) => data.json())
            .catch(this.handleError);

    }

     private handleError(error: Response) {
        return Observable.throw(error.json().error || "error al conectar con el servidor");
    }
}

