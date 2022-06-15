import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class SitioVentaService {

  private path = this.sharedService.APIUrlSiga+'/SitioVenta';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<SitioVenta[]>(this.path+'/Obtener');
  }
}
