import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { PasosComponent } from './../pasos/pasos.component';
import { Solicitud } from 'src/app/modelos/solicitud';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { ListadoObservacionComponent } from './../listado-observacion/listado-observacion.component';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { GestionProcesoService } from './../../../servicios/gestionProceso.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { GestionProceso } from './../../../modelos/gestionProceso';
import { ProcesoService } from './../../../servicios/proceso.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Solicitud2 } from 'src/app/modelos/solicitud2';
import { DetalleSolicitud2 } from 'src/app/modelos/detalleSolicitud2';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  public formComentario!: FormGroup;
  public detalleSolicitud: any = [];
  public listarUsuarios: any = [];
  public listaProceso: any = [];
  public listaDetalleSolicitud: any = [];
  public listaDetalleSolicitudes: any = [];
  public listaValidadas: any = [];
  public listaComentarios: any = [];
  public opcion: number = 0;
  public fecha: Date = new Date();

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<ProcesoComponent>,
    public dialogRef2: MatDialogRef<ListadoObservacionComponent>,
    public pasos: MatDialogRef<PasosComponent>,
    private serviceProceso: ProcesoService,
    private serviceEstado: EstadoService,
    private serviceGestionProceso: GestionProcesoService,
    private servicioUsuario: UsuarioService,
    private servicioModificar: ModificarService,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  public crearFormulario(){
    this.formComentario = this.fb.group({
      id: 0,
      comentario: [null,Validators.required],
      usuario: [null,Validators.required],
    });
  }

  public listaUsuarios(){
    this.listarUsuarios = []
    this.serviceProceso.listarTodos().subscribe(resProceso=>{
      this.detalleSolicitud.push(this.data)
      resProceso.forEach(element => {
        if(element.idCategoria.id == this.detalleSolicitud[0].idArticulos.idCategoria.id){
          this.listarUsuarios.push(element)
        }
      });
    })
  }

  procesoList: any = []
  public guardar(){
    this.procesoList = []
    this.listaDetalleSolicitud = this.data
    const usuario = this.formComentario.controls['usuario'].value;
    let gestionProceso : GestionProceso = new GestionProceso();
    if(this.opcion == 1){
      if(usuario==null || usuario==''){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Debe seleccionar un usuario si desea solicitar un comentario más a fondo',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        gestionProceso.comentario = ""
        this.serviceProceso.listarTodos().subscribe(resProceso=>{
          resProceso.forEach(element => {
            if(element.idUsuario.id == usuario){
              this.procesoList.push(element)
            }
          });
          this.procesoList.forEach(elementProc => {
            gestionProceso.idProceso = elementProc
            gestionProceso.idDetalleSolicitud = this.listaDetalleSolicitud
            this.serviceEstado.listarPorId(50).subscribe(resEstado=>{
              gestionProceso.idEstado = resEstado
              this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
                gestionProceso.idUsuario = resUsuario
                this.registrarGestionProceso(gestionProceso, this.listaDetalleSolicitud.id, "siquiere")
              })
            })
          });
        })
      }
    }else if(this.opcion == 2){
      this.actualizarDetalleSolicitud(this.listaDetalleSolicitud.id, "noquiere")
    }
  }

  public registrarGestionProceso(gestionProceso: GestionProceso, idDetalleSolicitud, informacion){
    this.serviceGestionProceso.registrar(gestionProceso).subscribe(resProceso=>{
      this.actualizarDetalleSolicitud(idDetalleSolicitud, informacion)
    })
  }

  public actualizarDetalleSolicitud(idDetalleSolicitud:number, informacion){
    let detalleSolicitud : DetalleSolicitud2 = new DetalleSolicitud2();
    this.servicioDetalleSolicitud.listarPorId(idDetalleSolicitud).subscribe(resDetalleSolicitud=>{
      detalleSolicitud.id = resDetalleSolicitud.id
      detalleSolicitud.cantidad = resDetalleSolicitud.cantidad
      detalleSolicitud.idArticulos = resDetalleSolicitud.idArticulos.id
      detalleSolicitud.idSolicitud = resDetalleSolicitud.idSolicitud.id
      detalleSolicitud.observacion = resDetalleSolicitud.observacion
      detalleSolicitud.valorTotal = resDetalleSolicitud.valorTotal
      detalleSolicitud.valorUnitario = resDetalleSolicitud.valorUnitario
      if(informacion == 'siquiere'){
        this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
          detalleSolicitud.idEstado = resEstado.id
          this.actualizarDetaSol(detalleSolicitud)
        })
      }else if(informacion == 'noquiere'){
        this.serviceEstado.listarPorId(56).subscribe(resEstado=>{
          detalleSolicitud.idEstado = resEstado.id
          this.actualizarDetaSol(detalleSolicitud)
        })
      }
    })
  }

  validar: boolean = false
  comentario: boolean = false
  public actualizarDetaSol(detalleSolicitud: DetalleSolicitud2){
    this.servicioModificar.actualizarDetalleSolicitud(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      this.servicioConsultasGenerales.listarDetalleSolicitud(detalleSolicitud.idSolicitud).subscribe(resDetalleSolici=>{
        resDetalleSolici.forEach(element => {
          if(element.idEstado == 28){
            this.validar = true
          }else{
            this.validar = false
          }
          if(element.idEstado == 54){
            this.comentario = true
          }else if(element.idEstado == 56){
            this.comentario = false
          }
          this.listaValidadas.push(this.validar)
          this.listaComentarios.push(this.comentario)
        });
        const existe = this.listaValidadas.includes( true )
        const comentarioVal = this.listaComentarios.includes( true )
        if (existe==false) {
          document.getElementById('snipper')?.setAttribute('style', 'display: block;')
          if(comentarioVal == true){
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
          }else{
            this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud)).subscribe(res => {
              let solicitud : Solicitud2 = new Solicitud2();
              solicitud.id = res.id
              this.fecha = new Date(res.fecha)
              this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
              solicitud.fecha = this.fecha
              solicitud.idUsuario = res.idUsuario.id
              this.serviceEstado.listarPorId(56).subscribe(resEstado=>{
                solicitud.idEstado = resEstado.id
                this.actualizarSolicitud(solicitud)
              })
            })
          }
        }else{
          this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud)).subscribe(res => {
            if(res.idEstado.id == 28){
              this.dialogRef.close();
              const dialogRef = this.dialog.open(ListadoObservacionComponent, {
                width: '1000px',
                data: {id:detalleSolicitud.idSolicitud}
              });
            }
          })
        }
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      if(solicitud.idEstado == 54){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se solicito comentarios',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(solicitud.idEstado == 56){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No se solicito comentarios',
          showConfirmButton: false,
          timer: 1500
        })
      }
      window.location.reload();
    })
  }

  aprobar:boolean = false
  public capturarOpcion(opcion: number){
    this.opcion = opcion
    this.aprobar = false
    if(this.opcion == 1){
      this.aprobar = true
      this.listaUsuarios()
    }else if(this.opcion == 2){
      this.aprobar = false
    }
  }

}
