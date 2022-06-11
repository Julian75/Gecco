import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private path = this.sharedService.APIUrl+'/Usuario';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Usuario[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Usuario>(this.path+'/ObtenerId/'+id);
  }

  public registrar(usuario: Usuario){
    return this.http.post<void>(this.path+'/Guardar',usuario);
  }

  public actualizar(usuario: Usuario){
    return this.http.put<void>(this.path+'/Modificar/'+ usuario.id, usuario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
