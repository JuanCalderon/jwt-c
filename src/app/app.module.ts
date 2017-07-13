import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AlertComponent} from "./_directives/alert.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
//import {RegisterComponent} from "./register/register.component";
import {AppConfig} from "./app.config";
import {AuthGuard} from "./_guards/auth.guard";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {routing} from "./app.routing";
import {ProveedorService} from "./_services/proveedor.service";

import { PolymerElement } from  '@vaadin/angular2-polymer';
import {CategoriaPipe} from "./home/CategoriaPipe";

import { FileSelectDirective } from 'ng2-file-upload';
import {UploaderComponent} from "./home/uploader.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
      UploaderComponent,
//    RegisterComponent,

    PolymerElement('app-header-layout'),
    PolymerElement('app-header'),
    PolymerElement('app-toolbar'),

    PolymerElement('paper-dropdown-menu'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-tooltip'),
    PolymerElement('paper-input'),
    PolymerElement('paper-input-container'),
      PolymerElement('paper-fab'),
    PolymerElement('iron-image'),
    PolymerElement('iron-pages'),
    PolymerElement('paper-tab'),
    PolymerElement('paper-tabs'),
    PolymerElement('paper-toast'),
    PolymerElement('paper-button'),
    PolymerElement('paper-icon-button'),

      PolymerElement('iron-list'),
      PolymerElement('iron-icon'),

    PolymerElement('vaadin-combo-box'),

    PolymerElement('documentos-group'),

    CategoriaPipe,
    FileSelectDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
      AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    ProveedorService],
    entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
