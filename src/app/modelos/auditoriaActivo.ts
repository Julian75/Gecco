import { AsignacionPuntoVenta } from './asignacionPuntoVenta';
import { Usuario } from './usuario';
export class AuditoriaActivo {
  public id: number=0;
  public estado: string="";
  public fecha: Date = new Date();
  idAsignacionPuntoVentaArticulo !: AsignacionPuntoVenta;
  idUsuario !: Usuario;
}
