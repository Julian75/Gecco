import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Novedad } from '../modelos/novedad';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  private path = this.sharedService.APIUrl+'/Novedad';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Novedad[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Novedad>(this.path+'/ObtenerId/'+id);
  }

  public registrar(novedad: Novedad){
    return this.http.post<void>(this.path+'/Guardar',novedad);
  }

  public actualizar(novedad: Novedad){
    return this.http.put<void>(this.path+'/Modificar/'+ novedad.id, novedad);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
