import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodoEjecucion } from '../modelos/periodoEjecucion';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoEjecucionService {

  private path = this.sharedService.APIUrl+'/PeriodoEjecucion';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<[PeriodoEjecucion]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<PeriodoEjecucion>(this.path+'/ObtenerId/'+id);
  }

  public registrar(periodoEjecucion: PeriodoEjecucion){
    return this.http.post<void>(this.path+'/Guardar',periodoEjecucion);
  }

  public actualizar(periodoEjecucion: PeriodoEjecucion){
    return this.http.put<void>(this.path+'/Modificar/'+ periodoEjecucion.id,periodoEjecucion);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
