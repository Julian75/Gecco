import { Usuario } from './usuario';
import {Solicitud} from './solicitud';
import { Estado } from "./estado";

export class Cotizacion {
  public id: number=0;
  idSolicitud !: Solicitud;
  idEstado !: Estado;
  idUsuario !: Usuario;
}
