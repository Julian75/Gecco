import { Turnos } from "./turnos";

export class AsignarTurnoVendedor {
  public id: number=0;
  public horaInicio: string="";
  public horaFinal: string="";
  idTurno !: Turnos;
  public idOficina: number=0;
  public nombreOficina: string="";
  public idSitioVenta: number=0;
  public nombreSitioVenta: string="";
  public idVendedor: number=0;
  public nombreVendedor: string="";
}
