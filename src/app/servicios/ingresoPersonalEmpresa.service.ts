import { IngresoPersonalEmpresa } from './../modelos/ingresoPersonalEmpresa';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IngresoPersonalEmpresaService {

  private path = this.sharedService.APIUrl+'/IngresoPersonalEmpresa';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<IngresoPersonalEmpresa[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<IngresoPersonalEmpresa>(this.path+'/ObtenerId/'+id);
  }

  public registrar(ingresoPersonalEmpresa: IngresoPersonalEmpresa){
    return this.http.post<void>(this.path+'/Guardar',ingresoPersonalEmpresa);
  }

  public actualizar(ingresoPersonalEmpresa: IngresoPersonalEmpresa){
    return this.http.put<void>(this.path+'/Modificar/'+ ingresoPersonalEmpresa.id,ingresoPersonalEmpresa);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
