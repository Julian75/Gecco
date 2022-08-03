import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export class Proceso {
  public id: number=0;
  idCategoria !: Categoria
  idUsuario !: Usuario
}
