import {Articulo} from "./articulo";
import {Estado} from "./estado";
import {Usuario} from "./usuario";
import {TipoActivo} from "./tipoActivo";
export class DetalleArticulo{
    public id: number=0;
    idArticulos !: Articulo;
    public serial: string="";
    idEstado !: Estado;
    idUsuario !: Usuario;
    public placa : string="";
    public marca : string="";
    idTipoActivo !: TipoActivo;
    public codigo : string="";
}
