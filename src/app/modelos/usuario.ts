import { Estado } from "./estado";
import { Rol } from "./rol";
import { TipoDocumento } from "./tipoDocumento";

export class Usuario {
  public id: number=0;
  public nombre: string="";
  public apellido: string="";
  public correo: string="";
  public documento: number=0;
  public password: String="";
  public cifra: String="";
  idRol !: Rol;
  idTipoDocumento !: TipoDocumento;
  idEstado !: Estado;
}
