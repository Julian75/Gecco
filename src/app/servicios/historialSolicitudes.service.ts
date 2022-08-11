import { HistorialSolicitudes } from './../modelos/historialSolicitudes';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GestionProcesoService {

  private path = this.sharedService.APIUrl+'/HistorialSolicitudes';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<HistorialSolicitudes[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<HistorialSolicitudes>(this.path+'/ObtenerId/'+id);
  }

  public registrar(historialSolicitudes: HistorialSolicitudes){
    return this.http.post<void>(this.path+'/Guardar',historialSolicitudes);
  }

  public actualizar(historialSolicitudes: HistorialSolicitudes){
    return this.http.put<void>(this.path+'/Modificar/'+ historialSolicitudes.id,historialSolicitudes);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
