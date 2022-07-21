import {Solicitud} from './solicitud';
import { Estado } from "./estado";

export class Cotizacion {
  public id: number=0;
  public archivoPdf: string="";
  idSolicitud !: Solicitud;
  idEstado !: Estado;
}
