import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignarTurno } from '../modelos/asignarTurno';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignarTurnoService {

  private path = this.sharedService.APIUrl+'/AsignarTurno';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignarTurno[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignarTurno>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignarTurno: AsignarTurno){
    return this.http.post<void>(this.path+'/Guardar',asignarTurno);
  }

  public actualizar(asignarTurno: AsignarTurno){
    return this.http.put<void>(this.path+'/Modificar/'+ asignarTurno.id,asignarTurno);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
