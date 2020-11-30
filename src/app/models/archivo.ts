import { Generic } from './generic';
import { Usuario } from './usuario';

export class Archivo implements Generic{
    id:number
    nombre:string
    comentario:string
    tipo:string
    archivoHashCode:number
    usuario:Usuario[]
}
