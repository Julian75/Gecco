import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialArticulos } from '../modelos/historialArticulos';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialArticuloService {

  private path = this.sharedService.APIUrl+'/HistorialArticulo';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<HistorialArticulos[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<HistorialArticulos>(this.path+'/ObtenerId/'+id);
  }

  public registrar(historialArticulo: HistorialArticulos){
    return this.http.post<void>(this.path+'/Guardar',historialArticulo);
  }

  public actualizar(historialArticulo: HistorialArticulos){
    return this.http.put<void>(this.path+'/Modificar/'+ historialArticulo.id,historialArticulo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

