import { DetalleArticulo } from "./detalleArticulo";
import { SolicitudBajasArticulos } from "./solicitudBajasArticulos";
import { OpcionArticuloBaja } from "./opcionArticuloBaja";
import { Estado } from "./estado";

export class ArticulosBaja {
  public id: number=0;
  idDetalleArticulo !: DetalleArticulo;
  idSolicitudBaja !: SolicitudBajasArticulos;
  public observacion: string="";
  idOpcionBaja !: OpcionArticuloBaja;
  idEstado !: Estado;
}
