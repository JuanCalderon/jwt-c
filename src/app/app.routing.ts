/**
 * Created by calderon on 5/17/17.
 */
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    // 1> Aqui empieza con  ''. Se va a HomeComponent pero AuthGuard indica si lo permite o lo envia a el login
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
//    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

