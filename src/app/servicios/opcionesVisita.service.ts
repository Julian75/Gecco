import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpcionesVisita } from '../modelos/opcionesVisita';
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
    return this.http.get<OpcionesVisita[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<OpcionesVisita>(this.path+'/ObtenerId/'+id);
  }

  public registrar(opcionesVisita: OpcionesVisita){
    return this.http.post<void>(this.path+'/Guardar',opcionesVisita);
  }

  public actualizar(opcionesVisita: OpcionesVisita){
    return this.http.put<void>(this.path+'/Modificar/'+ opcionesVisita.id, opcionesVisita);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
