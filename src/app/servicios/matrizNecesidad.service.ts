import { MatrizNecesidad } from './../modelos/matrizNecesidad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MatrizNecesidadService {

  private path = this.sharedService.APIUrl+'/MatrizNecesidad';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MatrizNecesidad[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MatrizNecesidad>(this.path+'/ObtenerId/'+id);
  }

  public registrar(matrizNecesidad: MatrizNecesidad){
    return this.http.post<void>(this.path+'/Guardar',matrizNecesidad);
  }

  public actualizar(matrizNecesidad: MatrizNecesidad){
    return this.http.put<void>(this.path+'/Modificar/'+ matrizNecesidad.id, matrizNecesidad);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
