import { SolicitudBajasArticulos } from './../modelos/solicitudBajasArticulos';
import { SharedService } from './../shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudBajasArticulosService {

  private path = this.sharedService.APIUrl+'/SolicitudBajasArticulos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<SolicitudBajasArticulos[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<SolicitudBajasArticulos>(this.path+'/ObtenerId/'+id);
  }

  public registrar(solicitudBajasArticulos: SolicitudBajasArticulos){
    return this.http.post<void>(this.path+'/Guardar',solicitudBajasArticulos);
  }

  public actualizar(solicitudBajasArticulos: SolicitudBajasArticulos){
    return this.http.put<void>(this.path+'/Modificar/'+ solicitudBajasArticulos.id,solicitudBajasArticulos);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
