import { Proceso } from './../modelos/proceso';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private path = this.sharedService.APIUrl+'/Proceso';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Proceso[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Proceso>(this.path+'/ObtenerId/'+id);
  }

  public registrar(proceso: Proceso){
    return this.http.post<void>(this.path+'/Guardar',proceso);
  }

  public actualizar(proceso: Proceso){
    return this.http.put<void>(this.path+'/Modificar/'+ proceso.id,proceso);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
