import { AuditoriaActivo } from './../modelos/auditoriaActivo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaActivoService {

  private path = this.sharedService.APIUrl+'/AuditoriaActivo';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AuditoriaActivo[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AuditoriaActivo>(this.path+'/ObtenerId/'+id);
  }

  public registrar(auditoriaActivo: AuditoriaActivo){
    return this.http.post<void>(this.path+'/Guardar',auditoriaActivo);
  }

  public actualizar(auditoriaActivo: AuditoriaActivo){
    return this.http.put<void>(this.path+'/Modificar/'+ auditoriaActivo.id,auditoriaActivo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
