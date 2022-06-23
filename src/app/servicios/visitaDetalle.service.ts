import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisitaDetalle } from '../modelos/visitaDetalle';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaDetalleService {

  private path = this.sharedService.APIUrl+'/VisitaDetalle';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<VisitaDetalle[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<VisitaDetalle>(this.path+'/ObtenerId/'+id);
  }

  public registrar(visitaDetalle: VisitaDetalle){
    return this.http.post<void>(this.path+'/Guardar',visitaDetalle);
  }

  public actualizar(visitaDetalle: VisitaDetalle){
    return this.http.put<void>(this.path+'/Modificar/'+ visitaDetalle.id, visitaDetalle);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
