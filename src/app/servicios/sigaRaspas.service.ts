import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SigaRaspasService {

  private path = this.sharedService.APIUrl+'/SigaRaspas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public registrar(sigaRaspas: []){
    return this.http.post<void>(this.path+'/Guardar',sigaRaspas);
  }

  public eliminar(){
    return this.http.delete<void>(this.path+'/Eliminar');
  }
}
