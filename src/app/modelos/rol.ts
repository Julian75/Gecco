import { Estado } from "./estado";
import { Jerarquia } from "./jerarquia";

export class Rol {
  public id: number=0;
  public descripcion: string="";
  idEstado !: Estado;
  idJerarquia !: Jerarquia;
}
