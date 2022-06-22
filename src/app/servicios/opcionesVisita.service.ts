import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { opcionesVisita } from '../modelos/opcionesVisita';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionesVisitaService {

  private path = this.sharedService.APIUrl+'/OpcionesVisita';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<opcionesVisita[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<opcionesVisita>(this.path+'/ObtenerId/'+id);
  }

  public registrar(OpcionesVisita: opcionesVisita){
    return this.http.post<void>(this.path+'/Guardar',OpcionesVisita);
  }

  public actualizar(OpcionesVisita: opcionesVisita){
    return this.http.put<void>(this.path+'/Modificar/'+ OpcionesVisita.id, OpcionesVisita);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
