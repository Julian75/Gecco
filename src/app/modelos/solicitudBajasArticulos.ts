import { Articulo } from './articulo';
import { Usuario } from "./usuario";
import { Estado } from "./estado";
export class SolicitudBajasArticulos{
    public id: number = 0
    public fecha: Date = new Date;
    public usuarioAutorizacion: number = 0
    public usuarioConfirmacion: number = 0
    public estadoContabilidad: String = ""
    idUsuario !: Usuario
    idEstado !: Estado
}
