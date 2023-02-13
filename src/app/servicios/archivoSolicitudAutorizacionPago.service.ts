import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchivoSolicitudAutorizacionPago } from '../modelos/archivoSolicitudAutorizacionPago';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoSolicitudAutorizacionPagoService {

    private path = this.sharedService.APIUrl+'/ArchivoSolicitudAutorizacionPago';

    constructor(private http:HttpClient,
      private sharedService:SharedService
       )
     { }

    public listarTodos(){
      return this.http.get<ArchivoSolicitudAutorizacionPago[]>(this.path+'/Obtener');
    }

   public listarPorId(id: number){
      return this.http.get<ArchivoSolicitudAutorizacionPago>(this.path+'/ObtenerId/'+id);
    }

    public registrar(archivoSolicitud: ArchivoSolicitudAutorizacionPago){
      return this.http.post<void>(this.path+'/Guardar',archivoSolicitud);
    }

    public actualizar(archivoSolicitud: ArchivoSolicitudAutorizacionPago){
      return this.http.put<void>(this.path+'/Modificar/'+ archivoSolicitud.id,archivoSolicitud);
    }

    public eliminar(id: number){
      return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }

}
