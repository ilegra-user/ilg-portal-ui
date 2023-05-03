import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InitiativeService {
  baseUrl = environment.apiUrl.concat('/initiatives');

  constructor(private http: HttpClient) {}

  get(initiativeId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${initiativeId}`);
  }

  delete(initiativeId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${initiativeId}`);
  }

  save(initiative: any): Observable<any> {
    if (initiative.id) {
      return this.update(initiative);
    } else {
      return this.insert(initiative);
    }
  }

  private insert(initiative: any): Observable<any> {
    return this.http.post(this.baseUrl, initiative);
  }

  private update(initiative: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${initiative.id}`, initiative);
  }
}
