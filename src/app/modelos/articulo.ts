import { Categoria } from "./categoria";
import { Estado } from "./estado";

export class Articulo {
  public id: number=0;
  public descripcion: string="";
  idEstado !: Estado;
  idCategoria !: Categoria
}
