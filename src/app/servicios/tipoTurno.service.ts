import { TipoTurno } from './../modelos/tipoTurno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTurnoService {

  private path = this.sharedService.APIUrl+'/tipoTurno';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<TipoTurno[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<TipoTurno>(this.path+'/ObtenerId/'+id);
  }

  public registrar(tipoTurno: TipoTurno){
    return this.http.post<void>(this.path+'/Guardar',tipoTurno);
  }

  public actualizar(tipoTurno: TipoTurno){
    return this.http.put<void>(this.path+'/Modificar/'+ tipoTurno.id, tipoTurno);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
