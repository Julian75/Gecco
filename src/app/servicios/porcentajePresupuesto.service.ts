import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PorcentajePresupuesto } from '../modelos/porcentajePresupuesto';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PorcentajePresupuestoService {

  private path = this.sharedService.APIUrl+'/PorcentajePresupuesto';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<[PorcentajePresupuesto]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<PorcentajePresupuesto>(this.path+'/ObtenerId/'+id);
  }

  public registrar(porcentajePresupuesto: PorcentajePresupuesto){
    return this.http.post<void>(this.path+'/Guardar',porcentajePresupuesto);
  }

  public actualizar(porcentajePresupuesto: PorcentajePresupuesto){
    return this.http.put<void>(this.path+'/Modificar/'+ porcentajePresupuesto.id,porcentajePresupuesto);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
