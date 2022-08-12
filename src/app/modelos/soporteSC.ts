import {Usuario} from './usuario';
import {SolicitudSC} from './solicitudSC';

export class SoporteSC{
    public id: number=0;
    public descripcion : string="";
    idUsuario !: Usuario;
    idSolicitudSC !: SolicitudSC;
}
