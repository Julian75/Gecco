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

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<ProcesoComponent>,
    public dialogRef2: MatDialogRef<ListadoObservacionComponent>,
    public pasos: MatDialogRef<PasosComponent>,
    private serviceProceso: ProcesoService,
    private serviceEstado: EstadoService,
    private serviceGestionProceso: GestionProcesoService,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
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

  public guardar(){
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
              gestionProceso.idProceso = element
              gestionProceso.idDetalleSolicitud = this.listaDetalleSolicitud
              this.serviceEstado.listarPorId(50).subscribe(resEstado=>{
                gestionProceso.idEstado = resEstado
                this.registrarGestionProceso(gestionProceso, this.listaDetalleSolicitud.id, "siquiere")
              })
            }
          });
        })
      }
    }else if(this.opcion == 2){
      console.log("holis")
      this.actualizarDetalleSolicitud(this.listaDetalleSolicitud.id, "noquiere")
    }
  }

  public registrarGestionProceso(gestionProceso: GestionProceso, idDetalleSolicitud, informacion){
    this.serviceGestionProceso.registrar(gestionProceso).subscribe(resProceso=>{
      this.actualizarDetalleSolicitud(idDetalleSolicitud, informacion)
    })
  }

  public actualizarDetalleSolicitud(idDetalleSolicitud:number, informacion){
    console.log(informacion)
    let detalleSolicitud : DetalleSolicitud = new DetalleSolicitud();
    this.servicioDetalleSolicitud.listarPorId(idDetalleSolicitud).subscribe(resDetalleSolicitud=>{
      detalleSolicitud.id = resDetalleSolicitud.id
      detalleSolicitud.cantidad = resDetalleSolicitud.cantidad
      detalleSolicitud.idArticulos = resDetalleSolicitud.idArticulos
      detalleSolicitud.idSolicitud = resDetalleSolicitud.idSolicitud
      detalleSolicitud.observacion = resDetalleSolicitud.observacion
      detalleSolicitud.valorTotal = resDetalleSolicitud.valorTotal
      detalleSolicitud.valorUnitario = resDetalleSolicitud.valorUnitario
      if(informacion == 'siquiere'){
        this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
          detalleSolicitud.idEstado = resEstado
          this.actualizarDetaSol(detalleSolicitud)
        })
      }else if(informacion == 'noquiere'){
        this.serviceEstado.listarPorId(56).subscribe(resEstado=>{
          detalleSolicitud.idEstado = resEstado
          this.actualizarDetaSol(detalleSolicitud)
        })
      }
    })
  }

  validar: boolean = false
  comentario: boolean = false
  public actualizarDetaSol(detalleSolicitud: DetalleSolicitud){
    this.servicioDetalleSolicitud.actualizar(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      this.servicioDetalleSolicitud.listarTodos().subscribe(resDetalleSolicitud=>{
        resDetalleSolicitud.forEach(element => {
          if(element.idSolicitud.id == detalleSolicitud.idSolicitud.id){
            this.listaDetalleSolicitudes.push(element)
          }
        });
        this.listaDetalleSolicitudes.forEach(element => {
          if(element.idEstado.id == 28){
            this.validar = true
          }else{
            this.validar = false
          }
          if(element.idEstado.id == 54){
            this.comentario = true
          }else if(element.idEstado.id == 56){
            this.comentario = false
          }
          this.listaValidadas.push(this.validar)
          this.listaComentarios.push(this.comentario)
        });
        const existe = this.listaValidadas.includes( true )
        const comentarioVal = this.listaComentarios.includes( true )
        if (existe==false) {
          if(comentarioVal == true){
            this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud.id)).subscribe(res => {
              let solicitud : Solicitud = new Solicitud();
              solicitud.id = res.id
              solicitud.fecha = res.fecha
              solicitud.idUsuario = res.idUsuario
              this.serviceEstado.listarPorId(54).subscribe(resEstado=>{
                solicitud.idEstado = resEstado
                this.actualizarSolicitud(solicitud)
              })
            })
          }else{
            this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud.id)).subscribe(res => {
              let solicitud : Solicitud = new Solicitud();
              solicitud.id = res.id
              solicitud.fecha = res.fecha
              solicitud.idUsuario = res.idUsuario
              this.serviceEstado.listarPorId(56).subscribe(resEstado=>{
                solicitud.idEstado = resEstado
                this.actualizarSolicitud(solicitud)
              })
            })
          }
        }else{
          this.servicioSolicitud.listarPorId(Number(detalleSolicitud.idSolicitud.id)).subscribe(res => {
            if(res.idEstado.id == 28){
              const dialogRef = this.dialog.open(ListadoObservacionComponent, {
                width: '1000px',
                data: {id:detalleSolicitud.idSolicitud.id}
              });
            }
          })
        }

      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud){
    this.servicioSolicitud.actualizar(solicitud).subscribe(resSolicitud=>{
      if(solicitud.idEstado.id == 54){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se solicito comentarios',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(solicitud.idEstado.id == 56){
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
