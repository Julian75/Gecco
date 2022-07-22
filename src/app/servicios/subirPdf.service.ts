import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SubirPdfService {

  private path = this.sharedService.APIUrl+'/Pdf';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get(`${this.path}/files`);
  }

  public subirArchivo(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const  req = new HttpRequest('POST', `${this.path}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public eliminarFile(filename: string){
    return this.http.get(`${this.path}/delete/${filename}`);
  }
}
