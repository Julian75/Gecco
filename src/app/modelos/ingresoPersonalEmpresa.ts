import {TipoDocumento} from './tipoDocumento';
import {Area} from './area';
import {Estado} from './estado';
export class IngresoPersonalEmpresa{
    public id: number=0;
    public nombre: string="";
    public apellido: string="";
    idTipoDocumento !: TipoDocumento;
    public documento: number=0;
    idArea !: Area;
    public horaIngreso: Date = new Date();
    public horaSalida: Date = new Date();
    idEstado !: Estado;
    public fecha: Date = new Date();
    public ideOficina: number=0;
}
