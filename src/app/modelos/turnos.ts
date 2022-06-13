import { TipoTurno } from './tipoTurno';
import { Estado } from "./estado";

export class Turnos {
  public id: number=0;
  public descripcion: string="";
  public horaInicio: Date = new Date();
  public horaFinal: Date = new Date();
  idEstado !: Estado;
  idTipoTurno !: TipoTurno;
}
