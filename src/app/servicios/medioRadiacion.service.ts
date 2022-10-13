import { MediosRadiacion } from '../modelos/medioRadiacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MediosRadiacionService {

  private path = this.sharedService.APIUrl+'/MediosRadiacion';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MediosRadiacion[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MediosRadiacion>(this.path+'/ObtenerId/'+id);
  }

  public registrar(mediosRadiacion: MediosRadiacion){
    return this.http.post<void>(this.path+'/Guardar',mediosRadiacion);
  }

  public actualizar(mediosRadiacion: MediosRadiacion){
    return this.http.put<void>(this.path+'/Modificar/'+ mediosRadiacion.id, mediosRadiacion);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
