import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compras } from '../modelos/compras';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private path = this.sharedService.APIUrl+'/Compra';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Compras[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Compras>(this.path+'/ObtenerId/'+id);
  }

  public registrar(compra: Compras){
    return this.http.post<void>(this.path+'/Guardar',compra);
  }

  public actualizar(compra: Compras){
    return this.http.put<void>(this.path+'/Modificar/'+ compra.id,compra);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }

}
