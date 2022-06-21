import { Usuario } from 'src/app/modelos/usuario';
import { TipoNovedades } from './tipoNovedades';
import { AsignarTurnoVendedor } from "./asignarTurnoVendedor";

export class Novedad {
  public id: number=0;
  public fecha: Date = new Date();
  public observacion: string="";
  idAsignarTurnoVendedor !: AsignarTurnoVendedor;
  idTipoNovedad !: TipoNovedades;
  idUsuario !: Usuario;
}
