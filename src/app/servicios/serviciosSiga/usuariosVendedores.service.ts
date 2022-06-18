import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosVendedores } from 'src/app/modelos/modelosSiga/usuariosVendedores';

import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioVendedoresService {

  private path = this.sharedService.APIUrlSiga+'/UsuariosVendedores';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<UsuariosVendedores[]>(this.path+'/Obtener');
  }
  public listarPorId(id: number){
    return this.http.get<UsuariosVendedores[]>(this.path+'/Obtener?id='+id);
  }

}
