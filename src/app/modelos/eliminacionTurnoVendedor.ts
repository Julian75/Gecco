import { Usuario } from './usuario';
import { AsignarTurnoVendedor } from "./asignarTurnoVendedor";

export class EliminacionTurnoVendedor {
  public id: number=0;
  public observacion: string="";
  public estado: string="";
  idAsignarTurnoVendedor !: AsignarTurnoVendedor;
  idUsuario !: Usuario;
}
