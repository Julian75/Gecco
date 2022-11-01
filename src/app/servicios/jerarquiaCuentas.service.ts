import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { JerarquiaCuentas } from '../modelos/jerarquiaCuentas';

@Injectable({
  providedIn: 'root'
})
export class JerarquiaCuentasService {

  private path = this.sharedService.APIUrl+'/JerarquiaCuentas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<JerarquiaCuentas[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<JerarquiaCuentas>(this.path+'/ObtenerId/'+id);
  }

  public registrar(jerarquiaCuentas: JerarquiaCuentas){
    return this.http.post<void>(this.path+'/Guardar',jerarquiaCuentas);
  }

  public actualizar(jerarquiaCuentas: JerarquiaCuentas){
    return this.http.put<void>(this.path+'/Modificar/'+ jerarquiaCuentas.id, jerarquiaCuentas);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
