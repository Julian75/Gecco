import { DetalleArticulo } from './detalleArticulo';
import { Usuario } from "./usuario";
import { Estado } from "./estado";
export class SolicitudBajasArticulos{
    public id: number = 0
    public fecha: Date = new Date;
    public observacion: String = ""
    idUsuario !: Usuario
    idDetalleArticulo !: DetalleArticulo
    idEstado !: Estado
}
