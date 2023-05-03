import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class KeyResultTypeService {

    baseUrl = environment.apiUrl.concat('/key-result-types') 

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }
}