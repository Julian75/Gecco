import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../modelos/turnos';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private path = this.sharedService.APIUrl+'/Turnos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Turnos[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Turnos>(this.path+'/ObtenerId/'+id);
  }

  public registrar(turnos: Turnos){
    return this.http.post<void>(this.path+'/Guardar',turnos);
  }

  public actualizar(turnos: Turnos){
    return this.http.put<void>(this.path+'/Modificar/'+ turnos.id, turnos);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
