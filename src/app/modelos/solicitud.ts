import { Usuario } from './usuario';
import { Estado } from "./estado";

export class Solicitud {
  public id: number=0;
  public fecha: Date = new Date;
  idUsuario !: Usuario;
  idEstado !: Estado;
}
