import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    baseUrl = environment.apiUrl.concat('/teams')

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    get(teamId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${teamId}`);
    }

    save(team: any): Observable<any> {

        if (team.id) {
            return this.update(team);
        } else {
            return this.insert(team)
        }
    }

    private insert(team: any): Observable<any> {

        return this.http.post(this.baseUrl, team);
    }

    private update(team: any): Observable<any> {

        return this.http.put(`${this.baseUrl}/${team.id}`, team);
    }

    delete(teamId: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${teamId}`);
    }
}