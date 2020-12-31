import { Alumno } from "./alumno"
import { Docente } from "./docente"
import { Examen } from "./examen"
import { Generic } from "./generic"

export class Resultado implements Generic{
    id:number
    resultado:number 
    alumno:Alumno
    examen:Examen
    docente:Docente
}
