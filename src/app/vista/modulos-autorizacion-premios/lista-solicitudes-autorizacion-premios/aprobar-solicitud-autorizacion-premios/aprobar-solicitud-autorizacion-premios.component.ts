import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { ArchivoSolicitudAutorizacionPagoService } from 'src/app/servicios/archivoSolicitudAutorizacionPago.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { SolicitudAutorizacionPago2 } from 'src/app/modelos/modelos2/solicitudAutorizacionPago2';
import { MotivoAutorizacionPagoService } from 'src/app/servicios/motivoAutorizacionPago.service';
import { MotivoAutorizacionPago2 } from 'src/app/modelos/modelos2/motivoAutorizacionPago2';


@Component({
  selector: 'app-aprobar-solicitud-autorizacion-premios',
  templateUrl: './aprobar-solicitud-autorizacion-premios.component.html',
  styleUrls: ['./aprobar-solicitud-autorizacion-premios.component.css']
})
export class AprobarSolicitudAutorizacionPremiosComponent implements OnInit {
  color = ('primary');
  public formArchivoSolicitud!: FormGroup;
    //Lista de archivos seleccionados
    selectedFiles!: FileList;
    public listaArchivos: any = []
    public listaArchivos2: any = []
    public fileLenght: String = "";
    public fileName: string[] = [];
    fileInfos!: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private servicioSubirArchivo: SubirPdfService,
    private servicioArchivoSolicitudPago: ArchivoSolicitudAutorizacionPagoService,
    private servicioSolicitudAutorizacionPago: SolicitudAutorizacionPagoService,
    private servicioUsuario: UsuarioService,
    private servicioModificar: ModificarService,
    private servicioMotivoSolicitud: MotivoAutorizacionPagoService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formArchivoSolicitud = this.fb.group({
      id: 0,
      nombreArchivo: [null,Validators.required],
      idSolicitudAutorizacionPago: [null,Validators.required],
      idUsuario: [null,Validators.required],
    });
  }

  selectFiles(event: any){
    this.fileName = [];
    this.selectedFiles = event.target.files;
    this.fileLenght = this.selectedFiles.length + " Archivos seleccionados";
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.fileName.push(this.selectedFiles[i].name);
    }
  }

  subidaExitosa: boolean = false;
  uploadFiles() {
    this.subidaExitosa = false;
    this.listaArchivos = [];
    var formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
    }

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.servicioSubirArchivo.subirArchivosSolicitudAutorizacionPago(this.selectedFiles[i]).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            event = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.subidaExitosa = true;
            this.listaArchivos.push(this.subidaExitosa);
          }
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al subir el archivo!',
          })
        }
      );
    }
    const cantidadArchivos = this.selectedFiles.length;
    const subidaExitosa2 = this.listaArchivos.every((element: any) => element === true);
    if (cantidadArchivos == 1) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se subió el archivo correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    }else{
      if (subidaExitosa2) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se subieron los archivos correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al subir los archivos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

  }

  registrarArchivoSolicitud(){
    this.servicioArchivoSolicitudPago.listarTodos().subscribe( (data: any) => {
      const nombreArchivosaAlmacenados = data.map((element: any) => element.nombreArchivo);
      const nombreArchivosElegidos = this.fileName.map((element: any) => element);
      const archivosRepetidos = nombreArchivosaAlmacenados.filter((element: any) => nombreArchivosElegidos.includes(element));
      const nombreArchivosNoExistentes = nombreArchivosElegidos.filter((element: any) => !nombreArchivosaAlmacenados.includes(element));
      if (nombreArchivosNoExistentes.length > 0) {
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe( (dataUsuario: any) => {
          this.formArchivoSolicitud.value.idUsuario = dataUsuario;
          this.servicioSolicitudAutorizacionPago.listarPorId(Number(this.data)).subscribe( (dataSolicitud: any) => {
            this.formArchivoSolicitud.value.idSolicitudAutorizacionPago = dataSolicitud;
            for (let i = 0; i < nombreArchivosNoExistentes.length; i++) {
              this.formArchivoSolicitud.value.nombreArchivo = nombreArchivosNoExistentes[i];
              console.log(this.formArchivoSolicitud.value);
              this.servicioArchivoSolicitudPago.registrar(this.formArchivoSolicitud.value).subscribe(
                (data: any) => {
                },
                (error: any) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al registrar el nombre del archivo!',
                  })
                }
              );
            }
            this.actualizarSolicitud();
          })
        });
      }else{
        if (archivosRepetidos.length == 1) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El archivo ya existe'+ " " +archivosRepetidos,
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Los archivos ya existen'+ " " +archivosRepetidos,
          })
        }
      }
    })
  }

  actualizarSolicitud(){
    let solicitud = new SolicitudAutorizacionPago2();
    let motivoSolicitud = new MotivoAutorizacionPago2();
    this.servicioSolicitudAutorizacionPago.listarPorId(Number(this.data)).subscribe( (data: any) => {
      const fecha = new Date(data.fecha);
      const fecha2 = new Date(fecha.getTime()).toISOString();
      solicitud.id = data.id;
      solicitud.fecha = fecha2;
      solicitud.idOficina = data.idOficina;
      solicitud.nombreOficiona = data.nombreOficiona;
      solicitud.idUsuario = data.idUsuario.id;
      solicitud.idDatosFormularioPago = data.idDatosFormularioPago.id;
      this.servicioMotivoSolicitud.listarPorId(Number(data.idMotivoAutorizacionPago.id)).subscribe( (dataMotivo: any) => {
        motivoSolicitud.id = dataMotivo.id;
        motivoSolicitud.descripcion = dataMotivo.descripcion;
        motivoSolicitud.idEstado = 97;
        solicitud.idMotivoAutorizacionPago = motivoSolicitud.id;
        console.log(solicitud);
        console.log(motivoSolicitud);
        this.servicioModificar.actualizarMotivoAutorizacionPago(motivoSolicitud).subscribe( (data: any) => {
          this.servicioModificar.actualizarSolicitudAutorizacionPago(solicitud).subscribe( (data: any) => {
            this.uploadFiles();
          })
        })
      });
    });
  }
  guardarArchivoSolicitud(){
    if(this.fileName.length > 0){
      this.registrarArchivoSolicitud();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe elegir al menos un archivo',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
