import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActasBaja } from '../modelos/actasBaja';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ActasBajaService {

    private path = this.sharedService.APIUrl+'/ActasBaja';

    constructor(private http:HttpClient,
      private sharedService:SharedService
       )
     { }

    public listarTodos(){
      return this.http.get<ActasBaja[]>(this.path+'/Obtener');
    }

   public listarPorId(id: number){
      return this.http.get<ActasBaja>(this.path+'/ObtenerId/'+id);
    }

    public registrar(actasBaja: ActasBaja){
      return this.http.post<void>(this.path+'/Guardar',actasBaja);
    }

    public actualizar(actasBaja: ActasBaja){
      return this.http.put<void>(this.path+'/Modificar/'+ actasBaja.id, actasBaja);
    }

    public eliminar(id: number){
      return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }

}
