import { Articulo } from './articulo';
import {DetalleArticulo} from './detalleArticulo';
export class Inventario {
  public id: number=0;
  idArticulo !: Articulo;
  idDetalleArticulo !: DetalleArticulo;
  public cantidad: number=0;
}
