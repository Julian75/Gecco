import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ColillaTercero} from 'src/app/modelos/modelosSiga/colillaTercero';
import { SharedService } from 'src/app/shared.service';

@Injectable({
    providedIn: 'root'
  })

export class ColillaTerceroLoteriaService{
    private path = this.sharedService.APIUrlSiga+'/ColillaTercero';

    constructor(private http:HttpClient,
        private sharedService:SharedService
         )
       { }

    public listarPorId(serie: string, colilla: number){
    return this.http.get<ColillaTercero[]>(this.path+"/Obtener?serie="+serie+"&colilla="+colilla);
    }
}
