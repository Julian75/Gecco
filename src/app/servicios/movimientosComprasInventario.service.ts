import { SharedService } from './../shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovimientoComprasInventario } from '../modelos/movimientoComprasInventario';

@Injectable({
  providedIn: 'root'
})
export class MovimientosComprasInventarioService {

  private path = this.sharedService.APIUrl+'/MovimientoComprasInventario';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MovimientoComprasInventario[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MovimientoComprasInventario>(this.path+'/ObtenerId/'+id);
  }

  public registrar(movimientoComprasInventario: MovimientoComprasInventario){
    return this.http.post<void>(this.path+'/Guardar',movimientoComprasInventario);
  }

  public actualizar(movimientoComprasInventario: MovimientoComprasInventario){
    return this.http.put<void>(this.path+'/Modificar/'+ movimientoComprasInventario.id,movimientoComprasInventario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
