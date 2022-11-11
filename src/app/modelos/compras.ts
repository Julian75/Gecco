import { Articulo } from "./articulo";
import { OrdenCompra } from "./ordenCompra";
import { Usuario } from "./usuario";

export class Compras{
    public id: number=0;
    public cantidad: number=0;
    idUsuario !: Usuario;
    idArticulo !: Articulo;
    idOrdenCompra !: OrdenCompra;
}
