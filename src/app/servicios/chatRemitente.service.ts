import { ChatRemitente } from './../modelos/chatRemitente';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatRemitenteService {

  private path = this.sharedService.APIUrl+'/ChatRemitente';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<ChatRemitente[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<ChatRemitente>(this.path+'/ObtenerId/'+id);
  }

  public registrar(chatRemitente: ChatRemitente){
    return this.http.post<void>(this.path+'/Guardar',chatRemitente);
  }

  public actualizar(chatRemitente: ChatRemitente){
    return this.http.put<void>(this.path+'/Modificar/'+ chatRemitente.id,chatRemitente);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
