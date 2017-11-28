import { TipoEmpleado } from "./tipoempleado";
import { Empleado } from "./empleado";
import { Estado } from "../../estado";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class EmpleadoService {
    private _ListarTipoEmpleadoUrl: string = "http://localhost:58020/api/empleado/ListarTipoEmpleado";
    private _ListarEstadoUrl: string = "http://localhost:58020/api/empleado/ListarEstado";
    private _BuscarEmpleadoUrl: string = "http://localhost:58020/api/empleado/BuscarEmpleado";
    private _RegistrarEmpleadoUrl: string = "http://localhost:58020/api/empleado/RegistrarEmpleado";
    private _EditarEmpleadoUrl: string = "http://localhost:58020/api/empleado/EditarEmpleado";
    private _EliminarEmpleadoUrl: string = "http://localhost:58020/api/empleado/EliminarEmpleado";
    private _ObtenerEmpleadoUrl: string = "http://localhost:58020/api/empleado/ObtenerEmpleado";

    tipoEmpleado: TipoEmpleado;
    empleado: Empleado;
    registroEmpleado: Empleado;
    estado: Estado;

    //operacion: boolean;

    constructor(private _http: Http) { }

    ListarTipoEmpleado(tipoEmpleado: TipoEmpleado): Observable<TipoEmpleado> {

        var req = this._http.get(this._ListarTipoEmpleadoUrl);
        //mapeo de datos en el GET
        return req.map(data => <TipoEmpleado>data.json()).catch(this.handleError);

    }

    ListarEstado(estado: Estado): Observable<Estado> {
        var req = this._http.get(this._ListarEstadoUrl);
        //mapeo de datos en el GET
        return req.map(data => <Estado>data.json()).catch(this.handleError);
    }

    BuscarEmpleado(filtro_descripcion: string, select_tipoempleado: number) {
        var req;

        if (filtro_descripcion == null) {
            req = this._http.get(this._BuscarEmpleadoUrl + '?descripcion=&tipoempleado=' + select_tipoempleado);
        } else {
            req = this._http.get(this._BuscarEmpleadoUrl + '?descripcion=' + filtro_descripcion + '&tipoempleado=' + select_tipoempleado);
        }

        //mapeo de datos en el GET
        return req.map(data => data.json())
            .catch(this.handleError);

    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "error al conectar con el servidor");
    }

    RegistrarEmpleado(registroEmpleado: Empleado): Observable<Empleado> {

        var operacion: boolean;

        var body = {
            nombres: registroEmpleado.nombres,
            ape_paterno: registroEmpleado.ape_paterno,
            ape_materno: registroEmpleado.ape_materno,
            dni: registroEmpleado.dni,
            sexo: registroEmpleado.sexo,
            departamento: registroEmpleado.departamento,
            provincia: registroEmpleado.provincia,
            distrito: registroEmpleado.distrito,
            direccion: registroEmpleado.direccion,
            email: registroEmpleado.email,
            estado_civil: registroEmpleado.estado_civil,
            telefono: registroEmpleado.telefono,
            celular: registroEmpleado.celular,
            fecha_nacimiento: registroEmpleado.fecha_nacimiento,
            id_tipo_empleado: registroEmpleado.id_tipo_empleado
        };
        return this._http.post(this._RegistrarEmpleadoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }

    EditarEmpleado(editarEmpleado: Empleado): Observable<Empleado[]> {
        var operacion: boolean;

        var body = {
            id_empleado: editarEmpleado.id_empleado,
            nombres: editarEmpleado.nombres,
            ape_paterno: editarEmpleado.ape_paterno,
            ape_materno: editarEmpleado.ape_materno,
            dni: editarEmpleado.dni,
            sexo: editarEmpleado.sexo,
            departamento: editarEmpleado.departamento,
            provincia: editarEmpleado.provincia,
            distrito: editarEmpleado.distrito,
            direccion: editarEmpleado.direccion,
            email: editarEmpleado.email,
            estado_civil: editarEmpleado.estado_civil,
            telefono: editarEmpleado.telefono,
            celular: editarEmpleado.celular,
            fecha_nacimiento: editarEmpleado.fecha_nacimiento,
            id_tipo_empleado: editarEmpleado.id_tipo_empleado
        };
        return this._http.post(this._EditarEmpleadoUrl, body, {
        }).map(res => res.json()).catch(this.handleError);
    }

    ObtenerDatosEmpleado(id_empleado: any): Observable<Empleado> {
        var req = this._http.get(this._ObtenerEmpleadoUrl + "?id_empleado=" + id_empleado);
        return req.map((response: Response) => <Empleado[]>response.json()).catch(this.handleError);
    }

    EliminarEmpleado(id_empleado: number): Observable<Empleado>  {
        var body = { id_empleado: id_empleado };

        var req = this._http.post(this._EliminarEmpleadoUrl, body);
        return req.map(response => response.json()).catch(this.handleError);
    }


} 