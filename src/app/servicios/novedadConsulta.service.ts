import { NovedadConsulta } from './../modelos/novedadConsulta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class NovedadConsultaSevice {

  private path = this.sharedService.APIUrl+'/NovedadesConsulta';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

   public listarPorId(id: string){
    return this.http.get<NovedadConsulta[]>(this.path+"/Obtener?fecha='"+id+"'");
  }
}
