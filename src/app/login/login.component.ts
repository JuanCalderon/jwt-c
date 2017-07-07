/**
 * Created by calderon on 5/17/17.
 */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service'; //'../_services/index';
import { AuthenticationService } from '../_services/authentication.service'; //'../_services/index';

@Component({
   // moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

// TODO Poner el RFC en uppercase

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('toastErrorLogin') toastErrorLogin:ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.loading = true;
        this.authenticationService.login(this.model.rfc, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.toastErrorLogin.nativeElement.open();

                    this.loading = false;
                });
    }

    rfcOnChange(event) {
        event.target.value = event.target.value.toUpperCase()
    }
}

