import { Alumno } from "./alumno";
import { Asistencia } from "./asistencia";
import { Generic } from "./generic"

export class Sesion implements Generic{
    id:number
    numSesion:number
    tema:string
    createAt: string;
    horaEntrada:string;
    horaSalida:string
    modalidad:string
    descripcion:string
    alumnos:Alumno [] = []
    asistencias:Asistencia [] = []
}
