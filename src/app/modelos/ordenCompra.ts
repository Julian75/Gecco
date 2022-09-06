import { Usuario } from 'src/app/modelos/usuario';
import {Proveedor} from './proveedor';
import {Solicitud} from './solicitud';
import { Estado } from "./estado";

export class OrdenCompra {
  public id: number=0;
  idSolicitud !: Solicitud;
  idUsuario !: Usuario;
  idProveedor !: Proveedor;
  idEstado !: Estado;
  public anticipoPorcentaje: number=0;
  public subtotal: number=0;
  public descuento: number=0;
  public valorAnticipo: number=0;
}
