import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Correo } from '../modelos/correo';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private path = this.sharedService.APIUrl+'/Correos';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public enviar(correo: Correo){
    return this.http.post<void>(this.path+'/EnviarCorreo',correo);
  }

}
