import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchivoSolicitud } from '../modelos/archivoSolicitud';

import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoSolicitudService {

    private path = this.sharedService.APIUrl+'/ArchivoSolicitud';

    constructor(private http:HttpClient,
      private sharedService:SharedService
       )
     { }

    public listarTodos(){
      return this.http.get<ArchivoSolicitud[]>(this.path+'/Obtener');
    }

   public listarPorId(id: number){
      return this.http.get<ArchivoSolicitud>(this.path+'/ObtenerId/'+id);
    }

    public registrar(archivoSolicitud: ArchivoSolicitud){
      return this.http.post<void>(this.path+'/Guardar',archivoSolicitud);
    }

    public actualizar(archivoSolicitud: ArchivoSolicitud){
      return this.http.put<void>(this.path+'/Modificar/'+ archivoSolicitud.id,archivoSolicitud);
    }

    public eliminar(id: number){
      return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }

}
