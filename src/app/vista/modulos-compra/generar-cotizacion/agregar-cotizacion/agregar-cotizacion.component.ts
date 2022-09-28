import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { CotizacionPdfService } from './../../../../servicios/cotizacionPdf.service';
import { CotizacionPdf } from './../../../../modelos/cotizacionPdf';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { Solicitud } from './../../../../modelos/solicitud';
import { Solicitud2 } from './../../../../modelos/solicitud2';
import { CotizacionService } from './../../../../servicios/cotizacion.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from './../../../../servicios/estado.service';
import { Cotizacion } from './../../../../modelos/cotizacion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrls: ['./agregar-cotizacion.component.css']
})
export class AgregarCotizacionComponent implements OnInit {

  color = ('primary');
  public formCotizacion!: FormGroup;
  // PDF
  //Lista de archivos seleccionados
  selectedFiles!: FileList;
  public listaArchivos: any = []
  public listaArchivos2: any = []
  public idCotizacion: any = []
  public nombresExistentes: any = []
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo: any = []
  public encontrado: boolean = false
  public listarExiste: any = []
  public listarExiste2: any = []
  public encontrado2: boolean = false
  public encontrado3: boolean = false
  //Mensaje que almacena la respuesta de las Apis
  public message: String = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  public fileName: String = "";
  fileInfos!: Observable<any>;
  public fecha:Date = new Date();

  constructor(
    private http: HttpClient,
    private servicioSubirPdf : SubirPdfService,
    private servicioCotizacionPdf : CotizacionPdfService,
    private servicioEstado : EstadoService,
    private fb: FormBuilder,
    private servicioSolicitud : SolicitudService,
    private servicioCotizacion : CotizacionService,
    private servicioModificar : ModificarService,
    private servicioConsultasGenerales : ConsultasGeneralesService,
    private servicioUsuario : UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<AgregarCotizacionComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.fileInfos = this.servicioSubirPdf.listarTodos();
  }

  private crearFormulario() {
    this.formCotizacion = this.fb.group({
      id: 0,
      estado: [null,Validators.required],
      archivoPDF: [null,Validators.required],
      solicitud: [null,Validators.required],
    });
  }

  public w: any
  selectFiles(event): void {
    var w = event.target.files
    this.w = w
    this.listaArchivos = []
    this.listaArchivos.push(w)
    this.listaArchivos2 = []
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.listaArchivos.forEach(element => {
      for (let index = 0; index < element.length; index++) {
        const element1 = element[index];
        this.listaArchivos2.push(element1.name)
      }
    });
  }

  percentDone: number;
  uploadSuccess: boolean;
  uploadFiles(files: File[]){
    console.log(this.w)
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('files',f))
    // http://localhost:9000/api/Pdf/upload
    // http://10.192.110.105:8080/geccoapi-2.7.0/api/Pdf/upload
    this.http.post('http://localhost:9000/api/Pdf/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          window.location.reload();
        }
    });
  }

  deleteFile(filename: string) {
    this.servicioSubirPdf.eliminarFile(filename).subscribe(res => {
      // this.message = res['message'];
      this.fileInfos = this.servicioSubirPdf.listarTodos();
    });
  }

  public guardar(){
    this.dialogRef.close();
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let cotizacion : Cotizacion = new Cotizacion();
    this.servicioEstado.listarPorId(31).subscribe(resEstado=>{
      cotizacion.idEstado = resEstado
      this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        cotizacion.idSolicitud = resSolicitud
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
          cotizacion.idUsuario = resUsuario
          this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacionPdf=>{
            resCotizacionPdf.forEach(elementCotizacion => {
              this.listaArchivos2.forEach((elementArchivo:any) => {
                if(elementCotizacion.nombrePdf == elementArchivo){
                  this.encontrado = true
                  this.nombresExistentes.push(elementArchivo)
                }else{
                  this.encontrado = false
                }
                this.listarExiste.push(this.encontrado)
              })
              const existe = this.listarExiste.includes( true )
              this.listarExiste2.push(existe)
            });
            const existe2 = this.listarExiste.includes( true )
            if(existe2 == true){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Cambiar de nombre los siguientes archivos: <ul>'+this.nombresExistentes+'.</ul><br> Porque estos nombres de archivos ya existen.',
                showConfirmButton: false,
                timer: 4000
              })
            }else if(existe2 == false){
              this.registrarCotizacion(cotizacion, cotizacion.idSolicitud.id)
            }
          })
        })
      })
    })
  }

  public registrarCotizacion(cotizacion: Cotizacion, idSolicitud:any){
    this.servicioCotizacion.registrar(cotizacion).subscribe(res=>{
      this.registroCotiPdf(idSolicitud)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public registroCotiPdf(idSolicitud:number){
    var contador = 0
    this.servicioConsultasGenerales.listarCotizacion(idSolicitud).subscribe(resCotizacion=>{
      resCotizacion.forEach(element => {
        this.servicioCotizacion.listarPorId(element.id).subscribe(resCotizacion=>{
          this.listaArchivos.forEach(element => {
            for (let index = 0; index < element.length; index++) {
              const element1 = element[index];
              this.servicioEstado.listarPorId(38).subscribe(resEstado=>{
                contador++
                let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
                cotizacionPdf.idCotizacion = resCotizacion
                cotizacionPdf.idEstado = resEstado
                cotizacionPdf.nombrePdf = element1.name
                this.registrarCotizacionPdf(cotizacionPdf, idSolicitud, contador)
              })
            }
          });
        });
      });
    })
  }

  public registrarCotizacionPdf(cotizacionPdf: CotizacionPdf, idSolicitud: number, contador){
    this.servicioCotizacionPdf.registrar(cotizacionPdf).subscribe(res=>{
      if (this.listaArchivos.length == contador) {
        this.actualizarSolicitud(idSolicitud)
      }
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar los pdf!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public actualizarSolicitud(idSolicitud: any){
    let solicitud : Solicitud2 = new Solicitud2();
    solicitud.id=Number(idSolicitud);
    this.servicioSolicitud.listarPorId(solicitud.id).subscribe(resSolicitud=>{
      this.fecha = new Date(resSolicitud.fecha)
      this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
      solicitud.fecha = this.fecha
      solicitud.idUsuario = resSolicitud.idUsuario.id
      this.servicioEstado.listarPorId(36).subscribe(resEstado=>{
        solicitud.idEstado = resEstado.id
        solicitud.idUsuario = resSolicitud.idUsuario.id
          this.actualizarSolic(solicitud)
      })
    })
  }

  public actualizarSolic(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cotización Registrada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.uploadFiles(this.w)
    }, error => {
    });
  }

}
