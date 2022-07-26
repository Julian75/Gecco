import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Raspas } from '../modelos/raspas';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RaspasService {

  private path = this.sharedService.APIUrl+'/Raspas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Raspas[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Raspas>(this.path+'/ObtenerId/'+id);
  }

  public registrar(raspas: Raspas){
    return this.http.post<void>(this.path+'/Guardar',raspas);
  }

  public actualizar(raspas: Raspas){
    return this.http.put<void>(this.path+'/Modificar/'+ raspas.id,raspas);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
