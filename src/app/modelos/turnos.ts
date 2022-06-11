import { Estado } from "./estado";

export class Turnos {
  public id: number=0;
  public descripcion: string="";
  public hora: Date = new Date();
  idEstado !: Estado;
}
