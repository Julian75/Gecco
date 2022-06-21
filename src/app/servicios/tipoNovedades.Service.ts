import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoNovedades } from '../modelos/tipoNovedades';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoNovedadesService {

  private path = this.sharedService.APIUrl+'/TipoNovedades';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoNovedades[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoNovedades>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoNovedades: TipoNovedades){
    return this.http.post<void>(this.path+'/Guardar',tipoNovedades);
  }

  public actualizar(tipoNovedades: TipoNovedades){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoNovedades.id,tipoNovedades);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

