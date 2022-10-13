import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recordatorio } from '../modelos/recordatorio';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  private path = this.sharedService.APIUrl+'/Recordatorio';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Recordatorio[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Recordatorio>(this.path+'/ObtenerId/'+id);
  }

  public registrar(recordatorio: Recordatorio){
    return this.http.post<void>(this.path+'/Guardar',recordatorio);
  }

  public actualizar(recordatorio: Recordatorio){
    return this.http.put<void>(this.path+'/Modificar/'+ recordatorio.id,recordatorio);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
