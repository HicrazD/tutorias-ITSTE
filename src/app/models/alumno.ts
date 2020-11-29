import { Generic } from './generic' 
import { Usuario } from './usuario'
export class Alumno implements Generic{
    id:number
    nombre:string
    apellido:string
    correo:string
    carrera:string
    usuario:Usuario
}
