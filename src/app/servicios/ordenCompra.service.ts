import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdenCompra } from '../modelos/ordenCompra';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  private path = this.sharedService.APIUrl+'/OrdenCompra';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<OrdenCompra[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<OrdenCompra>(this.path+'/ObtenerId/'+id);
  }

  public registrar(ordenCompra: OrdenCompra){
    return this.http.post<void>(this.path+'/Guardar',ordenCompra);
  }

  public actualizar(ordenCompra: OrdenCompra){
    return this.http.put<void>(this.path+'/Modificar/'+ ordenCompra.id,ordenCompra);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
