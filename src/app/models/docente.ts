import { Alumno } from './alumno';
import { Examen } from './examen';
import { Generic } from './generic';
import { Usuario } from './usuario';

export class Docente implements Generic{
    id:number
    nombre:string
    apellido:string
    correo:string
    division:string
    usuario:Usuario
    alumnos:Alumno[] = []
    examenes:Examen[] = []
}
