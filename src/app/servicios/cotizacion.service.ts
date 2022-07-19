import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cotizacion } from '../modelos/cotizacion';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private path = this.sharedService.APIUrl+'/Cotizacion';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Cotizacion[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Cotizacion>(this.path+'/ObtenerId/'+id);
  }

  public registrar(cotizacion: Cotizacion){
    return this.http.post<void>(this.path+'/Guardar',cotizacion);
  }

  public actualizar(cotizacion: Cotizacion){
    return this.http.put<void>(this.path+'/Modificar/'+ cotizacion.id,cotizacion);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
