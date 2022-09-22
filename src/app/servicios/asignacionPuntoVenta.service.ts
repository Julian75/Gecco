import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionPuntoVenta} from '../modelos/asignacionPuntoVenta';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionArticulosService {

  private path = this.sharedService.APIUrl+'/AsignacionPuntoVenta';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignacionPuntoVenta[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignacionPuntoVenta>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignacionPuntoVenta: AsignacionPuntoVenta){
    return this.http.post<void>(this.path+'/Guardar',asignacionPuntoVenta);
  }

  public actualizar(asignacionPuntoVenta: AsignacionPuntoVenta){
    return this.http.put<void>(this.path+'/Modificar/'+ asignacionPuntoVenta.id,asignacionPuntoVenta);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

