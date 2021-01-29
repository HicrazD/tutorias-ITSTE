import { Alumno } from "./alumno";
import { Generic } from "./generic";

export class Asistencia implements Generic{
    id:number
    statusAsistencia:boolean
    alumno:Alumno
    createAt:string
}
