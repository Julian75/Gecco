import { UsuariosAdministracion } from '../modelos/usuariosAdministracion';
import { SharedService } from './../shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdministracionService {

  private path = this.sharedService.APIUrl+'/UsuariosAdministracion';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<UsuariosAdministracion[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<UsuariosAdministracion>(this.path+'/ObtenerId/'+id);
  }

  public registrar(usuario: UsuariosAdministracion){
    return this.http.post<void>(this.path+'/Guardar',usuario);
  }

  public actualizar(usuario: UsuariosAdministracion){
    return this.http.put<void>(this.path+'/Modificar/'+ usuario.id, usuario);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
