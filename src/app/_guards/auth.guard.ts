/**
 * Created by calderon on 5/17/17.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentProveedor')) {
            // 2> si hay un currentProveedor en el localStorage, se lo permite
            return true;
        }

        // not logged in so redirect to login page with the return url
        // 3> si no hay currentProveedor, lo envía al Login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
