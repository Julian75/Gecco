import { CotizacionPdf } from './../../../../modelos/cotizacionPdf';
import { CotizacionPdfService } from './../../../../servicios/cotizacionPdf.service';
import { Cotizacion } from './../../../../modelos/cotizacion';
import { CotizacionService } from './../../../../servicios/cotizacion.service';
import { Solicitud } from './../../../../modelos/solicitud';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RechazoSolicitudComponent } from './../../lista-solicitudes/rechazo-solicitud/rechazo-solicitud.component';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { CorreoService } from './../../../../servicios/Correo.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Correo } from 'src/app/modelos/correo';

@Component({
  selector: 'app-rechazo-cotizacion',
  templateUrl: './rechazo-cotizacion.component.html',
  styleUrls: ['./rechazo-cotizacion.component.css']
})
export class RechazoCotizacionComponent implements OnInit {

  public formRechazoCotizacion!: FormGroup;
  public listaDetalleSolicitud: any = [];
  public listaCotizacionesPdf: any = [];

  constructor(
    private solicitudService: SolicitudService,
    private servicioCotizacion: CotizacionService,
    private servicioCotizacionPdf: CotizacionPdfService,
    private servicioEstado: EstadoService,
    private servicioCorreo: CorreoService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    public dialogRef: MatDialogRef<RechazoSolicitudComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formRechazoCotizacion = this.fb.group({
      id: [''],
      observacion: [null,Validators.required],
    });
  }

  public guardar(){
    let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
    this.servicioCotizacionPdf.listarPorId(Number(this.data)).subscribe(resCotizacionPdf=>{
      cotizacionPdf.id = resCotizacionPdf.id
      cotizacionPdf.nombrePdf = resCotizacionPdf.nombrePdf
      cotizacionPdf.idCotizacion = resCotizacionPdf.idCotizacion
      this.servicioEstado.listarPorId(40).subscribe(resEstado=>{
        cotizacionPdf.idEstado = resEstado
        const observacion = this.formRechazoCotizacion.controls['observacion'].value;
        if(observacion == "" || observacion == null){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La observacion no puede estar vacia!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.actualizarCotizacionPdf(cotizacionPdf);
        }
      })
    })
  }

  public actualizarCotizacionPdf(cotizacionPdf: CotizacionPdf){
    this.servicioCotizacionPdf.actualizar(cotizacionPdf).subscribe(res=>{
      this.crearCorreo(cotizacionPdf.idCotizacion.idUsuario.id, cotizacionPdf.idCotizacion.idSolicitud.id, cotizacionPdf.nombrePdf, cotizacionPdf.idCotizacion.id)
    })
  }


  public crearCorreo(idUsuarioCotizacion:number, idSolicitud:number, nombrePdf: String, idCotizacion: number){
    let correo : Correo = new Correo();
    const observacion = this.formRechazoCotizacion.controls['observacion'].value;
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuarioCotizacion).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Cancelacion de la Cotizacion: "+nombrePdf
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su cotización ha sido rechaza porque:</h3>"
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

