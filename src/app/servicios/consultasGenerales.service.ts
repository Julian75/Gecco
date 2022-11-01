import { AsignacionArticulos2 } from './../modelos/modelos2/asignacionArticulos2';
import { Inventario2 } from './../modelos/modelos2/inventario2';
import { OrdenCompra2 } from './../modelos/ordenCompra2';
import { UsuariosAdministracion2 } from './../modelos/modelos2/usuariosAdministracion2';
import { Cotizacion2 } from './../modelos/cotizacion2';
import { ConsultaRaspa } from './../modelos/consultaRaspa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Historial2 } from '../modelos/modelos2/Historial2';
import { Soporte2 } from '../modelos/soporte2';
import { ArchivoSolicitud2 } from '../modelos/modelos2/archivoSolicitud2';
import { DetalleSolicitud2 } from '../modelos/detalleSolicitud2';
import { AsignarTurnoVendedor2 } from '../modelos/asignarTurnoVendedor2';
import { HistorialSolicitudes2 } from '../modelos/modelos2/historialSolicitudes2';
import { Cuentas2 } from '../modelos/modelos2/cuentas2';

@Injectable({
  providedIn: 'root'
})
export class ConsultasGeneralesService {

  private path = this.sharedService.APIUrl+'/ConsultasGenerales';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarRaspaGeco(id: number){
    return this.http.get<ConsultaRaspa[]>(this.path+"/ObtenerRaspa?raspa='"+id+"'");
  }

  public listarRaspaConsultaNoGecco(){
    return this.http.get<ConsultaRaspa[]>(this.path+"/ObtenerRaspasSiga");
  }

  public listarCotizacion(idSolicitud: number){
    return this.http.get<Cotizacion2[]>(this.path+"/ObtenerCotizacion?idSolicitud="+idSolicitud);
  }

  public listarUsuariosAdministracion(idSolicitud: number){
    return this.http.get<UsuariosAdministracion2[]>(this.path+"/ObtenerUsuariosAdministracion?idSolicitud="+idSolicitud);
  }

  public listarOrdenCompra(idSolicitud: number){
    return this.http.get<OrdenCompra2[]>(this.path+"/ObtenerOrdenCompra?idSolicitud="+idSolicitud);
  }

  public listarDetalleSolicitud(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitud?idSolicitud="+idSolicitud);
  }

  //Solicitudes detalles listadas por el id y cuando el estado sea diferente de 59
  public listarDetalleSolicitud2(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitudEst?idSolicitud="+idSolicitud);
  }

  //Solicitudes detalles listadas por el id y cuando el estado este en 56 o 57
  public listarDetalleSolicitudEstados(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitudEstados?idSolicitud="+idSolicitud);
  }

  //Todos los historiales que sean de una sola solicitud
  public listarHistorialSC(idSolicitudSC: number){
    return this.http.get<Historial2[]>(this.path+"/ObtenerHistorial?idSolicitudSC="+idSolicitudSC);
  }

  //Soportes subidos por parte de los remitentes en la solicitud
  public listarSoporteSC(idHistorialSC: number){
    return this.http.get<Soporte2[]>(this.path+"/ObtenerSoporteSC?idHistorialSC="+idHistorialSC);
  }

  //Soportes subidos por parte de los remitentes en la solicitud
  public listarArchivosSC(idSolicitudSC: number){
    return this.http.get<ArchivoSolicitud2[]>(this.path+"/ObtenerArchivosSC?idSolicitudSC="+idSolicitudSC);
  }

  //Listar Asignar turnos vendedores con fecha actual
  public listarAsignarTurnosVendedores(fechaActual: String){
    return this.http.get<AsignarTurnoVendedor2[]>(this.path+"/ObtenerAsignarTurnosVendedores?fechaActual="+fechaActual);
  }

  //Listar todos los inventarios que no tienen los mismos activos que ya se dieron de baja
  public listarInventariosSinBaja(){
    return this.http.get<Inventario2[]>(this.path+"/ObtenerInventarioBaja");
  }

  //Listar Asignaciones activas que no tienen los mismos activos que ya se dieron de baja
  public listarAsignacionesActivosSinBaja(){
    return this.http.get<AsignacionArticulos2[]>(this.path+"/ObtenerAsignacionArticulos");
  }

  //Listar Cuenta
  public listarCuenta(codigo){
    return this.http.get<Cuentas2[]>(this.path+"/ObtenerCuenta?codigo="+codigo);
  }

  //Lista todos los historiales que tengan el mismo id de solicitud del parametro
  public listarHistorialesSolicitudes(idSolicitudSC){
    return this.http.get<HistorialSolicitudes2[]>(this.path+"/ObtenerHistorialesSolicitudes?idSolicitudSC="+idSolicitudSC);
  }
  // public listarGestionProceso(idUsuario: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idUsuario="+idUsuario);
  // }

  // public listarProcesoCategoria(idCategoria: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idCategoria="+idCategoria);
  // }

}
