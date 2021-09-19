import { Propietario } from "./propietario";
import { Tipologia } from "./tipologia";

export class Vehiculo {
    id!: number;
    placa!: string;
    tipoVehiculo!: Tipologia;
    propietario!: Propietario;
    
}
