import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'CategoriaPipe'
})
export class CategoriaPipe implements PipeTransform {

    transform(value, args?) {
        // ES6 array destructuring
        return value.filter(documento => {
            return documento.categoria_id == args;
        });
    }
}