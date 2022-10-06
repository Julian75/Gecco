import { DetalleArticulo } from "./detalleArticulo";
import { SolicitudBajasArticulos } from "./solicitudBajasArticulos";
import { OpcionArticuloBaja } from "./opcionArticuloBaja";

export class ArticulosBaja {
  public id: number=0;
  idDetalleArticulo !: DetalleArticulo;
  idSolicitudBaja !: SolicitudBajasArticulos;
  public observacion: string="";
  idOpcionBaja !: OpcionArticuloBaja;
}
