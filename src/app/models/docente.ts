import { Alumno } from './alumno';
import { Generic } from './generic';

export class Docente implements Generic{
    id:number
    nombre:string
    apellido:string
    correo:string
    division:string
    alumnos:Alumno[] = []
}
