import { Sedes } from 'src/app/modelos/sedes';
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
    public horaIngreso: String="";
    public horaSalida: String="";
    idEstado !: Estado;
    idSedes !: Sedes;
    public fecha: Date = new Date();
    public ideOficina: number=0;
    public nombreImagen: String="";
    public rh: String="";
    public telefono: String="";
    public eps: String="";
    public arl: String="";
}
