import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoporteSC } from '../modelos/soporteSC';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SoporteSCService {

  private path = this.sharedService.APIUrl+'/SoporteSC';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<SoporteSC[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<SoporteSC>(this.path+'/ObtenerId/'+id);
  }

  public registrar(soporteSC: SoporteSC){
    return this.http.post<void>(this.path+'/Guardar',soporteSC);
  }

  public actualizar(soporteSC: SoporteSC){
    return this.http.put<void>(this.path+'/Modificar/'+ soporteSC.id,soporteSC);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
