import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { DialogService } from "../services/dialog.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private dialogService: DialogService, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

            if (error.status === 401 || error.status === 403) {
                // auto logout if 401 response returned from api
                  this.authenticationService.logout();
                  location.reload();
            }

            const err = `Ocorreu um erro ao tentar realizar esta ação: ${error.error.message || error.statusText}`

            this.dialogService.showError(err);
            return throwError(error);
        })
        )
    }
}