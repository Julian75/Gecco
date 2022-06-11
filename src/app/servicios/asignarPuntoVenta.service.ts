import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignarPuntoVenta } from '../modelos/asignarPuntoVenta';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignarPuntoVentaService {

  private path = this.sharedService.APIUrl+'/AsignarPuntoVenta';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignarPuntoVenta[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignarPuntoVenta>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignarPuntoVenta: AsignarPuntoVenta){
    return this.http.post<void>(this.path+'/Guardar',asignarPuntoVenta);
  }

  public actualizar(asignarPuntoVenta: AsignarPuntoVenta){
    return this.http.put<void>(this.path+'/Modificar/'+ asignarPuntoVenta.id,asignarPuntoVenta);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
