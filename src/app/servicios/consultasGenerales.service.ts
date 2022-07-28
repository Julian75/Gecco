import { ConsultaRaspa } from './../modelos/consultaRaspa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasGeneralesService {

  private path = this.sharedService.APIUrl+'/ConsultasGenerales';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarRaspaGeco(id: number){
    return this.http.get<ConsultaRaspa[]>(this.path+"/ObtenerRaspa?raspa='"+id+"'");
  }
}
