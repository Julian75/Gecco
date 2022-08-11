import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudSC } from '../modelos/solicitudSC';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudSCService {

  private path = this.sharedService.APIUrl+'/SolicitudSC';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<SolicitudSC[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<SolicitudSC>(this.path+'/ObtenerId/'+id);
  }

  public registrar(solicitudSC: SolicitudSC){
    return this.http.post<void>(this.path+'/Guardar',solicitudSC);
  }

  public actualizar(solicitudSC: SolicitudSC){
    return this.http.put<void>(this.path+'/Modificar/'+ solicitudSC.id,solicitudSC);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
