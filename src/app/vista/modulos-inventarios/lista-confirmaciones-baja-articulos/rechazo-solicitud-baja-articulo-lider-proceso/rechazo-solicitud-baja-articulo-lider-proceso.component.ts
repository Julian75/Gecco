import { Correo } from 'src/app/modelos/correo';
import { SolicitudBajasArticulos2 } from 'src/app/modelos/modelos2/solicitudBajasArticulos2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazo-solicitud-baja-articulo-lider-proceso',
  templateUrl: './rechazo-solicitud-baja-articulo-lider-proceso.component.html',
  styleUrls: ['./rechazo-solicitud-baja-articulo-lider-proceso.component.css']
})
export class RechazoSolicitudBajaArticuloLiderProcesoComponent implements OnInit {

  public formRechazoSolicitudBajaArticulo!: FormGroup;
  public idSolicitudArticuloBaja:any;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public servicioUsuario: UsuarioService,
    public servicioCorreo: CorreoService,
    public servicioAsignacionArticulo: AsignacionArticulosService,
    public servicioEstado: EstadoService,
    public servicioSolicitudBajasArticulos: SolicitudBajasArticulosService,
    public servicioConfiguracion: ConfiguracionService,
    public servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<RechazoSolicitudBajaArticuloLiderProcesoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario(){
    this.formRechazoSolicitudBajaArticulo = this.fb.group({
      id:0,
      observacion: ['', Validators.required],
    });
  }

  validar: boolean = false;
  listaExiste:any = [];
  idSolicitudBaja: any;
  public guardar(){
    this.validar = false
    this.listaExiste = []
    const observacion = this.formRechazoSolicitudBajaArticulo.controls['observacion'].value;
    if(observacion == "" || observacion == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Escriba la razón del porque rechaza la solicitud de baja del articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.idSolicitudArticuloBaja = this.data
      console.log(this.idSolicitudArticuloBaja)
      this.servicioSolicitudBajasArticulos.listarPorId(this.idSolicitudArticuloBaja).subscribe(resSolicitudBajaArticulo=>{
        this.servicioEstado.listarPorId(84).subscribe(resEstado=>{
          let solicitudBajasArticulos : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
          var fecha = new Date(resSolicitudBajaArticulo.fecha)
          fecha.setDate(fecha.getDate()+1)
          solicitudBajasArticulos.fecha = fecha
          solicitudBajasArticulos.id = resSolicitudBajaArticulo.id
          solicitudBajasArticulos.id_articulo = resSolicitudBajaArticulo.idArticulo.id
          solicitudBajasArticulos.id_estado = resEstado.id
          solicitudBajasArticulos.id_usuario = resSolicitudBajaArticulo.idUsuario.id
          solicitudBajasArticulos.observacion = resSolicitudBajaArticulo.observacion
          solicitudBajasArticulos.usuario_autorizacion = resSolicitudBajaArticulo.usuarioAutorizacion
          solicitudBajasArticulos.usuario_confirmacion = 0
          this.actualizarSolicitudBajaArticulo(solicitudBajasArticulos, observacion, resSolicitudBajaArticulo)
        })
      })
    }
  }

  public actualizarSolicitudBajaArticulo(solicitudBajaArticulo: SolicitudBajasArticulos2, observacion, resSolicitudBajaArticulito){
    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaArticulo).subscribe(resSolicitudBajaArticulo=>{
      this.crearCorreo(observacion, resSolicitudBajaArticulito)
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al rechazar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  correo: any;
  contrasena: any;
  public crearCorreo(observacion, resSolicitudBajaArticulito){
    let correo : Correo = new Correo();
    this.servicioUsuario.listarPorId(resSolicitudBajaArticulito.idUsuario.id).subscribe(resUsuario =>{
      this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
        resConfiguracion.forEach(elementConfi => {
          if(elementConfi.nombre == "correo_gecco"){
            this.correo = elementConfi.valor
          }
          if(elementConfi.nombre == "contraseña_correo"){
            this.contrasena = elementConfi.valor
          }
        });
        correo.correo = this.correo
        correo.contrasena = this.contrasena
        correo.to = resUsuario.correo
        correo.subject = "Rechazo de solicitud"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>La solicitud que realizo para dar de baja al articulo "+resSolicitudBajaArticulito.idArticulo.descripcion.toLowerCase()+" ha sido rechazada porque "+observacion.toLowerCase()+" siendo rechazada por parte del usuario "+resUsuario.nombre.toLowerCase()+" "+resUsuario.apellido.toLowerCase()+" lider del proceso.</h3>"
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
        title: 'Se ha rechazado la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
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
