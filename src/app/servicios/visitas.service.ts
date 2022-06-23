import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visitas } from '../modelos/visitas';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private path = this.sharedService.APIUrl+'/Visitas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Visitas[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Visitas>(this.path+'/ObtenerId/'+id);
  }

  public registrar(visitas: Visitas){
    return this.http.post<void>(this.path+'/Guardar',visitas);
  }

  public actualizar(visitas: Visitas){
    return this.http.put<void>(this.path+'/Modificar/'+ visitas.id, visitas);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
