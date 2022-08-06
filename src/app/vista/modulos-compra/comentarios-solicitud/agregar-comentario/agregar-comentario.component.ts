import { CorreoService } from './../../../../servicios/Correo.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { Correo } from './../../../../modelos/correo';
import { PasosComponent } from './../../pasos/pasos.component';
import { VisualizarDetalleSolicitudComponent } from './../../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { DetalleSolicitud } from './../../../../modelos/detalleSolicitud';
import { Solicitud } from './../../../../modelos/solicitud';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { ListadoObservacionComponent } from './../../listado-observacion/listado-observacion.component';
import { EstadoService } from './../../../../servicios/estado.service';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { GestionProceso } from './../../../../modelos/gestionProceso';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GestionProceso2 } from 'src/app/modelos/gestionProceso2';
import { DetalleSolicitud2 } from 'src/app/modelos/detalleSolicitud2';
import { Solicitud2 } from 'src/app/modelos/solicitud2';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.css']
})
export class AgregarComentarioComponent implements OnInit {

  public formAddComment!: FormGroup;
  public listaDetalleSolicitud: any = [];
  public listaExiste: any = [];
  public listaExiste2: any = [];
  public listaExiste3: any = [];
  public listaExiste4: any = [];
  public listaExistePropios: any = [];
  public listaCompleta: any = [];
  public listaRestante: any = [];

  constructor(
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioGestionProceso: GestionProcesoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarComentarioComponent>,
    public visul: MatDialogRef<VisualizarDetalleSolicitudComponent>,
    public pasos: MatDialogRef<PasosComponent>,
    private servicioModificar: ModificarService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formAddComment = this.fb.group({
      id: [''],
      comentario: [null,Validators.required],
    });
  }

