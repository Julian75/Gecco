import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionesActivosPendiente } from '../modelos/asignacionesActivosPendiente';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesActivosPendienteService {

  private path = this.sharedService.APIUrl+'/AsignacionesActivosPendiente';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignacionesActivosPendiente[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignacionesActivosPendiente>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignacionesActivosPendiente: AsignacionesActivosPendiente){
    return this.http.post<void>(this.path+'/Guardar',asignacionesActivosPendiente);
  }

  public actualizar(asignacionesActivosPendiente: AsignacionesActivosPendiente){
    return this.http.put<void>(this.path+'/Modificar/'+ asignacionesActivosPendiente.id,asignacionesActivosPendiente);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

