import { Solicitud2 } from './../../../../modelos/solicitud2';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { ModificarService } from './../../../../servicios/modificar.service';
import { ConsultasGeneralesService } from './../../../../servicios/consultasGenerales.service';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { DetalleSolicitud2 } from 'src/app/modelos/detalleSolicitud2';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { ProcesoService } from './../../../../servicios/proceso.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { GestionProceso } from 'src/app/modelos/gestionProceso';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos-comentarios',
  templateUrl: './todos-comentarios.component.html',
  styleUrls: ['./todos-comentarios.component.css']
})
export class TodosComentariosComponent implements OnInit {

  public opcion: number = 0;
  public listaDetalleSolicitud: any = [];
  public listaDetallesNoSeleccionados: any = [];
  public validar: any;
  public fecha: Date = new Date();

  constructor(
    private servicioUsuario: UsuarioService,
    private serviceEstado: EstadoService,
    private serviceProceso: ProcesoService,
    private servicioGestionProceso: GestionProcesoService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioModificar: ModificarService,
    private servicioSolicitud: SolicitudService,
    public dialogRef: MatDialogRef<TodosComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public capturarOpcion(opcion: number){
    this.opcion = opcion
  }

  existe = false;
  listaExiste = [];
  public guardar(){
    this.listaExiste = []
    this.existe = false;
    if(this.opcion == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debe seleccionar una opción!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.listaDetalleSolicitud = this.data
      let gestionProceso : GestionProceso = new GestionProceso();
      if(this.opcion == 1){
        gestionProceso.comentario = ""
        this.serviceProceso.listarTodos().subscribe(resProceso=>{
          resProceso.forEach(element => {
            if(element.idUsuario.id == this.listaDetalleSolicitud[0].articulo.idSolicitud.idUsuario.id){
              gestionProceso.idProceso = element
              this.existe = true
            }
            this.listaExiste.push(this.existe)
          });
          const existente = this.listaExiste.includes(true)
          if(existente == true){
            for (let i = 0; i < this.listaDetalleSolicitud.length; i++) {
              const element = this.listaDetalleSolicitud[i];
              console.log(element, this.listaDetalleSolicitud[i])
              this.serviceEstado.listarPorId(50).subscribe(resEstado=>{
                gestionProceso.idDetalleSolicitud = element.articulo
                gestionProceso.idEstado = resEstado
                this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
                  gestionProceso.idUsuario = resUsuario
                  console.log(gestionProceso.idDetalleSolicitud)
                  this.registrarGestionProceso(gestionProceso, element.articulo.id, i)
                })
              })
              console.log(gestionProceso)
            }
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'El usuario que genero la solicitud debe tener asignada una categoria para poder hacer los comentarios!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }else if(this.opcion == 2){
        this.dialogRef.close()
      }
    }
  }

  public registrarGestionProceso(gestionProceso: GestionProceso, idDetalleSolicitud, contador){
    console.log(gestionProceso)
    // this.servicioGestionProceso.registrar(gestionProceso).subscribe(res=>{
    //   this.actualizarDetalleSolicitud(idDetalleSolicitud, contador);
    // }, error => {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Hubo un error al agregar!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // });
  }

  public actualizarDetalleSolicitud(idDetalleSolicitud:number, contador){
    let detalleSolicitud : DetalleSolicitud2 = new DetalleSolicitud2();
    this.servicioDetalleSolicitud.listarPorId(idDetalleSolicitud).subscribe(resDetalleSolicitud=>{
      detalleSolicitud.id = resDetalleSolicitud.id
      detalleSolicitud.cantidad = resDetalleSolicitud.cantidad
      detalleSolicitud.idArticulos = resDetalleSolicitud.idArticulos.id
      detalleSolicitud.idSolicitud = resDetalleSolicitud.idSolicitud.id
      detalleSolicitud.observacion = resDetalleSolicitud.observacion
      detalleSolicitud.valorTotal = resDetalleSolicitud.valorTotal
      detalleSolicitud.valorUnitario = resDetalleSolicitud.valorUnitario
      this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
        detalleSolicitud.idEstado = resEstado.id
        this.actualizarDetaSol(detalleSolicitud, contador)
      })
    })
  }

  public actualizarDetaSol(detalleSolicitud: DetalleSolicitud2, contador){
    this.servicioModificar.actualizarDetalleSolicitud(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      if((contador+1) == this.listaDetalleSolicitud.length){
        this.listaDetallesNoSeleccionados = []
        this.servicioConsultasGenerales.listarDetalleSolicitud(detalleSolicitud.idSolicitud).subscribe(resDetalleSolici=>{
          console.log(resDetalleSolici)
          resDetalleSolici.forEach(element => {
            this.validar = false
            for (let i = 0; i < this.listaDetalleSolicitud.length; i++) {
              const elementSeleccionados = this.listaDetalleSolicitud[i];
              if(element.id == elementSeleccionados.articulo.id){
                this.validar = true
              }
            }
            console.log(this.validar)
            if(this.validar == true){
              this.listaDetallesNoSeleccionados.push(element)
            }
          });
          if(this.listaDetallesNoSeleccionados.length > 0){
            console.log("hola")
            for (let i = 0; i < this.listaDetallesNoSeleccionados.length; i++) {
              const element = this.listaDetallesNoSeleccionados[i];
              let detalleSolicitud2 : DetalleSolicitud2 = new DetalleSolicitud2();
              this.servicioDetalleSolicitud.listarPorId(element.id).subscribe(resDetalleSolicitud=>{
                detalleSolicitud2.id = resDetalleSolicitud.id
                detalleSolicitud2.cantidad = resDetalleSolicitud.cantidad
                detalleSolicitud2.idArticulos = resDetalleSolicitud.idArticulos.id
                detalleSolicitud2.idSolicitud = resDetalleSolicitud.idSolicitud.id
                detalleSolicitud2.observacion = resDetalleSolicitud.observacion
                detalleSolicitud2.valorTotal = resDetalleSolicitud.valorTotal
                detalleSolicitud2.valorUnitario = resDetalleSolicitud.valorUnitario
                this.serviceEstado.listarPorId(56).subscribe(resEstado=>{
                  detalleSolicitud2.idEstado = resEstado.id
                  this.actualizarDetalleSolicitud2(detalleSolicitud2, i)
                })
              })
            }
          }else{
            console.log("hola2")
            this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud)).subscribe(res => {
              let solicitud : Solicitud2 = new Solicitud2();
              solicitud.id = res.id
              this.fecha = new Date(res.fecha)
              this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
              solicitud.fecha = this.fecha
              solicitud.idUsuario = res.idUsuario.id
              this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
                solicitud.idEstado = resEstado.id
                this.actualizarSolicitud(solicitud)
              })
            })
          }
        })
      }
    })
  }

  public actualizarDetalleSolicitud2(detalleSolicitud: DetalleSolicitud2, contador){
    this.servicioModificar.actualizarDetalleSolicitud(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      if((contador+1) == this.listaDetallesNoSeleccionados.length){
        this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud)).subscribe(res => {
          let solicitud : Solicitud2 = new Solicitud2();
          solicitud.id = res.id
          this.fecha = new Date(res.fecha)
          this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
          solicitud.fecha = this.fecha
          solicitud.idUsuario = res.idUsuario.id
          this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
            solicitud.idEstado = resEstado.id
            this.actualizarSolicitud(solicitud)
          })
        })
      }
    })
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se solicito comentarios',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    })
  }
}
