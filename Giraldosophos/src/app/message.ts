import { Costo } from './costo';
import { Parqueo } from './parqueo';
import { Propietario } from './propietario';
import { Tipologia } from './tipologia';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';
export class Message {

   message!: string;
   error!: string;

   propietarios!: Propietario[];
   vehiculos!: Vehiculo[];
   parqueos!: Parqueo[];
   usuarios!: Usuario[];
   costos!: Costo[];
   tipologias!:Tipologia[];

    }
