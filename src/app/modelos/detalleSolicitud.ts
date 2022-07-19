import { Estado } from "./estado";
import {Articulo} from "./articulo";
import {Solicitud} from "./solicitud";

export class DetalleSolicitud {
  public id: number=0;
  idArticulos !: Articulo;
  idSolicitud !: Solicitud;
  public valorUnitario: number=0;
  public cantidad: number=0;
  public valorTotal: number=0;
  public observacion: string="";
  idEstado !: Estado;
}
