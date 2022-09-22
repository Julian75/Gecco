import {AsignacionArticulos} from './asignacionArticulos';
export class AsignacionPuntoVenta {
    id: number;
    idAsignacionArticulo !: AsignacionArticulos;
    public ideOficina: number=0;
    public idSitioVenta: number=0;
}
