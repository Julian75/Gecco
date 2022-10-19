import { MatrizNecesidad } from "./matrizNecesidad";

export class MatrizNecesidadDetalle {
  public id: number=0;
  public descripcion: string="";
  public fecha: Date = new Date();
  public porcentaje: number=0;
  public cantidadEjecuciones: number=0;
  public cantidadEjecucionesCumplidas: number=0;
  public cantidadEstimada: number=0;
  public cantidadComprada: number=0;
  public costoEjecucionComprada: number=0;
  idMatrizNecesidad !: MatrizNecesidad;
}
