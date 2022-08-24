import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../modelos/area';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private path = this.sharedService.APIUrl+'/Area';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Area[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Area>(this.path+'/ObtenerId/'+id);
  }

  public registrar(area: Area){
    return this.http.post<void>(this.path+'/Guardar',area);
  }

  public actualizar(area: Area){
    return this.http.put<void>(this.path+'/Modificar/'+ area.id,area);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
