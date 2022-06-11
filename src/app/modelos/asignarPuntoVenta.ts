import { AsignarTurno } from "./asignarTurno";
import { Estado } from "./estado";

export class AsignarPuntoVenta {
  public id: number=0;
  public descripcion: string="";
  idEstado !: Estado;
  idAsignarTurno !: AsignarTurno
}
