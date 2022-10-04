import {Articulo} from "./articulo";
import {Estado} from "./estado";
import {Usuario} from "./usuario";
import {TipoActivo} from "./tipoActivo";
export class DetalleArticulo{
    public id: number=0;
    idArticulo !: Articulo;
    public serial: string="";
    idEstado !: Estado;
    idUsuario !: Usuario;
    public placa : string="";
    public marca : string="";
    public codigoContable : string="";
    idTipoActivo !: TipoActivo;
    public codigoUnico : string="";
}
