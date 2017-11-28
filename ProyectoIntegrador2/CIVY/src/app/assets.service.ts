import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/Rx';

@Injectable()
export class AssetsService {
    
    constructor(private _http: Http) { }

    ListarEstadoCivil() {
        return this._http.get("./../assets/data.json").map((res: Response) => res.json().estado_civil)
            .catch(this.handleError);         
    }

    ListarSexo() {
        return this._http.get("./../assets/data.json").map((res: Response) => res.json().sexo)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "server error");
    }


    
}