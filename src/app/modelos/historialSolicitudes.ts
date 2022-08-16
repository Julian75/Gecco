import { Usuario } from "./usuario";
import { SolicitudSC } from "./solicitudSC";
import { Estado } from "./estado";

export class HistorialSolicitudes{

    public id: number=0;
    public observacion: string="";
    idUsuario !: Usuario
    idSolicitudSC !: SolicitudSC
    idEstado !: Estado
}
