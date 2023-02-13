import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Correo } from 'src/app/modelos/correo';
import { MotivoAutorizacionPago2 } from 'src/app/modelos/modelos2/motivoAutorizacionPago2';
import { SolicitudAutorizacionPago2 } from 'src/app/modelos/modelos2/solicitudAutorizacionPago2';
import { RechazarSolicitudAutorizacionPremios } from 'src/app/modelos/rechazarSolicitudAutorizacionPremios';
import { SolicitudAutorizacionPago } from 'src/app/modelos/solicitudAutorizacionPago';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { DatosFormularioPagoService } from 'src/app/servicios/datosFormularioPago.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { MotivoAutorizacionPagoService } from 'src/app/servicios/motivoAutorizacionPago.service';
import { RechazoSolicitudAutorizacionPremios } from 'src/app/servicios/rechazarSolicitudAutorizacionPremios.service';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rechazar-solicitud-autorizacion-premios',
  templateUrl: './rechazar-solicitud-autorizacion-premios.component.html',
  styleUrls: ['./rechazar-solicitud-autorizacion-premios.component.css']
})
export class RechazarSolicitudAutorizacionPremiosComponent implements OnInit {
  public formAprobacion!: FormGroup;
  constructor(
    private servicioSolicitudAutorizacionPremios: SolicitudAutorizacionPagoService,
    private servicioRechazarSolicitud: RechazoSolicitudAutorizacionPremios,
    private servicioDatosFormulario: DatosFormularioPagoService,
    private servicioMotivoAutorizacionPago: MotivoAutorizacionPagoService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<RechazarSolicitudAutorizacionPremiosComponent>,
    private servicioConfiguracion: ConfiguracionService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formAprobacion = this.fb.group({
      id: [''],
      observacion: [null,Validators.required],
    });
  }

