import { PeticionCotizacionComponent } from './../peticion-cotizacion.component';
import { CotizacionPdf } from './../../../../../modelos/cotizacionPdf';
import { Cotizacion } from './../../../../../modelos/cotizacion';
import { HttpResponse, HttpEventType } from '@angular/common/http';
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
    for (let i = 0; i < this.listaArchivos2.length; i++) {
      this.upload(i, this.listaArchivos[i]);
    }
  }

  upload(index:any, file: any) {
    this.progressInfo[index] = { value: 0, fileName: file };
    this.servicioSubirPdf.subirArchivo(file).subscribe((event:any) => {
      console.log(event.type, event, index, file)
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileInfos = this.servicioSubirPdf.listarTodos();
      }
      document.getElementById('snipper2')?.setAttribute('style', 'display: none;')
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
    this.dialogRef.close();
    document.getElementById('snipper2')?.setAttribute('style', 'display: block;')
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
              document.getElementById('snipper2')?.setAttribute('style', 'display: none;')
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
    this.servicioConsultasGenerales.listarCotizacion(idSolicitud).subscribe(resCotizacion=>{
      resCotizacion.forEach(element => {
        this.servicioCotizacion.listarPorId(element.id).subscribe(resCotizacion=>{
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
      });
    })
  }

  public registrarCotizacionPdf(cotizacionPdf: CotizacionPdf, idSolicitud: number){
    this.servicioCotizacionPdf.registrar(cotizacionPdf).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado la solicitud con cotización!',
        showConfirmButton: false,
        timer: 1500
      })
      this.uploadFiles()
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
