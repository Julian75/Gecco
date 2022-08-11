import { Usuario } from "./usuario";
import { SolicitudSC } from "./solicitudSC";
export class HistorialSolicitudes{
    public id: number=0;
    public observacion: string="";
    idUsuario !: Usuario
    idSolicitud !: SolicitudSC
}
