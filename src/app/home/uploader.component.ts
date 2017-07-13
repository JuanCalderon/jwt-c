/**
 * Created by calderon on 6/26/17.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {FileUploader, FileItem} from "ng2-file-upload";
import * as $ from 'jquery';

const URL = 'http://localhost:3000/documentos';

@Component({
    selector: 'uploader-component',
    templateUrl: 'uploader.component.html',
    styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {

    private uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 10});
    _categoria: number = 1;
    _proveedor: number = 1;

    @Output() cambio = new EventEmitter<any>();

    constructor() {
        //this.currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));

        //this.uploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 1});
    }

    @Input()
    public set categoria(categoria_id: number) {
        this._categoria = categoria_id;
    }

    @Input()
    public set proveedor(proveedor_id: number) {
        this._proveedor = proveedor_id;
    }

    ngOnInit() {

        //this.uploader = new FileUploader({url: URL, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 10});

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onBuildItemForm = (item, form) => {
            form.append("documento[proveedor_id]", this._proveedor);
            form.append("documento[categoria_id]", this._categoria);
            form.append("commit", "Save");
        };

        this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
           console.log("completeItem>>>: ", item, this._proveedor, this._categoria);

           item.remove();

            this.cambio.emit('hello');

        };
        this.uploader.onCompleteAll = () => {
            console.log('completeALLL');
            //this.uploader.clearQueue();

            //this.cambio.emit('hello');
        };
        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
        };

        this.uploader.onAfterAddingFile = f => {
            /*
            if (this.uploader.queue.length > 1) {
                this.uploader.removeFromQueue(this.uploader.queue[0]);
            }
            */
        };

    }

    seleccionar() {
        this.uploader.clearQueue();
        $('#file_uploader_' + this._categoria).trigger('click');
    }
    seleccionar2() {
        //this.uploader.clearQueue();
        $('#file_uploader_' + this._categoria).trigger('click');
    }

    subir() {
        this.uploader.uploadAll();
    }
    subir2(item: FileItem) {
        item.upload();
    }

    cancelar() {
        this.uploader.clearQueue();
        this.uploader.cancelAll();
        /*
        while (this.uploader.queue.length > 0) {
            this.uploader.removeFromQueue(this.uploader.queue[0]);
        }
        */
    }

    disableSubir() {
        return this.uploader.queue.length <= 0 || this.uploader.isUploading;
    }

    disableCancenlar() {
        return this.uploader.queue.length <= 0 || this.uploader.isUploading;
    }

}
