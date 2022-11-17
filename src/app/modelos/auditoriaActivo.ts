import { AsignacionPuntoVenta } from './asignacionPuntoVenta';
import { AuditoriaActivoRegistro } from './audioriaActivoRegistro';
export class AuditoriaActivo {
  public id: number=0;
  public estado: string="";
  idAsignacionPuntoVentaArticulo !: AsignacionPuntoVenta;
  idAuditoriaActivoRegistro !: AuditoriaActivoRegistro;
}
