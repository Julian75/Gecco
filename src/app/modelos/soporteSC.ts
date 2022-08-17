import {Usuario} from './usuario';
import {SolicitudSC} from './solicitudSC';
import {HistorialSolicitudes} from './historialSolicitudes';

export class SoporteSC{
    public id: number=0;
    public descripcion : string="";
    idUsuario !: Usuario;
    idSolicitudSC !: SolicitudSC;
    idHistorial !: HistorialSolicitudes;
}
