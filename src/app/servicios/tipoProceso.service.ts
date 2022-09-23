import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProceso } from '../modelos/tipoProceso';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoProcesoService {

  private path = this.sharedService.APIUrl+'/TiposProcesos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoProceso[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoProceso>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoProceso: TipoProceso){
    return this.http.post<void>(this.path+'/Guardar',tipoProceso);
  }

  public actualizar(tipoProceso: TipoProceso){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoProceso.id,tipoProceso);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

