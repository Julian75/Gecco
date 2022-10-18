import { SolicitudSC } from "./solicitudSC";
import { Usuario } from "./usuario";

export class ChatRemitente{
    public id: number=0;
    public asunto: string="";
    public fecha: Date = new Date();
    public mensaje: string="";
    idSolicitudSC !: SolicitudSC;
    idUsuarioEnvia !: Usuario;
    idUsuarioRecibe !: Usuario;
}
