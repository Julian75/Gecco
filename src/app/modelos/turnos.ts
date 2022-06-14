import { TipoTurno } from './tipoTurno';
import { Estado } from "./estado";

export class Turnos {
  public id: number=0;
  public descripcion: string="";
  public horaInicio: string="";
  public horaFinal: string="";
  idEstado !: Estado;
  idTipoTurno !: TipoTurno;
}
