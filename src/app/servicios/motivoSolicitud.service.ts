import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoSolicitud } from '../modelos/MotivoSolicitud';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MotivoSolicitudService {

  private path = this.sharedService.APIUrl+'/MotivoSolicitud';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MotivoSolicitud[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MotivoSolicitud>(this.path+'/ObtenerId/'+id);
  }

  public registrar(motivoSolicitud: MotivoSolicitud){
    return this.http.post<void>(this.path+'/Guardar',motivoSolicitud);
  }

  public actualizar(motivoSolicitud: MotivoSolicitud){
    return this.http.put<void>(this.path+'/Modificar/'+ motivoSolicitud.id,motivoSolicitud);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

