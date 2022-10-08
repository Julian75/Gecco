import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoNecesidad } from '../modelos/tipoNecesidad';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoNecesidadService {

  private path = this.sharedService.APIUrl+'/TipoNecesidad';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoNecesidad[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoNecesidad>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoNecesidad: TipoNecesidad){
    return this.http.post<void>(this.path+'/Guardar',tipoNecesidad);
  }

  public actualizar(tipoNecesidad: TipoNecesidad){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoNecesidad.id,tipoNecesidad);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

