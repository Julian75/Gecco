import { EliminacionTurnoVendedor2 } from './../modelos/eliminacionTurnoVendedor2';
import { AsignarTurnoVendedor2 } from './../modelos/asignarTurnoVendedor2';
import { Usuario2 } from './../modelos/usuario2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarService {

  private path = this.sharedService.APIUrl+'/Modificar';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public actualizarAsignarTurnoVendedor(asignarTurnoVendedor: AsignarTurnoVendedor2){
    return this.http.put<void>(this.path+'/AsignarTurnoVendedor/'+ asignarTurnoVendedor.id, asignarTurnoVendedor);
  }

  public actualizarEliminacion(eliminacion: EliminacionTurnoVendedor2){
    return this.http.put<void>(this.path+'/Eliminacion/'+ eliminacion.id, eliminacion);
  }

  public actualizarUsuario(usuario: Usuario2){
    return this.http.put<void>(this.path+'/Usuario/'+ usuario.id, usuario);
  }
}
