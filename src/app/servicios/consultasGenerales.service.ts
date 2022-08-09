import { OrdenCompra2 } from './../modelos/ordenCompra2';
import { UsuariosAdministracion2 } from './../modelos/modelos2/usuariosAdministracion2';
import { Cotizacion2 } from './../modelos/cotizacion2';
import { ConsultaRaspa } from './../modelos/consultaRaspa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { DetalleSolicitud2 } from '../modelos/detalleSolicitud2';

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

  // public listarGestionProceso(idUsuario: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idUsuario="+idUsuario);
  // }

  // public listarProcesoCategoria(idCategoria: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idCategoria="+idCategoria);
  // }

}
