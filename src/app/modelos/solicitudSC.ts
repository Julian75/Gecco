import {MotivoSolicitud} from './MotivoSolicitud';
import {TipoServicio} from './tipoServicio';
import {EscalaSolicitudes} from './escalaSolicitudes';
import {Estado} from './estado';
import {ClienteSC} from './clienteSC';

export class SolicitudSC {
    public id: number=0;
    public fecha : Date = new Date();
    public vence : Date = new Date();
    public municipio : string = "";
    public incidente : string = "";
    idMotivoSolicitud !: MotivoSolicitud;
    public medioRadicacion : string = "";
    idTipoServicio !: TipoServicio
    public auxiliarRadicacion : string = "";
    idEscala !: EscalaSolicitudes
    idEstado !: Estado
    idClienteSC !: ClienteSC;
}