  aprobar:boolean = false
  aprobar2:boolean = false
  aprobadito:boolean = false
  aprobadi:boolean = false
  propios:boolean = false
  public guardar(){
    this.listaCompleta=[]
    this.listaRestante=[]
    this.listaExiste=[]
    this.listaExiste2=[]
    var comentario = this.formAddComment.controls['comentario'].value;
    if(comentario == '' || comentario == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo de comentario no puede esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioDetalleSolicitud.listarPorId(Number(this.data)).subscribe(resDetalleSolicitud=>{
        this.servicioGestionProceso.listarTodos().subscribe(resGestionProc=>{
          this.servicioGestionProceso.listarTodos().subscribe(resGesProc=>{
            resGesProc.forEach(elementGestionProceso => {
              if(elementGestionProceso.idDetalleSolicitud.id == resDetalleSolicitud.id && elementGestionProceso.idEstado.id == 50){
                let gestionProceso : GestionProceso2 = new GestionProceso2();
                gestionProceso.id = elementGestionProceso.id
                gestionProceso.idDetalleSolicitud = elementGestionProceso.idDetalleSolicitud.id
                gestionProceso.idProceso = elementGestionProceso.idProceso.id
                gestionProceso.idUsuario = elementGestionProceso.idUsuario.id
                this.servicioEstado.listarPorId(58).subscribe(resEstado=>{
                  gestionProceso.idEstado = resEstado.id
                  gestionProceso.comentario = "Comentario: "+comentario+". "
                  this.servicioModificar.actualizarGestionProceso(gestionProceso).subscribe(resGestionProceso=>{

                    let correo : Correo = new Correo();
                    this.servicioUsuario.listarPorId(gestionProceso.idUsuario).subscribe(resUsuario => {
                      correo.to = resUsuario.correo
                      correo.subject = "Nuevo Comentario"
                      correo.messaje = "<!doctype html>"
                      +"<html>"
                      +"<head>"
                      +"<meta charset='utf-8'>"
                      +"</head>"
                      +"<body>"
                      +"<h3 style='color: black;'>Se realizo un nuevo comentario por parte de "+resUsuario.nombre+" "+resUsuario.apellido+" al articulo de"+elementGestionProceso.idDetalleSolicitud.idArticulos.descripcion+".</h3>"
                      +"<br>"
                      +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
                      +"</body>"
                      +"</html>";
                      this.servicioCorreo.enviar(correo).subscribe(res =>{
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
                    })
                    let solicitudDetalle : DetalleSolicitud2 = new DetalleSolicitud2();
                    solicitudDetalle.id = resDetalleSolicitud.id
                    solicitudDetalle.cantidad = resDetalleSolicitud.cantidad
                    solicitudDetalle.idArticulos = resDetalleSolicitud.idArticulos.id
                    solicitudDetalle.idSolicitud = resDetalleSolicitud.idSolicitud.id
                    solicitudDetalle.observacion = resDetalleSolicitud.observacion
                    solicitudDetalle.valorTotal = resDetalleSolicitud.valorTotal
                    solicitudDetalle.valorUnitario = resDetalleSolicitud.valorUnitario
                    this.servicioEstado.listarPorId(57).subscribe(resEstado=>{
                     solicitudDetalle.idEstado = resEstado.id
                      this.servicioModificar.actualizarDetalleSolicitud(solicitudDetalle).subscribe(resDetalleSolMod=>{
                        resGestionProc.forEach(elementGestionProceso => {
                          if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == resDetalleSolicitud.idSolicitud.id && elementGestionProceso.idProceso.idUsuario.id == Number(sessionStorage.getItem('id'))){
                            this.listaCompleta.push(elementGestionProceso)
                          }
                          if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == resDetalleSolicitud.idSolicitud.id && elementGestionProceso.idProceso.idUsuario.id != Number(sessionStorage.getItem('id'))){
                            this.listaRestante.push(elementGestionProceso)
                          }
                        });
                        if(this.listaCompleta.length <=1){
                          this.listaCompleta.forEach(elementGestionProces => {
                            console.log(elementGestionProces)
                            if(elementGestionProces.idEstado.id != 50){ this.aprobar = true }
                            else{ this.aprobar = false}
                            this.listaExiste.push(this.aprobar)
                          });
                        }else{
                          this.listaCompleta.forEach(elementGestionProces => {
                            console.log(elementGestionProces)
                            if(elementGestionProces.idEstado.id == 50){ this.aprobar = true }
                            else{ this.aprobar = false}
                            this.listaExiste.push(this.aprobar)
                          });
                        }
                        const existe = this.listaExiste.includes( true );
                        console.log(existe)
                        if(existe == true){
                          this.metodo(resDetalleSolicitud)
                        }else{
                          console.log("Holissolouno")
                          this.listaRestante.forEach(elementGestionProcesoR => {
                            if(elementGestionProcesoR.idEstado.id == 54){ this.aprobar2 = false }
                          else{ this.aprobar2 = true}
                            this.listaExiste2.push(this.aprobar2)
                          });
                          const existe2 = this.listaExiste2.includes( true );
                          if (existe2 == false) {
                            console.log("Holisno esta relacionado")
                            this.solicitudService.listarPorId(resDetalleSolicitud.idSolicitud.id).subscribe(resSolicitud=>{
                              let solicitud : Solicitud2 = new Solicitud2();
                              solicitud.id = resSolicitud.id
                              solicitud.fecha = resSolicitud.fecha
                              solicitud.idUsuario = resSolicitud.idUsuario.id
                              this.servicioEstado.listarPorId(57).subscribe(resEstado=>{
                                solicitud.idEstado = resEstado.id
                                this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{

                                  Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Ya todo fue actualizado!',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                  this.dialogRef.close();
                                  this.visul.close();
                                  this.pasos.close();
                                  window.location.reload();
                                })
                              })
                            })
                          }else{
                            this.metodo(resDetalleSolicitud)
                          }
                        }
                      })
                    })
                  })
                })
              }
            });
          })
        })
      })
    }
  }

  public metodo(resDetalleSolicitud){
    this.solicitudService.listarPorId(resDetalleSolicitud.idSolicitud.id).subscribe( res => {
      this.servicioGestionProceso.listarTodos().subscribe(resGestionProceso=>{
        resGestionProceso.forEach(elementGestionProceso => {
          if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id == Number(sessionStorage.getItem('id')) && elementGestionProceso.idEstado.id == 50){
            this.aprobadito = true
          }else if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id == Number(sessionStorage.getItem('id')) && elementGestionProceso.idEstado.id == 58){
            this.aprobadito = false
          }
          if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id != Number(sessionStorage.getItem('id')) && elementGestionProceso.idDetalleSolicitud.idEstado.id == 54){
            this.aprobadi = true
          }else if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id != Number(sessionStorage.getItem('id')) && elementGestionProceso.idDetalleSolicitud.idEstado.id == 57){
            this.aprobadi = false
          }
          this.listaExiste3.push(this.aprobadito)
          this.listaExiste4.push(this.aprobadi)
        });
        const aprobo = this.listaExiste3.includes( true );
        console.log(aprobo)
        const impropio = this.listaExiste4.includes( true );
        console.log(impropio)
        if(aprobo == true){
          const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
            width: '1000px',
            data: {id:resDetalleSolicitud.idSolicitud.id}
          });
        }else{
          if(impropio == true){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ya se agrego los comentarios pero faltan algunas por comentar desde otro usuario!',
              showConfirmButton: false,
              timer: 5000
            })
            this.dialogRef.close();
            this.visul.close();
            this.pasos.close();
            window.location.reload();
          }else{
            this.solicitudService.listarPorId(resDetalleSolicitud.idSolicitud.id).subscribe(resSolicitud=>{
              let solicitud : Solicitud2 = new Solicitud2();
              solicitud.id = resSolicitud.id
              solicitud.fecha = resSolicitud.fecha
              solicitud.idUsuario = resSolicitud.idUsuario.id
              this.servicioEstado.listarPorId(57).subscribe(resEstado=>{
                solicitud.idEstado = resEstado.id
                this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Ya todo fue actualizado!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.dialogRef.close();
                  this.visul.close();
                  this.pasos.close();
                  window.location.reload();
                })
              })
            })
          }
        }
      })
    })
  }

  public crearCorreo(idUsuarioCotizacion:number, idUsuarioSolicitud: number, idSolicitud:number){

  }

  public enviarCorreo(correo: Correo, idUsuarioSolicitud: number, idSolicitud:number){

  }


}
