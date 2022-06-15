import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oficinas } from 'src/app/modelos/modelosSiga/oficinas';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  private path = this.sharedService.APIUrlSiga+'/Oficinas';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Oficinas[]>(this.path+'/Obtener');
  }
}
