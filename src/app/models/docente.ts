import { Alumno } from './alumno';
import { Examen } from './examen';
import { Generic } from './generic';
import { Sesion } from './sesion';
import { Usuario } from './usuario';

export class Docente implements Generic{
    id:number
    nombre:string
    apellido:string
    correo:string
    division:string
    telefono:number
    usuario:Usuario
    alumnos:Alumno[] = []
    examenes:Examen[] = []
    sesiones:Sesion[] = []
}
