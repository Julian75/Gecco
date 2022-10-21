import { OrdenCompra } from 'src/app/modelos/ordenCompra';
import { MatrizNecesidad } from "./matrizNecesidad";
import { Estado } from "./estado";

export class MatrizNecesidadDetalle {
  public id: number=0;
  public descripcion: string="";
  public fecha: Date = new Date();
  public fechaEjecutada: string = "";
  public porcentaje: number=0;
  public cantidadEjecuciones: number=0;
  public cantidadEjecucionesCumplidas: number=0;
  public cantidadEstimada: number=0;
  public cantidadComprada: number=0;
  public costoEjecucionComprada: number=0;
  public idOrdenCompra: number=0;
  idMatrizNecesidad !: MatrizNecesidad;
  idEstado !: Estado;
}
