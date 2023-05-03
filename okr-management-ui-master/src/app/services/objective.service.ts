import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ObjectiveService {

    baseUrl = environment.apiUrl.concat('/objectives')

    constructor(private http: HttpClient) { }

    get(objectiveId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${objectiveId}`);
    }

    delete(objectiveId: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${objectiveId}`);
    }

    getAllKeyResults(objectiveId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${objectiveId}/key-results`);
    }

    getAllChildObjectives(objectiveId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${objectiveId}/objectives`);
    }

    save(cycle: any): Observable<any> {

        if (cycle.id) {
            return this.update(cycle);
        } else {
            return this.insert(cycle)
        }
    }

    private insert(objective: any): Observable<any> {

        return this.http.post(this.baseUrl, objective);
    }

    private update(objective: any): Observable<any> {

        return this.http.put(`${this.baseUrl}/${objective.id}`, objective);
    }
}