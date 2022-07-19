import { Estado } from "./estado";
import {TipoDocumento} from "./tipoDocumento";

export class Proveedor {
  public id: number=0;
  public nombre: string="";
  idTipoDocumento!: TipoDocumento;
  public documento: string="";
  public telefono: number=0;
  public direccion : string="";
  public observacion: string="";
  idEstado !: Estado;
}
