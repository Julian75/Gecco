import { Rol } from './rol';
import { Modulo } from './modulo';
export class Accesos {
  public id: number=0;
  public descripcion: string="";
  idModulo !: Modulo;
  idRol !: Rol;
}
