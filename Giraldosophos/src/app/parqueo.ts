import { Usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export class Parqueo {

    id!: number;
    vehiculo!: Vehiculo;
    fechaIngreso!: Date;
    fechaSalida: Date | undefined;
    observacion!: string;
    usuarioRegistraIngreso!: Usuario;
    usuarioRegistraSalida: Usuario | undefined
}
