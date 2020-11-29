import { Generic } from './generic' 
import { Usuario } from './usuario'
export class Alumno implements Generic{
    id:number
    matricula:number
    nombre:string
    apellido:string
    correo:string
    carrera:string
    semestre:string
    telefono:number
    promAsistencia:number    
    usuario:Usuario

}
