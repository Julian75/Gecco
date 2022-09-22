import {DetalleArticulo} from './detalleArticulo';
import {Usuario} from './usuario';
export class HistorialArticulos {
    public id: number;
    idDetalleArticulo !: DetalleArticulo;
    public fecha: Date = new Date();
    public observacion: string = "";
    idUsuario !: Usuario;
}
