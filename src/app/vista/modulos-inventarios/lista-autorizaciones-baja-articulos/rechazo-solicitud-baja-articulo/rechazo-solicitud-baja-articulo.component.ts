import { CorreoService } from './../../../../servicios/Correo.service';
import { ConfiguracionService } from './../../../../servicios/configuracion.service';
import { Correo } from './../../../../modelos/correo';
import { SolicitudBajasArticulos2 } from './../../../../modelos/modelos2/solicitudBajasArticulos2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudBajasArticulosService } from './../../../../servicios/solicitudBajasArticulos.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { AsignacionArticulosService } from './../../../../servicios/asignacionArticulo.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ModificarService } from 'src/app/servicios/modificar.service';
import Swal from 'sweetalert2';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';

@Component({
  selector: 'app-rechazo-solicitud-baja-articulo',
  templateUrl: './rechazo-solicitud-baja-articulo.component.html',
  styleUrls: ['./rechazo-solicitud-baja-articulo.component.css']
})
export class RechazoSolicitudBajaArticuloComponent implements OnInit {

  public formRechazoSolicitudBajaArticulo!: FormGroup;
  public idSolicitudArticuloBaja:any;
  color = ('primary');
  public fechaActual:Date = new Date();

  constructor(
    private fb: FormBuilder,
    public servicioUsuario: UsuarioService,
    public servicioCorreo: CorreoService,
    public servicioAsignacionArticulo: AsignacionArticulosService,
    public servicioEstado: EstadoService,
    public servicioSolicitudBajasArticulos: SolicitudBajasArticulosService,
    public servicioBajaArticulos: ArticulosBajaService,
    public servicioConfiguracion: ConfiguracionService,
    public servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<RechazoSolicitudBajaArticuloComponent>,
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
      this.servicioSolicitudBajasArticulos.listarPorId(this.idSolicitudArticuloBaja).subscribe(resSolicitudBajaArticulo=>{
        this.servicioEstado.listarPorId(83).subscribe(resEstado=>{
          let solicitudBajasArticulos : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
          var fecha = new Date(resSolicitudBajaArticulo.fecha)
          fecha.setDate(fecha.getDate()+1)
          solicitudBajasArticulos.id = resSolicitudBajaArticulo.id
          solicitudBajasArticulos.fecha = fecha
          solicitudBajasArticulos.id_estado = resEstado.id
          solicitudBajasArticulos.id_usuario = resSolicitudBajaArticulo.idUsuario.id
          solicitudBajasArticulos.usuario_autorizacion = 0
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
    this.servicioBajaArticulos.listarTodos().subscribe(resBajasActivos=>{
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
          +"<h3 style='color: black;'>Su solicitud para dar de baja algunos activos, ha sido rechaza por parte de compras porque:</h3>"
          +"<h3 style='color: black;'>"+observacion+"</h3>"
          +"<br>"
          +"<table style='border: 1px solid #000; text-align: center;'>"
          +"<tr>"
          +"<th style='border: 1px solid #000;'>Activo</th>"
          +"<th style='border: 1px solid #000;'>Serial</th>"
          +"<th style='border: 1px solid #000;'>Placa</th>"
          +"<th style='border: 1px solid #000;'>Marca</th>"
          +"<th style='border: 1px solid #000;'>Estado</th>"
          +"<th style='border: 1px solid #000;'>Observacion</th>";
          +"</tr>";
          resBajasActivos.forEach(element => {
            if (element.idSolicitudBaja.id == resSolicitudBajaArticulito.id) {
              correo.messaje += "<tr>"
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.idArticulo.descripcion+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.serial+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.placa+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.marca+"</td>";
              correo.messaje += "<td style='border: 1px solid #000;'>"+element.idOpcionBaja.descripcion+"</td>";
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
