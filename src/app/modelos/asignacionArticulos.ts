import  {DetalleArticulo}  from  './detalleArticulo';
import {AsignacionProceso} from './asignacionProceso';
import {Estado} from './estado';
export class AsignacionArticulos {
    id: number;
    idAsignacionesProcesos !: AsignacionProceso;
    idDetalleArticulo !: DetalleArticulo;
    idEstado !: Estado;
}
