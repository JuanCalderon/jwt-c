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
    { id: 1, text: 'Primera' },
    { id: 2, text: 'Segunda' },
    { id: 3, text: 'Tercera' },
    { id: 9, text: 'Sin categoría' }
];

export class Categoria {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}
*/