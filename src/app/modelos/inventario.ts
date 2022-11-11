import { Articulo } from './articulo';
import {DetalleArticulo} from './detalleArticulo';
import { OrdenCompra } from './ordenCompra';
import { Usuario } from './usuario';
export class Inventario {
  public id: number=0;
  public fecha: Date = new Date();
  idUsuario !: Usuario
  idDetalleArticulo !: DetalleArticulo;
  public cantidad: number=0;
  idOrdenCompra !: OrdenCompra;
}
