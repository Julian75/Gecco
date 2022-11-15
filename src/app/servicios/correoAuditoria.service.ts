import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorreoAuditoria } from '../modelos/correoAuditoria';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CorreoAuditoriaService {

  private path = this.sharedService.APIUrl+'/CorreoAuditoria';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<CorreoAuditoria[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<CorreoAuditoria>(this.path+'/ObtenerId/'+id);
  }

  public registrar(correoAuditoria: CorreoAuditoria){
    return this.http.post<void>(this.path+'/Guardar',correoAuditoria);
  }

  public actualizar(correoAuditoria: CorreoAuditoria){
    return this.http.put<void>(this.path+'/Modificar/'+ correoAuditoria.id,correoAuditoria);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
