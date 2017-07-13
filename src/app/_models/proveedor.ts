import {FileItem} from "ng2-file-upload";
/**
 * Created by calderon on 5/17/17.
 */
export class Proveedor {
    id: number
    rfc: string;
    password: string;
    razon_social: string;
    auth_token: string;

    documentos: Documento[];

}

export class Documento {
    id: number;
    attachment; string;
    file: string;
    categoria_id: number;
    proveedor_id: number;
    updated_at: Date;
    created_at: Date;
}

/*
export const CATEGORIAS: Categoria[] = [
    { id: 0, categoria: 'Sin categoría' },
    { id: 1, code: 'Primera' },
    { id: 2, code: 'Segunda' },
    { id: 3, code: 'Tercera' }
];
*/
export class Categoria {
    id: number;
    categoria: string;

}

export class Archivo extends FileItem {

    categoSelected: number = 0;

}