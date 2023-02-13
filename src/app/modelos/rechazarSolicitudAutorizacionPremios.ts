import {SolicitudAutorizacionPago} from '../modelos/solicitudAutorizacionPago';
import {Usuario} from '../modelos/usuario';
export class RechazarSolicitudAutorizacionPremios{
  public id: number = 0;
  public comentario: string = '';
  idSolicitudAutorizacionPremios !: SolicitudAutorizacionPago;
  idUsuario !: Usuario
}
