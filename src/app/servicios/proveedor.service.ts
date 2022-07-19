import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../modelos/proveedor';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private path = this.sharedService.APIUrl+'/Proveedor';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Proveedor[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Proveedor>(this.path+'/ObtenerId/'+id);
  }

  public registrar(proveedor: Proveedor){
    return this.http.post<void>(this.path+'/Guardar',proveedor);
  }

  public actualizar(proveedor: Proveedor){
    return this.http.put<void>(this.path+'/Modificar/'+ proveedor.id,proveedor);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
