import { MatrizNecesidadDetalle } from "./MatrizNecesidadDetalle";
import {Usuario} from "./usuario";

export class RechazoMatrizDetalle {
  public id: number=0;
  public comentario: string="";
  idMatrizDetalle !: MatrizNecesidadDetalle;
  idUsuario !: Usuario;
}
