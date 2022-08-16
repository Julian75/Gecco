import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionUsuariosPqrs } from '../modelos/asignacionUsuariosPqrs';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignarUsuariosPqrService {

  private path = this.sharedService.APIUrl+'/AsignacionUsuariosPqrs';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignacionUsuariosPqrs[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignacionUsuariosPqrs>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignarUsuariosPqrs: AsignacionUsuariosPqrs){
    return this.http.post<void>(this.path+'/Guardar',asignarUsuariosPqrs);
  }

  public actualizar(asignarUsuariosPqrs: AsignacionUsuariosPqrs){
    return this.http.put<void>(this.path+'/Modificar/'+ asignarUsuariosPqrs.id,asignarUsuariosPqrs);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
