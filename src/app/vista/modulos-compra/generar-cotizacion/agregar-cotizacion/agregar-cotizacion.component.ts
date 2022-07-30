import { CotizacionPdfService } from './../../../../servicios/cotizacionPdf.service';
import { CotizacionPdf } from './../../../../modelos/cotizacionPdf';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { Solicitud } from './../../../../modelos/solicitud';
import { CotizacionService } from './../../../../servicios/cotizacion.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from './../../../../servicios/estado.service';
import { Cotizacion } from './../../../../modelos/cotizacion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';

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

  constructor(
    private servicioSubirPdf : SubirPdfService,
    private servicioCotizacionPdf : CotizacionPdfService,
    private servicioEstado : EstadoService,
    private fb: FormBuilder,
    private servicioSolicitud : SolicitudService,
    private servicioCotizacion : CotizacionService,
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

  selectFiles(event: any) {
    this.listaArchivos2 = []
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
    this.listaArchivos = event.target.files
    for (let index = 0; index < this.listaArchivos.length; index++) {
      const element = this.listaArchivos[index];
      this.listaArchivos2.push(element.name)
    }
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(index:any, file: any) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.servicioSubirPdf.subirArchivo(file).subscribe((event:any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileInfos = this.servicioSubirPdf.listarTodos();
      }
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      this.dialogRef.close();
      window.location.reload();
    },
    err => {
      this.progressInfo[index].value = 0;
      this.message = 'No se puede subir el archivo ' + file.name;
    });
  }

  deleteFile(filename: string) {
    this.servicioSubirPdf.eliminarFile(filename).subscribe(res => {
      // this.message = res['message'];
      this.fileInfos = this.servicioSubirPdf.listarTodos();
    });
  }

  public guardar(){
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
    console.log(idSolicitud)
    this.servicioCotizacion.listarTodos().subscribe(resCotizaciones=>{
      resCotizaciones.forEach(element => {
        if(idSolicitud == element.idSolicitud.id){
          this.idCotizacion= element.id
        }
      });
      this.servicioCotizacion.listarPorId(Number(this.idCotizacion)).subscribe(resCotizacion=>{
        this.listaArchivos2.forEach((element:any) => {
          this.servicioEstado.listarPorId(38).subscribe(resEstado=>{
            let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
            cotizacionPdf.idCotizacion = resCotizacion
            cotizacionPdf.idEstado = resEstado
            cotizacionPdf.nombrePdf = element
            this.registrarCotizacionPdf(cotizacionPdf, idSolicitud)
          })
        })
      });
    })
  }

  public registrarCotizacionPdf(cotizacionPdf: CotizacionPdf, idSolicitud: number){
    this.servicioCotizacionPdf.registrar(cotizacionPdf).subscribe(res=>{
      this.actualizarSolicitud(idSolicitud)
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
    let solicitud : Solicitud = new Solicitud();
    solicitud.id=Number(idSolicitud);
    this.servicioSolicitud.listarPorId(solicitud.id).subscribe(resSolicitud=>{
      solicitud.fecha = resSolicitud.fecha
      solicitud.idUsuario = resSolicitud.idUsuario
      this.servicioEstado.listarPorId(36).subscribe(resEstado=>{
        solicitud.idEstado = resEstado
        solicitud.idUsuario = resSolicitud.idUsuario
          this.actualizarSolic(solicitud)
      })
    })
  }

  public actualizarSolic(solicitud: Solicitud){
    this.servicioSolicitud.actualizar(solicitud).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cotización Registrada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.uploadFiles()
    }, error => {
      console.log("No se modifico")
    });
  }

}
