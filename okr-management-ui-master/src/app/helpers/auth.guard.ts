import { I } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.token) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
