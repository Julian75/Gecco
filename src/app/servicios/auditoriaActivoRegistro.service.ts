import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuditoriaActivoRegistro } from '../modelos/audioriaActivoRegistro';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaActivoRegistroService {

  private path = this.sharedService.APIUrl+'/AuditoriaActivoRegistro';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AuditoriaActivoRegistro[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AuditoriaActivoRegistro>(this.path+'/ObtenerId/'+id);
  }

  public registrar(auditoriaActivoRegistro: AuditoriaActivoRegistro){
    return this.http.post<void>(this.path+'/Guardar',auditoriaActivoRegistro);
  }

  public actualizar(auditoriaActivoRegistro: AuditoriaActivoRegistro){
    return this.http.put<void>(this.path+'/Modificar/'+ auditoriaActivoRegistro.id,auditoriaActivoRegistro);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }

}
