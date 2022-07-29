import { CotizacionService } from './../../../../servicios/cotizacion.service';
import { OrdenCompra } from './../../../../modelos/ordenCompra';
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
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';

@Component({
  selector: 'app-rechazar-registro',
  templateUrl: './rechazar-registro.component.html',
  styleUrls: ['./rechazar-registro.component.css']
})
export class RechazarRegistroComponent implements OnInit {

  public formSolicitud!: FormGroup;
  public listaDetalleSolicitud: any = [];
  public listaOrdenCompra: any = [];
  public lista: any = [];

  constructor(
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioCorreo: CorreoService,
    private servicioUsuario: UsuarioService,
    private servicioCotizacion: CotizacionService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    public dialogRef: MatDialogRef<RechazarRegistroComponent>,
    private servicioOrdenCompra: OrdenCompraService,
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
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    let solicitud : Solicitud = new Solicitud();
    this.solicitudService.listarPorId(this.lista[0]).subscribe(res => {
      this.servicioEstado.listarPorId(47).subscribe(resEstado => {
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
      this.actualOrdenCompra(solicitud.idUsuario.id, solicitud.id)
    })
  }

  public actualOrdenCompra(idUsuario: number, idSolicitud: number){
    let ordenCompra : OrdenCompra = new OrdenCompra();
    this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
      resOrdenCompra.forEach(elementOrdenCompra => {
        if (elementOrdenCompra.idSolicitud.id == idSolicitud) {
          console.log(elementOrdenCompra.id)
          this.servicioOrdenCompra.listarPorId(elementOrdenCompra.id).subscribe(resOrdenCompra=>{
            ordenCompra.id = resOrdenCompra.id
            ordenCompra.anticipoPorcentaje = resOrdenCompra.anticipoPorcentaje
            ordenCompra.valorAnticipo = resOrdenCompra.valorAnticipo
            ordenCompra.idProveedor = resOrdenCompra.idProveedor
            ordenCompra.idSolicitud = resOrdenCompra.idSolicitud
            this.servicioEstado.listarPorId(45).subscribe(resEstado=>{
              ordenCompra.idEstado = resEstado
              this.actualizarOrdenCompra(ordenCompra, idUsuario, idSolicitud);
            })
          })
        }
      });
    })
   }

   public actualizarOrdenCompra(ordenCompra: OrdenCompra, idUsuario:number, idSolicitud: number){
    this.servicioOrdenCompra.actualizar(ordenCompra).subscribe(res=>{
      this.crearCorreo(idUsuario, idSolicitud)
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

  public crearCorreo(idUsuario:number, idSolicitud:number){
    let correo : Correo = new Correo();
    const observacion = this.formSolicitud.controls['observacion'].value;
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Cancelacion de Registro"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su orden de compra ha sido rechaza porque:</h3>"
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

        this.enviarCorreo(correo, idSolicitud, observacion);
      })
    })
  }

  public enviarCorreo(correo: Correo, idSolicitud:number, observacion:string){
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioCotizacion.listarPorId(this.lista[1]).subscribe(resCotizacion=>{
      this.servicioCorreo.enviar(correo).subscribe(res =>{
        let correo : Correo = new Correo();
        this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
          this.servicioUsuario.listarPorId(resCotizacion.idUsuario.id).subscribe(resUsuario => {
            correo.to = resUsuario.correo
            correo.subject = "Cancelacion de Registro"
            correo.messaje = "<!doctype html>"
            +"<html>"
            +"<head>"
            +"<meta charset='utf-8'>"
            +"</head>"
            +"<body>"
            +"<h3 style='color: black;'>Su orden de compra ha sido rechaza porque:</h3>"
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


            this.enviarCorreo2(correo);
          })
        })
      })
    })
  }

  public enviarCorreo2(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correo enviado al usuario de la solicitud y cotizacion!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
      this.dialogRef.close();
    })
  }

}
