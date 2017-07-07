/**
 * Created by calderon on 5/17/17.
 */
import {Component, OnInit} from '@angular/core';
import {Proveedor, Documento} from "../_models/proveedor";
import {ProveedorService} from "../_services/proveedor.service";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
   // moduleId: module.id,
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    currentProveedor: Proveedor;
    //proveedores: Proveedor[] = [];

    tab_selected: number = 0;

    currentProveedorToken: any;

    documentoToDelete: Documento;

    constructor(private proveedorService: ProveedorService) {
        //this.currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));
    }

    ngOnInit() {
        // this.loadAllProveedores();

        this.currentProveedorToken = JSON.parse(localStorage.getItem('currentProveedor'));

        if (this.currentProveedorToken && this.currentProveedorToken.rfc) {
            this.cargarDocumentos();
        } else {
            console.log("Get Proveedor Error");
        }
    }

    cargarDocumentos() {
        this.proveedorService.getByRfc(this.currentProveedorToken.rfc).subscribe(
                (response: Proveedor) => {
                    this.currentProveedor = response;
                },
            error => console.log(error),
            () => console.log("Get Proveedor:" + this.currentProveedorToken.rfc)
        );
    }

    onTabSelect(event, details) {
        this.tab_selected = event.target.selected;
    }

    notificarCambio(cambio: any) {

        this.cargarDocumentos();

    }

    download(docu: Documento) {
        this.proveedorService.downloadFile(docu.id).subscribe(blob => {
                importedSaveAs(blob, docu.file);
            }
        );
    }

    deleteDocumentoDlg(docu: Documento) {
        this.documentoToDelete = docu;
        $('#confirmarDeleteDlg').trigger('open');
    }

    deleteDocumentoSrv(id: number) {
        this.proveedorService.deleteDocumento(id).subscribe(
            (response: any) => {
                // nothing
            },
            error => console.log(error),
            () => {
                console.log("Delete documento: " + id);
                this.cargarDocumentos();
            }
        );
    }

}