        this.enviarCorreo(correo, idCotizacion);
      })
    })
  }

  public enviarCorreo(correo:any, idCotizacion:number){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      this.verificarRechazos(idCotizacion);
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

  public verificarRechazos(idCotizacion:number){
    //Verificar los Rechazos de las CotizacionesPdf
    this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacionPdf => {
      resCotizacionPdf.forEach(elementCotizacionPdf => {
        if(elementCotizacionPdf.idCotizacion.id == idCotizacion){
          this.listaCotizacionesPdf.push(elementCotizacionPdf)
        }
      });
      var contador = 0
      for (let i = 0; i < this.listaCotizacionesPdf.length; i++) {
        const element = this.listaCotizacionesPdf[i];
        this.servicioCotizacionPdf.listarPorId(element.id).subscribe(resCotizacioPdf2=>{
          console.log(resCotizacioPdf2)
          if (resCotizacioPdf2.idEstado.id == 40) {
            contador += 1
            if (contador == this.listaCotizacionesPdf.length) {
              this.servicioCotizacion.listarPorId(idCotizacion).subscribe(resCotizacion=>{
                let solicitud : Solicitud = new Solicitud();
                this.servicioEstado.listarPorId(35).subscribe(resEstado => {
                  solicitud.id = resCotizacion.idSolicitud.id
                  solicitud.fecha = resCotizacion.idSolicitud.fecha
                  solicitud.idUsuario = resCotizacion.idSolicitud.idUsuario
                  solicitud.idEstado = resEstado
                  this.actualizarSolicitud(solicitud, resCotizacion.id);
                })
              })
            }
          }
        })
      }
    })
  }

  public actualizarSolicitud(solicitud: Solicitud, idCotizacion:number){
    this.solicitudService.actualizar(solicitud).subscribe(res =>{
      this.actualCotizacion(idCotizacion, solicitud.idUsuario.id, solicitud.id)
    })
  }

  public actualCotizacion(idCotizacion:number, idUsuarioSolicitud: number, idSolicitud:number){
    this.servicioCotizacion.listarPorId(idCotizacion).subscribe(resCotizacion=>{
      let cotizacion : Cotizacion = new Cotizacion();
      this.servicioEstado.listarPorId(32).subscribe(resEstado => {
        cotizacion.id = resCotizacion.id
        cotizacion.idSolicitud = resCotizacion.idSolicitud
        cotizacion.idUsuario = resCotizacion.idUsuario
        cotizacion.idEstado = resEstado
        this.actualizarCotizacion(cotizacion, idUsuarioSolicitud, idSolicitud)
      })
    })
  }

  public actualizarCotizacion(cotizacion: Cotizacion, idUsuarioSolicitud:number, idSolicitud:number){
    this.servicioCotizacion.actualizar(cotizacion).subscribe(res =>{
      this.crearCorreo2(cotizacion.idUsuario.id, cotizacion.id, idUsuarioSolicitud, idSolicitud)
    })
  }

  public crearCorreo2(idUsuarioCotizacion:number, idCotizacion:number, idUsuarioSolicitud:number, idSolicitud:number){
    let correo : Correo = new Correo();
    const observacion = this.formRechazoCotizacion.controls['observacion'].value;
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuarioCotizacion).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Cancelacion de Cotizacion"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Todas sus cotizaciones se han rechazado y se ha enviado un correo por cada cotizacion"
        +"que subio dando el motivo de su rechazo, se ha habilitado de nuevo la posibilidad de que vuelva a subir otras cotizaciones.</h3>"
        +"<br>"
        +"<h3 style='color: black;'>Estos son todos los articulos que usted ha pedido.</h3>"
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

        this.enviarCorreo2(correo, idUsuarioSolicitud, idSolicitud);
      })
    })
  }

  public enviarCorreo2(correo:any, idUsuarioSolicitud:number, idSolicitud:number){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      this.crearCorreo3(idUsuarioSolicitud, idSolicitud)
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

  public crearCorreo3(idUsuarioSolicitud:number, idSolicitud:number){
    let correo : Correo = new Correo();
    const observacion = this.formRechazoCotizacion.controls['observacion'].value;
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuarioSolicitud).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Cancelacion de Cotizacion"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su cotización ha sido rechaza porque:</h3>"
        +"<h3 style='color: black;'>Todas sus cotizaciones se han rechazado y se ha enviado un correo por cada cotizacion"
        +"que subio dando el motivo de su rechazo, se ha habilitado de nuevo la posibilidad de que vuelva a subir otras cotizaciones.</h3>"
        +"<br>"
        +"<h3 style='color: black;'>Estos son todos los articulos que usted ha pedido.</h3>"
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

        this.enviarCorreo3(correo);
      })
    })
  }

  public enviarCorreo3(correo:any){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correo enviado al usuario de la cotizacion y de la solicitud!',
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
