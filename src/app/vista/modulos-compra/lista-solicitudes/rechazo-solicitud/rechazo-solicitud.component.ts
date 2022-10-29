import { ConfiguracionService } from './../../../../servicios/configuracion.service';
import { SolicitudesComponent } from './../../solicitudes/solicitudes.component';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Correo } from './../../../../modelos/correo';
import { Solicitud } from './../../../../modelos/solicitud';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { CorreoService } from './../../../../servicios/Correo.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Solicitud2 } from 'src/app/modelos/solicitud2';

@Component({
  selector: 'app-rechazo-solicitud',
  templateUrl: './rechazo-solicitud.component.html',
  styleUrls: ['./rechazo-solicitud.component.css']
})
export class RechazoSolicitudComponent implements OnInit {

  public formSolicitud!: FormGroup;
  public listaDetalleSolicitud: any = [];
  public fecha: Date = new Date();
  public correo: any;
  public contrasena: any;

  constructor(
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioCorreo: CorreoService,
    private servicioUsuario: UsuarioService,
    private servicioModificar: ModificarService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    public dialogRef: MatDialogRef<RechazoSolicitudComponent>,
    public dialogRef2: MatDialogRef<SolicitudesComponent>,
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
    document.getElementById('snipper8')?.setAttribute('style', 'display: block;')
    let solicitud : Solicitud2 = new Solicitud2();
    const observacion = this.formSolicitud.controls['observacion'].value;
    if(observacion == "" || observacion == null){
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La observacion no puede estar vacia!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.solicitudService.listarPorId(Number(this.data)).subscribe(res => {
        this.servicioEstado.listarPorId(30).subscribe(resEstado => {
          solicitud.id = res.id
          this.fecha = new Date(res.fecha)
          this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
          solicitud.fecha = this.fecha
          solicitud.idUsuario = res.idUsuario.id
          solicitud.idEstado = resEstado.id
          this.rechazarSolicitud(solicitud);
        })
      })
    }
  }

  public rechazarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(res =>{
      // this.crearCorreo(solicitud.idUsuario, solicitud.id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se rechazo la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
    })
  }

  // public crearCorreo(idUsuario:number, idSolicitud:number){
  //   let correo : Correo = new Correo();
  //   const observacion = this.formSolicitud.controls['observacion'].value;
  //   this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
  //     this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
  //       this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
  //         resConfiguracion.forEach(elementConfi => {
  //           if(elementConfi.nombre == "correo_gecco"){
  //             this.correo = elementConfi.valor
  //           }
  //           if(elementConfi.nombre == "contraseña_correo"){
  //             this.contrasena = elementConfi.valor
  //           }
  //         });
  //         correo.correo = this.correo
  //         correo.contrasena = this.contrasena
  //         correo.to = resUsuario.correo
  //         correo.subject = "Cancelacion de Solicitud"
  //         correo.messaje = "<!doctype html>"
  //         +"<html>"
  //         +"<head>"
  //         +"<meta charset='utf-8'>"
  //         +"</head>"
  //         +"<body>"
  //         +"<h3 style='color: black;'>Su solicitud ha sido rechaza porque:</h3>"
  //         +"<h3 style='color: black;'>"+observacion+"</h3>"
  //         +"<br>"
  //         +"<table style='border: 1px solid #000; text-align: center;'>"
  //         +"<tr>"
  //         +"<th style='border: 1px solid #000;'>Articulo</th>"
  //         +"<th style='border: 1px solid #000;'>Cantidad</th>"
  //         +"<th style='border: 1px solid #000;'>Observacion</th>";
  //         +"</tr>";
  //         resSolicitud.forEach(element => {
  //           if (element.idSolicitud.id == idSolicitud && element.idEstado.id != 59) {
  //             this.listaDetalleSolicitud.push(element)
  //             correo.messaje += "<tr>"
  //             correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
  //             correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
  //             correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
  //             correo.messaje += "</tr>";
  //           }
  //         });
  //         correo.messaje += "</table>"
  //         +"<br>"
  //         +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
  //         +"</body>"
  //         +"</html>";

  //         this.enviarCorreo(correo);
  //       })
  //     })
  //   })
  // }

  // public enviarCorreo(correo: Correo){
  //   this.servicioCorreo.enviar(correo).subscribe(res =>{
  //     document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Correo enviado al usuario de la solicitud!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     window.location.reload()

  //   }, error => {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Hubo un error al enviar el Correo!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   });
  // }

}
