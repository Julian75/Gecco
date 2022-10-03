import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpcionArticuloBaja } from '../modelos/opcionArticuloBaja';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionArticuloBajaService {

  private path = this.sharedService.APIUrl+'/OpcionArticuloBaja';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<OpcionArticuloBaja[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<OpcionArticuloBaja>(this.path+'/ObtenerId/'+id);
  }

  public registrar(opcionArticuloBaja: OpcionArticuloBaja){
    return this.http.post<void>(this.path+'/Guardar',opcionArticuloBaja);
  }

  public actualizar(opcionArticuloBaja: OpcionArticuloBaja){
    return this.http.put<void>(this.path+'/Modificar/'+ opcionArticuloBaja.id, opcionArticuloBaja);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
