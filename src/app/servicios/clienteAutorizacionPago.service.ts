import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteAutorizacionPago } from '../modelos/clienteAutorizacionPago';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteAutorizacionPagoService {

  private path = this.sharedService.APIUrl+'/ClienteAutorizacionPago';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<ClienteAutorizacionPago[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<ClienteAutorizacionPago>(this.path+'/ObtenerId/'+id);
  }

  public registrar(clienteAutorizacionPago: ClienteAutorizacionPago){
    return this.http.post<void>(this.path+'/Guardar',clienteAutorizacionPago);
  }

  public actualizar(clienteAutorizacionPago: ClienteAutorizacionPago){
    return this.http.put<void>(this.path+'/Modificar/'+ clienteAutorizacionPago.id, clienteAutorizacionPago);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
