import { Estado } from './estado';
import {TipoProceso} from './tipoProceso';
export class SubProceso{
    public id: number=0;
    public descripcion: string = "";
    idTipoProceso !: TipoProceso;
    idEstado !: Estado;
}
