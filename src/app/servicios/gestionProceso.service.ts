import { GestionProceso } from './../modelos/gestionProceso';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GestionProcesoService {

  private path = this.sharedService.APIUrl+'/GestionProceso';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<GestionProceso[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<GestionProceso>(this.path+'/ObtenerId/'+id);
  }

  public registrar(gestionProceso: GestionProceso){
    return this.http.post<void>(this.path+'/Guardar',gestionProceso);
  }

  public actualizar(gestionProceso: GestionProceso){
    return this.http.put<void>(this.path+'/Modificar/'+ gestionProceso.id,gestionProceso);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
