import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RechazoMatrizDetalle } from '../modelos/rechazoMatrizDetalle';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RechazoMatrizDetalleService {

  private path = this.sharedService.APIUrl+'/RechazoMatrizDetalle';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<RechazoMatrizDetalle[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<RechazoMatrizDetalle>(this.path+'/ObtenerId/'+id);
  }

  public registrar(rechazoMatrizDetalle: RechazoMatrizDetalle){
    return this.http.post<void>(this.path+'/Guardar',rechazoMatrizDetalle);
  }

  public actualizar(rechazoMatrizDetalle: RechazoMatrizDetalle){
    return this.http.put<void>(this.path+'/Modificar/'+ rechazoMatrizDetalle.id,rechazoMatrizDetalle);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
