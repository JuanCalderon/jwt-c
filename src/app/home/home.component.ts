/**
 * Created by calderon on 5/17/17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Proveedor, Documento, Categoria} from "../_models/proveedor";
import {ProveedorService} from "../_services/proveedor.service";
import {saveAs as importedSaveAs} from "file-saver";
import {UploaderComponent} from "./uploader.component";
import {FileUploader, FileItem} from "ng2-file-upload";
import {isNullOrUndefined} from "util";
import {isUndefined} from "util";

const URL = 'http://localhost:3000/documentos';

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
    itemToCancelar: FileItem;

    categorias: Categoria[];
    categoriaSelected: Categoria;

    categoSelectedVolatile: string;

    uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 10});

    uploaderXml: FileUploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 1});
    uploaderPdf: FileUploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 1});

    constructor(private proveedorService: ProveedorService) {
        //this.currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));
    }

    ngOnInit() {
        // this.loadAllProveedores();

        this.currentProveedorToken = JSON.parse(localStorage.getItem('currentProveedor'));

        if (this.currentProveedorToken && this.currentProveedorToken.rfc) {
            //this.cargarDocumentos();
            this.cargarProveedor();

            this.cargarCategorias();
        } else {
            console.log("Get Proveedor Error");
        }

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onBuildItemForm = (item: FileItem, form) => {
            form.append("documento[proveedor_id]", this.currentProveedor.id);
            form.append("documento[categoria_id]",  this.categoSelectedVolatile);
            form.append("commit", "Save");
        };
        this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
            item.remove();
            $('#toastUploaded').trigger('show');
            this.cargarDocumentosOf();
        };
        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
            this.cargarDocumentosOf();
        };

        /* XML */
        this.uploaderXml.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploaderXml.onBuildItemForm = (item: FileItem, form) => {
            form.append("documento[proveedor_id]", this.currentProveedor.id);
            form.append("documento[categoria_id]", 98);
            form.append("commit", "Save");
        };
        this.uploaderXml.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
            item.remove();
            $('#toastUploaded').trigger('show');
            this.cargarDocumentosOf();
        };
        this.uploaderXml.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
            this.cargarDocumentosOf();
        };

        /* PDF */
        this.uploaderPdf.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploaderPdf.onBuildItemForm = (item: FileItem, form) => {
            form.append("documento[proveedor_id]", this.currentProveedor.id);
            form.append("documento[categoria_id]", 99);
            form.append("commit", "Save");
        };
        this.uploaderPdf.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
            item.remove();
            $('#toastUploaded').trigger('show');
            this.cargarDocumentosOf();
        };
        this.uploaderPdf.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
            this.cargarDocumentosOf();
        };

    }
/*
    cargarDocumentos() {
        this.proveedorService.getByRfc(this.currentProveedorToken.rfc).subscribe(
                (response: Proveedor) => {
                    this.currentProveedor = response;
                },
            error => console.log(error),
            () => console.log("Get Proveedor:" + this.currentProveedorToken.rfc)
        );
    }
*/
    cargarProveedor() {
        this.proveedorService.getByRfc(this.currentProveedorToken.rfc).subscribe(
            (response: Proveedor) => {
                this.currentProveedor = response;
            },
            error => console.log(error),
            () => console.log("Get Proveedor:" + this.currentProveedorToken.rfc)
        );
    }

    cargarDocumentosOf() {
        this.proveedorService.getDocusOf(this.currentProveedor.id).subscribe(
            (response: Documento[]) => {
                this.currentProveedor.documentos = response;
            },
            error => console.log(error),
            () => {}
        );
    }

    uploadItem(select_id: string, item: FileItem) {
        this.categoSelectedVolatile =  $('#' + select_id).val() ;
        item.upload();
    }

    cargarCategorias() {
        this.proveedorService.getCategos().subscribe(
            (response: Categoria[]) => {
                this.categorias = response;

                this.categoriaSelected = this.categorias[0];
            },
            error => console.log(error),
            () => console.log("Get Categos:" + this.currentProveedorToken.rfc)
        );
    }

    onTabSelect(event, details) {
        this.tab_selected = event.target.selected;
    }

    /*
    notificarCambio(cambio: any) {

        this.cargarDocumentosOf();

    }
*/

    download(docu: Documento) {
        this.proveedorService.downloadFile(docu.id).subscribe(blob => {
                importedSaveAs(blob, docu.file);
            $('#toastDownloaded').trigger('show');
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
                $('#toastDeleted').trigger('show');
            },
            error => console.log(error),
            () => {
                console.log("Delete documento: " + id);
                this.cargarDocumentosOf();
            }
        );
    }

    cancelar(item:FileItem) {
        $('#toastCanceled').trigger('show');
    }

    selectedCategoriaChange(event) {
        this.categoriaSelected = event; // se requiere; de lo contrario solo cambia el value pero no el Id
        if (isNullOrUndefined(this.categoriaSelected)) return;
        console.log("selectedCategoriaChange>> ", this.categoriaSelected, this.categoriaSelected.id, this.categoriaSelected.categoria);
    }
    getCodeNotEmpty(catego: Categoria):String   {
        let result = isNullOrUndefined(catego) ? '' : catego.categoria;
        console.log("getTextNotEmpty>> ", result);
        return result;
    };

    onChangeCategoria() {

    }

    onSearchXml() {
        //this.uploaderXml.clearQueue();
        //$('#uploader_xml_id').trigger('click');

    }
    onSearchPdf() {
    //    this.uploaderPdf.clearQueue();
    //    $('#uploader_pdf_id').trigger('click');
    }

}

