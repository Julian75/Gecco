import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RechazarSolicitudAutorizacionPremios } from '../modelos/rechazarSolicitudAutorizacionPremios';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RechazoSolicitudAutorizacionPremios {

  private path = this.sharedService.APIUrl+'/RechazoSolicitudAutorizacionPremios';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<RechazarSolicitudAutorizacionPremios[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<RechazarSolicitudAutorizacionPremios>(this.path+'/ObtenerId/'+id);
  }

  public registrar(rechazo: RechazarSolicitudAutorizacionPremios){
    return this.http.post<void>(this.path+'/Guardar',rechazo);
  }

  public actualizar(rechazo: RechazarSolicitudAutorizacionPremios){
    return this.http.put<void>(this.path+'/Modificar/'+ rechazo.id,rechazo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
