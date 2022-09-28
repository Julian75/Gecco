import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firmas } from '../modelos/firmas';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class FirmasService {

  private path = this.sharedService.APIUrl+'/Firmas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Firmas[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Firmas>(this.path+'/ObtenerId/'+id);
  }

  public registrar(firma: Firmas){
    return this.http.post<void>(this.path+'/Guardar',firma);
  }

  public actualizar(firma: Firmas){
    return this.http.put<void>(this.path+'/Modificar/'+ firma.id,firma);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
