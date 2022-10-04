import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { Articulo } from './articulo';
import {AsignacionProceso} from './asignacionProceso';
import {Estado} from './estado';
export class AsignacionArticulos {
    id: number;
    idAsignacionesProcesos !: AsignacionProceso;
    idDetalleArticulo !: DetalleArticulo;
    idArticulo !: Articulo;
    idEstado !: Estado;
}
