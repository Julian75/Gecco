import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sedes } from '../modelos/sedes';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private path = this.sharedService.APIUrl+'/Sedes';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Sedes[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Sedes>(this.path+'/ObtenerId/'+id);
  }

  public registrar(sedes: Sedes){
    return this.http.post<void>(this.path+'/Guardar',sedes);
  }

  public actualizar(sedes: Sedes){
    return this.http.put<void>(this.path+'/Modificar/'+ sedes.id,sedes);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

