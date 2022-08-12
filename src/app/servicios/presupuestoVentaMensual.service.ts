import { PresupuestoVentaMensual } from './../modelos/presupuestoVentaMensual';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoVentaMensualService {

  private path = this.sharedService.APIUrl+'/PresupuestoVentaMensual';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
  { }

  public listarTodos(){
    return this.http.get<PresupuestoVentaMensual[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<PresupuestoVentaMensual>(this.path+'/ObtenerId/'+id);
  }

  public registrar(presupuestoVentaMensual: PresupuestoVentaMensual){
    return this.http.post<void>(this.path+'/Guardar',presupuestoVentaMensual);
  }

  public actualizar(presupuestoVentaMensual: PresupuestoVentaMensual){
    return this.http.put<void>(this.path+'/Modificar/'+ presupuestoVentaMensual.id,presupuestoVentaMensual);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