  guardar() {
    let solicitudAutorizacionModificar: SolicitudAutorizacionPago2 = new SolicitudAutorizacionPago2();
    let rechazarSolicitud: RechazarSolicitudAutorizacionPremios = new RechazarSolicitudAutorizacionPremios();
    let motiviAutorizacionPagoModificar: MotivoAutorizacionPago2 = new MotivoAutorizacionPago2();
    this.servicioSolicitudAutorizacionPremios.listarPorId(Number(this.data)).subscribe( (data) => {
      const fecha = new Date(data.fecha);
      const fecha2 = new Date(fecha.getTime()).toISOString();
      solicitudAutorizacionModificar.id = data.id;
      solicitudAutorizacionModificar.fecha = fecha2;
      solicitudAutorizacionModificar.idOficina = data.idOficina;
      solicitudAutorizacionModificar.idUsuario = data.idUsuario.id;
      solicitudAutorizacionModificar.idDatosFormularioPago = data.idDatosFormularioPago.id;
      solicitudAutorizacionModificar.nombreOficiona = data.nombreOficiona;
      solicitudAutorizacionModificar.idMotivoAutorizacionPago = data.idMotivoAutorizacionPago.id;
      this.servicioMotivoAutorizacionPago.listarPorId(Number(data.idMotivoAutorizacionPago.id)).subscribe( (listarMotivo) => {
        motiviAutorizacionPagoModificar.id = listarMotivo.id;
        motiviAutorizacionPagoModificar.descripcion = listarMotivo.descripcion;
        motiviAutorizacionPagoModificar.idEstado = 98
        console.log(motiviAutorizacionPagoModificar);
        this.servicioModificar.actualizarMotivoAutorizacionPago(motiviAutorizacionPagoModificar).subscribe( (modificarMotivo) => {
          this.servicioMotivoAutorizacionPago.listarTodos().subscribe( (listarMotivo2) => {
            const encontrarMotivo = listarMotivo2.find( (motivo) => motivo.id === listarMotivo.id);
            solicitudAutorizacionModificar.idMotivoAutorizacionPago = encontrarMotivo.id;
            this.servicioModificar.actualizarSolicitudAutorizacionPago(solicitudAutorizacionModificar).subscribe( (modificarSolicitud) => {
              this.servicioSolicitudAutorizacionPremios.listarTodos().subscribe( (listarTodasSolicitudes) => {
                const encontrarSolicitud = listarTodasSolicitudes.find( (solicitud) => solicitud.id === data.id);
                rechazarSolicitud.comentario = this.formAprobacion.value.observacion;
                rechazarSolicitud.idSolicitudAutorizacionPremios = encontrarSolicitud;
                rechazarSolicitud.idUsuario = data.idUsuario;
                this.servicioRechazarSolicitud.registrar(rechazarSolicitud).subscribe( (guardarRechazo) => {
                  this.enviarCorreo(solicitudAutorizacionModificar.id, solicitudAutorizacionModificar.idUsuario);
                  document.getElementById('snipper2')?.setAttribute('style', 'display: block;')
                }, (error) => {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al registrar el rechazo de la solicitud',
                    });
                });
              }, (error) => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Error al listar todas la solicitudes premios',
                });
              });
            }, (error) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al modificar la solicitud para cambiarlo de estado',
                });
            });
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al listar todos los motivos de autorización de pago',
            })
          });
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al modificar el motivo de autorización de pago',
            });
        });
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al listar un motivo de autorización de pago',
        });
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al listar una la solicitud de autorización de premios',
        });
    });
  }

  enviarCorreo(idSolicitudPremios: number , idUsuario: number) {
    let correo: Correo = new Correo();
    this.servicioSolicitudAutorizacionPremios.listarTodos().subscribe( (solicituAutorizacionTodo) => {
      this.servicioConfiguracion.listarTodos().subscribe( (datosConfiguracion) => {
        const encontrarNombre = datosConfiguracion.find( (configuracion) => configuracion.nombre === 'correo_gecco');
        const encontrarContraseña = datosConfiguracion.find( (configuracion) => configuracion.nombre === 'contraseña_correo');
        this.servicioUsuario.listarPorId(idUsuario).subscribe( (datosUsuario) => {
          correo.correo = encontrarNombre.valor;
          correo.contrasena = encontrarContraseña.valor;
          correo.to = datosUsuario.correo;
          // enviar correo con tildes
          correo.subject = "Cancelacion de solicitud de premios";
          correo.messaje = "<!DOCTYPE html>"
            +"<html lang='es'>"
            +"<head>"
            +"<meta charset='utf-8'/>"
            +"</head>"
            +"<body>"
            +"<h3 style='color: black;'>Su solicitud de premios ha sido rechaza porque:</h3>"
            +"<h3 style='color: black;'>"+this.formAprobacion.value.observacion+"</h3>"
            +"<br>"
            +"<table style='border: 1px solid #000; text-align: center;'>"
            +"<tr>"
            +"<th style='border: 1px solid #000;'>Fecha</th>"
            +"<th style='border: 1px solid #000;'>Oficina</th>"
            +"<th style='border: 1px solid #000;'>Cliente</th>"
            +"<th style='border: 1px solid #000;'>Cedula Cliente</th>"
            +"<th style='border: 1px solid #000;'>Loteria</th>"
            +"<th style='border: 1px solid #000;'>Cedula Colocador</th>"
            +"<th style='border: 1px solid #000;'>Fecha del Sorteo</th>"
            +"</tr>";
            const encontrarSolicitud = solicituAutorizacionTodo.find( (solicitud) => solicitud.id === idSolicitudPremios);
            correo.messaje += "<tr>"
            +"<td style='border: 1px solid #000;'>"+new Date(encontrarSolicitud.fecha).toLocaleDateString()+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.nombreOficiona+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.idDatosFormularioPago.idClientesAutorizacionPago.nombre+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.idDatosFormularioPago.idClientesAutorizacionPago.cedula+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.idDatosFormularioPago.nombreSorteoLoteria+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.idDatosFormularioPago.cedulaColocador+"</td>"
            +"<td style='border: 1px solid #000;'>"+encontrarSolicitud.idDatosFormularioPago.fechaSorteo+"</td>"
            +"</tr>";
            correo.messaje += "</table>"
            +"<br>"
            +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
            +"</body>"
            +"</html>";
            this.servicioCorreo.enviar(correo).subscribe(res =>{
              document.getElementById('snipper2')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Solicitud rechazada',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                window.location.reload();
              }
              , 1500);
            })
        });
      });
    });
  }
}
