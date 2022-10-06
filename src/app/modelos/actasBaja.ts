import { SolicitudBajasArticulos } from './solicitudBajasArticulos';
export class ActasBaja{
    public id: number=0;
    idSolicitudBajaArticulos !: SolicitudBajasArticulos;
    public codigoUnico : string="";
    public fecha: Date = new Date;
}
