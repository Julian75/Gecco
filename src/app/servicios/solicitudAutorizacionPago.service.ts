import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudAutorizacionPago } from '../modelos/solicitudAutorizacionPago';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAutorizacionPagoService {

  private path = this.sharedService.APIUrl+'/SolicitudAutorizacionPago';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<SolicitudAutorizacionPago[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<SolicitudAutorizacionPago>(this.path+'/ObtenerId/'+id);
  }

  public registrar(solicitudAutorizacionPago: SolicitudAutorizacionPago){
    return this.http.post<void>(this.path+'/Guardar',solicitudAutorizacionPago);
  }

  public actualizar(solicitudAutorizacionPago: SolicitudAutorizacionPago){
    return this.http.put<void>(this.path+'/Modificar/'+ solicitudAutorizacionPago.id, solicitudAutorizacionPago);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
