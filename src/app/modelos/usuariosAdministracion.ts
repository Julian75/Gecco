import { Usuario } from './usuario';
import { Solicitud } from './solicitud';

export class UsuariosAdministracion {
  public id: number=0;
  idSolicitud !: Solicitud;
  idUsuario !: Usuario;
}
