import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EscalaSolicitudes } from '../modelos/escalaSolicitudes';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class EscalaSolicitudesService {

  private path = this.sharedService.APIUrl+'/EscalaSolicitudes';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<EscalaSolicitudes[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<EscalaSolicitudes>(this.path+'/ObtenerId/'+id);
  }

  public registrar(escalaSolicitudes: EscalaSolicitudes){
    return this.http.post<void>(this.path+'/Guardar',escalaSolicitudes);
  }

  public actualizar(escalaSolicitudes: EscalaSolicitudes){
    return this.http.put<void>(this.path+'/Modificar/'+ escalaSolicitudes.id,escalaSolicitudes);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

