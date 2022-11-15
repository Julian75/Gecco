import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { Usuario } from './usuario';
export class AuditoriaActivo {
  public id: number=0;
  public estado: string="";
  public fecha: Date = new Date();
  idDetalleArticulo !: DetalleArticulo;
  idUsuario !: Usuario;
}
