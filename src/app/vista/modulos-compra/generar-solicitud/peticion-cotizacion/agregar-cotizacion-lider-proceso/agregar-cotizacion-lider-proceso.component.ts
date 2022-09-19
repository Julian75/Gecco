import { PeticionCotizacionComponent } from './../peticion-cotizacion.component';
import { CotizacionPdf } from './../../../../../modelos/cotizacionPdf';
import { Cotizacion } from './../../../../../modelos/cotizacion';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { UsuarioService } from './../../../../../servicios/usuario.service';
import { CotizacionService } from './../../../../../servicios/cotizacion.service';
import { SolicitudService } from './../../../../../servicios/solicitud.service';
import { EstadoService } from './../../../../../servicios/estado.service';
import { CotizacionPdfService } from './../../../../../servicios/cotizacionPdf.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';

@Component({
  selector: 'app-agregar-cotizacion-lider-proceso',
  templateUrl: './agregar-cotizacion-lider-proceso.component.html',
  styleUrls: ['./agregar-cotizacion-lider-proceso.component.css']
})
export class AgregarCotizacionLiderProcesoComponent implements OnInit {

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
    private servicioCotizacionPdf: CotizacionPdfService,
    private servicioEstado : EstadoService,
    private fb: FormBuilder,
    private servicioSolicitud : SolicitudService,
    private servicioCotizacion : CotizacionService,
    private servicioConsultasGenerales : ConsultasGeneralesService,
    private servicioUsuario : UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<AgregarCotizacionLiderProcesoComponent>,
    public dialogRef2: MatDialogRef<PeticionCotizacionComponent>,
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
    // http://10.192.110.105:8080/geccoapi-2.7.0/api/Pdf/upload
    // http://localhost:9000/api/Pdf/upload
    this.http.post('http://localhost:9000/api/Pdf/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          // window.location.reload();
        }
    });
  }

  deleteFile(filename: string) {
    this.servicioSubirPdf.eliminarFile(filename).subscribe(res => {
      // this.message = res['message'];
      this.fileInfos = this.servicioSubirPdf.listarTodos();
    });
  }

  existeImport: any = []
  existe:boolean;
  public guardar(){
    this.nombresExistentes = []
    this.listarExiste = []
    this.listarExiste2 = []
    this.existeImport = []
    this.dialogRef.close();
    console.log(this.data)
    document.getElementById('snipper2')?.setAttribute('style', 'display: block;')
    if(this.listaArchivos.length<1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Si desea agregar una cotización debe seleccionar al menos 1!',
        showConfirmButton: false,
        timer: 4000
      })
    }else{
      let cotizacion : Cotizacion = new Cotizacion();
      this.servicioEstado.listarPorId(31).subscribe(resEstado=>{
        console.log("home")
        this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
          console.log("home2")
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
            console.log("home3")
            this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacionPdf=>{
              console.log("home4")
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
                this.existe = this.listarExiste.includes(true)
                this.existeImport.push(this.existe)
              });
              console.log(this.existeImport)
              const existe2 = this.listarExiste.includes( true )
              console.log(existe2)
              if(existe2 == true){
                console.log("home6")
                document.getElementById('snipper2')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Cambiar de nombre los siguientes archivos: <ul>'+this.nombresExistentes+'.</ul><br> Porque estos nombres de archivos ya existen.',
                  showConfirmButton: false,
                  timer: 4000
                })
              }else if(existe2 == false){
                console.log("home7")
                cotizacion.idEstado = resEstado
                cotizacion.idSolicitud = resSolicitud
                cotizacion.idUsuario = resUsuario
                console.log(cotizacion, cotizacion.idSolicitud.id, resSolicitud)
                console.log(resEstado)
                console.log(resUsuario)
                this.registrarCotizacion(cotizacion, cotizacion.idSolicitud.id)
              }
            })
          })
        })
      })
    }
  }

  public registrarCotizacion(cotizacion: Cotizacion, idSolicitud:any){
    console.log(cotizacion)
    this.servicioCotizacion.registrar(cotizacion).subscribe(res=>{
      console.log("home8")
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado la solicitud con cotización!',
        showConfirmButton: false,
        timer: 1500
      })
      if (this.listaArchivos.length == contador) {
        this.uploadFiles(this.w);
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

}
