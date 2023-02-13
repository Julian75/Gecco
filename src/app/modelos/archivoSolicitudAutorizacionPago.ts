import { Usuario } from "./usuario";
import { SolicitudAutorizacionPago } from "./solicitudAutorizacionPago";

export class ArchivoSolicitudAutorizacionPago{
    public id: number = 0;
    public nombreArchivo: string = "";
    idSoliticudAutorizacionPago !: SolicitudAutorizacionPago
    idUsuario!: Usuario
}
