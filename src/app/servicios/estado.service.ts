import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../modelos/estado';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private path = this.sharedService.APIUrl+'/Estado';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Estado[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Estado>(this.path+'/ObtenerId/'+id);
  }

  public registrar(estado: Estado){
    return this.http.post<void>(this.path+'/Guardar',estado);
  }

  public actualizar(estado: Estado){
    return this.http.put<void>(this.path+'/Modificar/'+ estado.id,estado);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
