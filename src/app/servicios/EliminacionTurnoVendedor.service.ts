import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EliminacionTurnoVendedor } from '../modelos/eliminacionTurnoVendedor';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class EliminacionTurnoVendedorService {

  private path = this.sharedService.APIUrl+'/AprobacionEliminacionTurnoVendedor';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<EliminacionTurnoVendedor[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<EliminacionTurnoVendedor>(this.path+'/ObtenerId/'+id);
  }

  public registrar(eliminacionTurnoVendedor: EliminacionTurnoVendedor){
    return this.http.post<void>(this.path+'/Guardar',eliminacionTurnoVendedor);
  }

  public actualizar(eliminacionTurnoVendedor: EliminacionTurnoVendedor){
    return this.http.put<void>(this.path+'/Modificar/'+ eliminacionTurnoVendedor.id,eliminacionTurnoVendedor);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
