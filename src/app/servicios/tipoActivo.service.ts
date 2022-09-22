import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoActivo } from '../modelos/tipoActivo';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoActivoService {

  private path = this.sharedService.APIUrl+'/TipoActivo';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoActivo[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoActivo>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoActivo: TipoActivo){
    return this.http.post<void>(this.path+'/Guardar',tipoActivo);
  }

  public actualizar(tipoActivo: TipoActivo){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoActivo.id,tipoActivo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

