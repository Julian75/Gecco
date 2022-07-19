import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo } from '../modelos/articulo';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private path = this.sharedService.APIUrl+'/Articulos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Articulo[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Articulo>(this.path+'/ObtenerId/'+id);
  }

  public registrar(articulos: Articulo){
    return this.http.post<void>(this.path+'/Guardar',articulos);
  }

  public actualizar(articulos: Articulo){
    return this.http.put<void>(this.path+'/Modificar/'+ articulos.id,articulos);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
