import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { LibroMayor } from '../modelos/libroMayor';

@Injectable({
  providedIn: 'root'
})
export class LibroMayorService {

  private path = this.sharedService.APIUrl+'/LibroMayor';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<LibroMayor[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<LibroMayor>(this.path+'/ObtenerId/'+id);
  }

  public registrar(libroMayor: LibroMayor){
    return this.http.post<void>(this.path+'/Guardar',libroMayor);
  }

  public actualizar(libroMayor: LibroMayor){
    return this.http.put<void>(this.path+'/Modificar/'+ libroMayor.id, libroMayor);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
