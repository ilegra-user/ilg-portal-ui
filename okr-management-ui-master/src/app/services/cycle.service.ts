import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CycleService {

    baseUrl = environment.apiUrl.concat('/cycles')

    constructor(private http: HttpClient) {}

    get(cycleId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${cycleId}`);
    }

    getAllObjectives(cycleId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/${cycleId}/objectives`);
    }

    getAllObjectivesByCycleAndTeam(cycleId: any, teamId: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/${cycleId}/teams/${teamId}/objectives`);
  }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    save(cycle: any): Observable<any> {

        if (cycle.id) {
            return this.update(cycle);
        } else {
            return this.insert(cycle)
        }
    }

    private insert(cycle: any): Observable<any> {

        return this.http.post(this.baseUrl, cycle);
    }

    private update(cycle: any): Observable<any> {

        return this.http.put(`${this.baseUrl}/${cycle.id}`, cycle);
    }

    delete(cycleId: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${cycleId}`);
    }
}
