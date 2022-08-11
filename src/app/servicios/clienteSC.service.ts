import { ClienteSC } from './../modelos/clienteSC';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteSCService {

  private path = this.sharedService.APIUrl+'/ClienteSC';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<ClienteSC[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<ClienteSC>(this.path+'/ObtenerId/'+id);
  }

  public registrar(clienteSC: ClienteSC){
    return this.http.post<void>(this.path+'/Guardar',clienteSC);
  }

  public actualizar(clienteSC: ClienteSC){
    return this.http.put<void>(this.path+'/Modificar/'+ clienteSC.id,clienteSC);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
