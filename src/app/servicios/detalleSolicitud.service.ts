import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleSolicitud } from '../modelos/detalleSolicitud';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleSolicitudService {

  private path = this.sharedService.APIUrl+'/DetalleSolicitud';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<DetalleSolicitud[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<DetalleSolicitud>(this.path+'/ObtenerId/'+id);
  }

  public registrar(detalleSolicitud: DetalleSolicitud){
    return this.http.post<void>(this.path+'/Guardar',detalleSolicitud);
  }

  public actualizar(detalleSolicitud: DetalleSolicitud){
    return this.http.put<void>(this.path+'/Modificar/'+ detalleSolicitud.id,detalleSolicitud);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
