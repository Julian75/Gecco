import { Articulo } from './articulo';
import {AsignacionProceso} from './asignacionProceso';
import {Estado} from './estado';
export class AsignacionArticulos {
    id: number;
    idAsignacionesProcesos !: AsignacionProceso;
    idArticulo !: Articulo;
    idEstado !: Estado;
}
