import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { Usuario } from 'src/app/modelos/usuario';
export class AsignacionesActivosPendiente {
    id: number;
    idUsuario !: Usuario;
    idUsuarioAsignacionPendiente !: Usuario;
    idDetalleActivo !: DetalleArticulo;
}
