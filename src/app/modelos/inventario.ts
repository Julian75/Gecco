import { Articulo } from './articulo';
import {DetalleArticulo} from './detalleArticulo';
export class Inventario {
  public id: number=0;
  id_articulo !: Articulo;
  id_detalle_articulo !: DetalleArticulo;
  public cantidad: number=0;
}
