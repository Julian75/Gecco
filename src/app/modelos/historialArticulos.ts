import { Articulo } from './articulo';
import {Usuario} from './usuario';
export class HistorialArticulos {
    public id: number;
    idArticulo !: Articulo;
    public fecha: Date = new Date();
    public observacion: string = "";
    idUsuario !: Usuario;
}
