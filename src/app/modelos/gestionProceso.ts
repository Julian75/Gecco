import { Usuario } from './usuario';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { Estado } from 'src/app/modelos/estado';
import { Proceso } from './proceso';

export class GestionProceso {
  public id: number=0;
  public comentario: string="";
  idProceso !: Proceso;
  idDetalleSolicitud !: DetalleSolicitud;
  idEstado !: Estado;
  idUsuario !: Usuario;
}
