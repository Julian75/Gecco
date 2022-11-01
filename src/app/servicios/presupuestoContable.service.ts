import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresupuestoContable } from '../modelos/presupuestoContable';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoContableService {

  private path = this.sharedService.APIUrl+'/PresupuestoContable';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<[PresupuestoContable]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<PresupuestoContable>(this.path+'/ObtenerId/'+id);
  }

  public registrar(presupuestoContable: PresupuestoContable){
    return this.http.post<void>(this.path+'/Guardar',presupuestoContable);
  }

  public actualizar(presupuestoContable: PresupuestoContable){
    return this.http.put<void>(this.path+'/Modificar/'+ presupuestoContable.id,presupuestoContable);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
