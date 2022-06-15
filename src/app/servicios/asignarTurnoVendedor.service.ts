import { AsignarTurnoVendedor } from './../modelos/asignarTurnoVendedor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AsignarTurnoVendedorService {

  private path = this.sharedService.APIUrl+'/AsignarTurnoVendedor';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<AsignarTurnoVendedor[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<AsignarTurnoVendedor>(this.path+'/ObtenerId/'+id);
  }

  public registrar(asignarTurnoVendedor: AsignarTurnoVendedor){
    return this.http.post<void>(this.path+'/Guardar',asignarTurnoVendedor);
  }

  public actualizar(asignarTurnoVendedor: AsignarTurnoVendedor){
    return this.http.put<void>(this.path+'/Modificar/'+ asignarTurnoVendedor.id,asignarTurnoVendedor);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
