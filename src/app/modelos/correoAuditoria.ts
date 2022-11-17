import { Usuario } from 'src/app/modelos/usuario';
import { AuditoriaActivo } from 'src/app/modelos/auditoriaActivo';
export class CorreoAuditoria {
  public id: number=0;
  public asunto: string="";
  public mensaje: string="";
  idAuditoriaActivo !: AuditoriaActivo;
  idUsuarioEnvias !: Usuario;
  idUsuarioRecibe !: Usuario;
}
