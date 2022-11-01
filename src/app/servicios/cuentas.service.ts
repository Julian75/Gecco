import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuentas } from '../modelos/cuentas';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private path = this.sharedService.APIUrl+'/Cuenta';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Cuentas[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<Cuentas>(this.path+'/ObtenerId/'+id);
  }

  public registrar(cuentas: Cuentas){
    return this.http.post<void>(this.path+'/Guardar',cuentas);
  }

  public actualizar(cuentas: Cuentas){
    return this.http.put<void>(this.path+'/Modificar/'+ cuentas.id,cuentas);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}

