import { Tipologia } from "./tipologia";

export class Usuario {

    id!: number;
    usuario!: string;
    password!: string;
    activo!: number;
    tipoUsuario!: Tipologia
    
}
