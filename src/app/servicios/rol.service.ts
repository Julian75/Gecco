import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../modelos/rol';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private path = this.sharedService.APIUrl+'/Rol';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Rol[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Rol>(this.path+'/ObtenerId/'+id);
  }

  public registrar(rol: Rol){
    return this.http.post<void>(this.path+'/Guardar',rol);
  }

  public actualizar(rol: Rol){
    return this.http.put<void>(this.path+'/Modificar/'+ rol.id,rol);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

