import {AsignacionArticulos} from './asignacionArticulos';
export class AsignacionPuntoVenta {
    id: number;
    idAsignacionesArticulos !: AsignacionArticulos;
    public idOficina: number=0;
    public idSitioVenta: number=0;
    public cantidad: number=0;
    public nombreOficina: String="";
    public nombreSitioVenta: String="";
}
