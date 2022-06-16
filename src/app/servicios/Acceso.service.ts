import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accesos } from '../modelos/accesos';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private path = this.sharedService.APIUrl+'/Acceso';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Accesos[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Accesos>(this.path+'/ObtenerId/'+id);
  }

  public registrar(acceso: Accesos){
    return this.http.post<void>(this.path+'/Guardar',acceso);
  }

  public actualizar(acceso: Accesos){
    return this.http.put<void>(this.path+'/Modificar/'+ acceso.id,acceso);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
