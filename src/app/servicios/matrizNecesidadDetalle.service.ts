import { MatrizNecesidadDetalle } from '../modelos/MatrizNecesidadDetalle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MatrizNecesidadDetalleService {

  private path = this.sharedService.APIUrl+'/MatrizNecesidadDetalle';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MatrizNecesidadDetalle[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MatrizNecesidadDetalle>(this.path+'/ObtenerId/'+id);
  }

  public registrar(matrizNecesidadDetalle: MatrizNecesidadDetalle){
    return this.http.post<void>(this.path+'/Guardar',matrizNecesidadDetalle);
  }

  public actualizar(matrizNecesidadDetalle: MatrizNecesidadDetalle){
    return this.http.put<void>(this.path+'/Modificar/'+ matrizNecesidadDetalle.id, matrizNecesidadDetalle);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
