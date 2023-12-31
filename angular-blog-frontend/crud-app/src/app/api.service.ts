import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private apiUrl = 'http://localhost:5000';

    constructor(
        private http: HttpClient
    ) { }

    createdata(employee: any): Observable<any> {
        return this.http.post(this.apiUrl + '/create', employee)
    }
    getdata(): Observable<any> {
        return this.http.get(this.apiUrl + '/blogdata');
    }
    getservice(): Observable<any> {
        return this.http.get(this.apiUrl + '/services');
    }
    updaatedata(employee: any): Observable<any> {
        return this.http.get(this.apiUrl + '/update')
    }
    deletedata(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + '/delete/{id}')
    }
    throwerror(error: any): any {
        console.error(error);
        return this.throwerror(error.json().error || 'Server error');

    }

    signinuser(persondata: any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(persondata);
        return this.http.post(this.apiUrl +'/signin', body,{'headers':headers})
    }

    getdatabyid(id: any): Observable<any> {
        return this.http.get(this.apiUrl + "/" + id);
    }

 

      
      
}


