/**
 * Created by calderon on 5/17/17.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';

import { AppConfig } from '../app.config';
import {Proveedor, Documento, Categoria} from '../_models/proveedor';
import {Observable} from "rxjs";

@Injectable()
export class ProveedorService {
    constructor(private http: Http, private config: AppConfig) { }

    /*
    public getDocusOf(idProveedor: number) {
        return this.http.get(this.config.apiUrl + '/documentos/by_proveedor_id/' + idProveedor, this.jwt()).map((response: Response) => response.json());
    }
    */

    public getDocusOf = (idProveedor: number): Observable<Documento[]> => {
        return this.http.get(this.config.apiUrl + '/documentos/by_proveedor_id/' + idProveedor,  this.jwt())
            .map((response: Response) => {
                return <Documento[]>response.json();
            });
        //.catch(this.handleError);
    }

    public getCategos =(): Observable<Categoria[]> => {
        return this.http.get(this.config.apiUrl + '/categorias',  this.jwt())
            .map((response: Response) => {
                return <Categoria[]>response.json();
            });
        //.catch(this.handleError);
    }

    getAll() {
        return this.http.get(this.config.apiUrl + '/proveedores', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/proveedores/' + id, this.jwt()).map((response: Response) => response.json());
    }

    public getByRfc = (rfc: string): Observable<Proveedor>  =>{
        return this.http.get(this.config.apiUrl + '/proveedores/by_rfc/' + rfc, this.jwt())
            .map((response: Response) => {
                return <Proveedor>response.json();
            });
    }

    create(proveedor: Proveedor) {
        return this.http.post(this.config.apiUrl + '/proveedores/register', proveedor, this.jwt());
    }

    update(proveedor: Proveedor) {
        return this.http.put(this.config.apiUrl + '/proveedores/' + proveedor.id, proveedor, this.jwt());
    }

    delete(id: string) {
        return this.http.delete(this.config.apiUrl + '/proveedores/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));
        if (currentProveedor && currentProveedor.auth_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentProveedor.auth_token });
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }

    downloadFile =(id: number): Observable<Blob> => {
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(this.config.apiUrl + '/documentos/download/' + id, options)
            .map(res => res.blob());
            //.catch(this.handleError)
    }

    deleteDocumento(id: number) {
        return this.http.delete(this.config.apiUrl + '/documentos/' + id, this.jwt());
    }

}
