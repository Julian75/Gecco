import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionArticulos} from '../modelos/asignacionArticulos';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionArticulosService {

  private path = this.sharedService.APIUrl+'/AsignacionesArticulos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignacionArticulos[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignacionArticulos>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignacionArticulos: AsignacionArticulos){
    return this.http.post<void>(this.path+'/Guardar',asignacionArticulos);
  }

  public actualizar(asignacionArticulos: AsignacionArticulos){
    return this.http.put<void>(this.path+'/Modificar/'+ asignacionArticulos.id,asignacionArticulos);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

