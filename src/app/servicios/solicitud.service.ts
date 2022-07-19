import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../modelos/solicitud';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private path = this.sharedService.APIUrl+'/Solicitud';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Solicitud[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Solicitud>(this.path+'/ObtenerId/'+id);
  }

  public registrar(solicitud: Solicitud){
    return this.http.post<void>(this.path+'/Guardar',solicitud);
  }

  public actualizar(solicitud: Solicitud){
    return this.http.put<void>(this.path+'/Modificar/'+ solicitud.id,solicitud);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
