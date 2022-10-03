import { Articulo } from "./articulo";
import { SolicitudBajasArticulos } from "./solicitudBajasArticulos";
import { OpcionArticuloBaja } from "./opcionArticuloBaja";

export class ArticulosBaja {
  public id: number=0;
  idArticulo !: Articulo;
  idSolicitudBaja !: SolicitudBajasArticulos;
  public descripcion: string="";
  idOpcionBaja !: OpcionArticuloBaja;
}
