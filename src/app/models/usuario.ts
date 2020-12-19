import { Archivo } from './archivo';
import { Generic } from './generic';
import { Roles } from './roles';

export class Usuario implements Generic{
    id:number
    username:string
    password:string
    isLog:boolean
    roles:string[] = []
    archivos:Archivo[] = []
}
