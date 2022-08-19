import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroCorreo } from '../modelos/registroCorreo';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroCorreoService {

  private path = this.sharedService.APIUrl+'/RegistroCorreo';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<RegistroCorreo[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<RegistroCorreo>(this.path+'/ObtenerId/'+id);
  }

  public registrar(registroCorreo: RegistroCorreo){
    return this.http.post<void>(this.path+'/Guardar',registroCorreo);
  }

  public actualizar(registroCorreo: RegistroCorreo){
    return this.http.put<void>(this.path+'/Modificar/'+ registroCorreo.id,registroCorreo);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
