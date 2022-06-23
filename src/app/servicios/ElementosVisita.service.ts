import { ElementosVisita } from './../modelos/elementosVisita';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ElementosVisitaService {

  private path = this.sharedService.APIUrl+'/ElementosVisita';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<ElementosVisita[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<ElementosVisita>(this.path+'/ObtenerId/'+id);
  }

  public registrar(elementosVisita: ElementosVisita){
    return this.http.post<void>(this.path+'/Guardar',elementosVisita);
  }

  public actualizar(elementosVisita: ElementosVisita){
    return this.http.put<void>(this.path+'/Modificar/'+ elementosVisita.id,elementosVisita);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
