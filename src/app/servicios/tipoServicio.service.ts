import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoServicio } from '../modelos/tipoServicio';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  private path = this.sharedService.APIUrl+'/TipoServicio';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoServicio[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoServicio>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoServicio: TipoServicio){
    return this.http.post<void>(this.path+'/Guardar',tipoServicio);
  }

  public actualizar(tipoServicio: TipoServicio){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoServicio.id,tipoServicio);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

