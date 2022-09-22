import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionProceso} from '../modelos/asignacionProceso';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionProcesoService {

  private path = this.sharedService.APIUrl+'/AsignacionProceso';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignacionProceso[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignacionProceso>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignacionProceso: AsignacionProceso){
    return this.http.post<void>(this.path+'/Guardar',asignacionProceso);
  }

  public actualizar(asignacionProceso: AsignacionProceso){
    return this.http.put<void>(this.path+'/Modificar/'+ asignacionProceso.id,asignacionProceso);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

