import { AsignarTurno2 } from './../modelos/asignarTurno2';
import { EliminacionTurnoVendedor2 } from './../modelos/eliminacionTurnoVendedor2';
import { AsignarTurnoVendedor2 } from './../modelos/asignarTurnoVendedor2';
import { Usuario2 } from './../modelos/usuario2';
import { Articulo2 } from './../modelos/articulo2';
import { Categoria2 } from './../modelos/categoria2';
import { Proveedor2 } from './../modelos/proveedor2';
import { OrdenCompra2 } from './../modelos/ordenCompra2';
import { Proceso2 } from './../modelos/proceso2';
import { GestionProceso2 } from './../modelos/gestionProceso2';
import { Cotizacion2 } from './../modelos/cotizacion2';
import { CotizacionPdf2 } from './../modelos/cotizacionPdf2';
import { DetalleSolicitud2 } from './../modelos/detalleSolicitud2';
import { Solicitud2 } from './../modelos/solicitud2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarService {

  private path = this.sharedService.APIUrl+'/Modificar';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public actualizarAsignarTurnoVendedor(asignarTurnoVendedor: AsignarTurnoVendedor2){
    return this.http.put<void>(this.path+'/AsignarTurnoVendedor/'+ asignarTurnoVendedor.id, asignarTurnoVendedor);
  }

  public actualizarEliminacion(eliminacion: EliminacionTurnoVendedor2){
    return this.http.put<void>(this.path+'/Eliminacion/'+ eliminacion.id, eliminacion);
  }

  public actualizarUsuario(usuario: Usuario2){
    return this.http.put<void>(this.path+'/Usuario/'+ usuario.id, usuario);
  }

  public actualizarArticulos(articulos: Articulo2){
    return this.http.put<void>(this.path+'/Articulos/'+ articulos.id, articulos);
  }

  public actualizarCategoria(categoria: Categoria2){
    return this.http.put<void>(this.path+'/Categoria/'+ categoria.id, categoria);
  }

  public actualizarCotizacion(cotizacion: Cotizacion2){
    return this.http.put<void>(this.path+'/Cotizacion/'+ cotizacion.id, cotizacion);
  }

  public actualizarCotizacionPdf(cotizacionPdf: CotizacionPdf2){
    return this.http.put<void>(this.path+'/CotizacionPdf/'+ cotizacionPdf.id, cotizacionPdf);
  }

  public actualizarDetalleSolicitud(detalleSolicitud: DetalleSolicitud2){
    return this.http.put<void>(this.path+'/DetalleSolicitud/'+ detalleSolicitud.id, detalleSolicitud);
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    return this.http.put<void>(this.path+'/Solicitud/'+ solicitud.id, solicitud);
  }

  public actualizarProveedor(proveedor: Proveedor2){
    return this.http.put<void>(this.path+'/Proveedor/'+ proveedor.id, proveedor);
  }

  public actualizarGestionProceso(gestionproceso: GestionProceso2){
    return this.http.put<void>(this.path+'/GestionProceso/'+ gestionproceso.id, gestionproceso);
  }

  public actualizarOrdenCompra(ordencompra: OrdenCompra2){
    return this.http.put<void>(this.path+'/OrdenCompra/'+ ordencompra.id, ordencompra);
  }

  public actualizarProceso(proceso: Proceso2){
    return this.http.put<void>(this.path+'/Proceso/'+ proceso.id, proceso);
  }

  public actualizarAsignarTurnoPuntoVenta(asignarTurnoPuntoVenta: AsignarTurno2){
    return this.http.put<void>(this.path+'/AsignarTurnoPuntoVenta/'+ asignarTurnoPuntoVenta.id, asignarTurnoPuntoVenta);
  }

}
