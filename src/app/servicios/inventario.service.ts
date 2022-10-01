import { Inventario } from './../modelos/inventario';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private path = this.sharedService.APIUrl+'/Inventario';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Inventario[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Inventario>(this.path+'/ObtenerId/'+id);
  }

  public registrar(inventario: Inventario){
    return this.http.post<void>(this.path+'/Guardar',inventario);
  }

  public actualizar(inventario: Inventario){
    return this.http.put<void>(this.path+'/Modificar/'+ inventario.id,inventario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
