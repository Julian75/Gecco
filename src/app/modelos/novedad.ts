import { AsignarPuntoVenta } from "./asignarPuntoVenta";
import { Estado } from "./estado";

export class Novedad {
  public id: number=0;
  public descripcion: string="";
  idEstado !: Estado;
  idPuntoVenta !: AsignarPuntoVenta;
}
