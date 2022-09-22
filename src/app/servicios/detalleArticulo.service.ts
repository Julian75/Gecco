import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleArticulo } from '../modelos/detalleArticulo';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleArticuloService {

  private path = this.sharedService.APIUrl+'/DetalleArticulo';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<DetalleArticulo[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<DetalleArticulo>(this.path+'/ObtenerId/'+id);
  }

  public registrar(detalleArticulo: DetalleArticulo){
    return this.http.post<void>(this.path+'/Guardar',detalleArticulo);
  }

  public actualizar(detalleArticulo: DetalleArticulo){
    return this.http.put<void>(this.path+'/Modificar/'+ detalleArticulo.id,detalleArticulo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

