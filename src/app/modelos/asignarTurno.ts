import { TipoTurno } from './tipoTurno';
import { Estado } from "./estado";
import { Turnos } from "./turnos";

export class AsignarTurno {
  public id: number=0;
  idTurno !: Turnos;
  idEstado !: Estado;
  idTipoTurno !: TipoTurno;
  public idOficina: number=0;
  public nombreOficina: string="";
  public idSitioVenta: number=0;
  public nombreSitioVenta: string="";
}
