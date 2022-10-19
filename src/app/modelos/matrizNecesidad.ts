import { TipoActivo } from './tipoActivo';
import { SubProceso } from "./subProceso";
import { TipoNecesidad } from "./tipoNecesidad";

export class MatrizNecesidad {
  public id: number=0;
  public fecha: Date = new Date();
  public detalle: string="";
  public cantidad: number=0;
  public cantidadEjecuciones: number=0;
  public porcentajeTotal: number=0;
  public costoUnitario: number=0;
  public costoEstimado: number=0;
  public costoTotal: number=0;
  idSubProceso !: SubProceso;
  idTipoNecesidad !: TipoNecesidad;
  idTipoActivo !: TipoActivo;
}
