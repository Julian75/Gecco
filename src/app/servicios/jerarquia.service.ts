import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jerarquia } from '../modelos/jerarquia';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class JerarquiaService {

  private path = this.sharedService.APIUrl+'/Jerarquia';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Jerarquia[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Jerarquia>(this.path+'/ObtenerId/'+id);
  }

  public registrar(jerarquia: Jerarquia){
    return this.http.post<void>(this.path+'/Guardar',jerarquia);
  }

  public actualizar(jerarquia: Jerarquia){
    return this.http.put<void>(this.path+'/Modificar/'+ jerarquia.id, jerarquia);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
