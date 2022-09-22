import {Usuario} from './usuario';
import {TipoProceso} from './tipoProceso';
export class AsignacionProceso {
  id: number;
  idUsuario !: Usuario;
  idProceso !: TipoProceso;
}
