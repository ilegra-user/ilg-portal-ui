import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeyResultService {
  baseUrl = environment.apiUrl.concat('/key-results');

  constructor(private http: HttpClient) {}

  get(keyResultId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${keyResultId}`);
  }

  delete(keyResultId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${keyResultId}`);
  }

  getAllInitiatives(keyResultId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${keyResultId}/initiatives`);
  }

  getHistory(keyResultId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${keyResultId}/history`);
  }

  save(keyResult: any): Observable<any> {
    if (keyResult.id) {
      return this.update(keyResult);
    } else {
      return this.insert(keyResult);
    }
  }

  private insert(keyResult: any): Observable<any> {
    return this.http.post(this.baseUrl, keyResult);
  }

  private update(keyResult: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${keyResult.id}`, keyResult);
  }
}
