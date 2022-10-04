import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { Articulo } from './articulo';
import {Usuario} from './usuario';
export class HistorialArticulos {
    public id: number;
    idArticulo !: Articulo;
    idDetalleArticulo !: DetalleArticulo;
    public fecha: Date = new Date();
    public observacion: string = "";
    idUsuario !: Usuario;
}
