import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private http: HttpClient) { }

    defineProgressColor(progress: any): any {

        if (progress >= 60)
            return '#4caf50';
        else if (progress >= 30)
            return '#ff9800';
        else
            return '#ff5429';
    }
}