import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Correo } from './../../../../modelos/correo';
import { Solicitud } from './../../../../modelos/solicitud';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { CorreoService } from './../../../../servicios/Correo.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazo-solicitud',
  templateUrl: './rechazo-solicitud.component.html',
  styleUrls: ['./rechazo-solicitud.component.css']
})
export class RechazoSolicitudComponent implements OnInit {

  public formSolicitud!: FormGroup;
  public listaDetalleSolicitud: any = [];

  constructor(
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioCorreo: CorreoService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    public dialogRef: MatDialogRef<RechazoSolicitudComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: [''],
      observacion: [null,Validators.required],
    });
  }

  public guardar(){
    this.dialogRef.close();
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let solicitud : Solicitud = new Solicitud();
    this.solicitudService.listarPorId(Number(this.data)).subscribe(res => {
      this.servicioEstado.listarPorId(30).subscribe(resEstado => {
        const observacion = this.formSolicitud.controls['observacion'].value;
        if(observacion == "" || observacion == null){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La observacion no puede estar vacia!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          solicitud.id = res.id
          solicitud.fecha = res.fecha
          solicitud.idUsuario = res.idUsuario
          solicitud.idEstado = resEstado
          this.rechazarSolicitud(solicitud);
        }
      })
    })
  }

  public rechazarSolicitud(solicitud: Solicitud){
    this.solicitudService.actualizar(solicitud).subscribe(res =>{
      this.crearCorreo(solicitud.idUsuario.id, solicitud.id);
    })
  }

  public crearCorreo(idUsuario:number, idSolicitud:number){
    let correo : Correo = new Correo();
    const observacion = this.formSolicitud.controls['observacion'].value;
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Cancelacion de Solicitud"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su solicitud ha sido rechaza porque:</h3>"
        +"<h3 style='color: black;'>"+observacion+"</h3>"
        +"<br>"
        +"<table style='border: 1px solid #000; text-align: center;'>"
        +"<tr>"
        +"<th style='border: 1px solid #000;'>Articulo</th>"
        +"<th style='border: 1px solid #000;'>Cantidad</th>"
        +"<th style='border: 1px solid #000;'>Observacion</th>";
        +"</tr>";
        resSolicitud.forEach(element => {
          if (element.idSolicitud.id == idSolicitud) {
            this.listaDetalleSolicitud.push(element)
            correo.messaje += "<tr>"
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
            correo.messaje += "</tr>";
          }
        });
        correo.messaje += "</table>"
        +"<br>"
        +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
        +"</body>"
        +"</html>";

        this.enviarCorreo(correo);
      })
    })
  }

  public enviarCorreo(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correo enviado al usuario de la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()

    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al enviar el Correo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
