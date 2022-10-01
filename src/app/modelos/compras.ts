import { Articulo } from "./articulo";
import { Usuario } from "./usuario";

export class Compras{
    public id: number=0;
    public cantidad: number=0;
    idUsuario !: Usuario;
    idArticulo !: Articulo;
}
