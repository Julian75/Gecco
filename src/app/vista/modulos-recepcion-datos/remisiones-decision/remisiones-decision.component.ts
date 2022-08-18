import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { SolicitudSC2 } from 'src/app/modelos/modelos2/solicitudSC2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remisiones-decision',
  templateUrl: './remisiones-decision.component.html',
  styleUrls: ['./remisiones-decision.component.css']
})
export class RemisionesDecisionComponent implements OnInit {

  public solicitudSC: any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private servicioSolicitudSC: SolicitudSCService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    public remisionDecision: MatDialogRef<RemisionesDecisionComponent>,
  ) { }

  ngOnInit(): void {
  }

  public rechazar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.solicitudSC = this.data
    this.servicioSolicitudSC.listarPorId(this.solicitudSC.id).subscribe(resSolicitud=>{
      let solicitudSc : SolicitudSC2 = new SolicitudSC2();
      solicitudSc.id = resSolicitud.id
      solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
      var fechaActual = new Date(resSolicitud.fecha)
      fechaActual.setDate(fechaActual.getDate()+1)
      solicitudSc.fecha = fechaActual
      solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
      solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
      solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
      solicitudSc.incidente = resSolicitud.incidente
      solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
      solicitudSc.municipio = resSolicitud.municipio
      var fechavence = new Date(resSolicitud.vence)
      fechavence.setDate(fechavence.getDate()+1)
      solicitudSc.vence = fechavence
      solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
      this.servicioEstado.listarPorId(68).subscribe(resEstado=>{
        solicitudSc.idEstado = resEstado.id
        this.modificarSolicitudSc2(solicitudSc);
      })
    })
  }

  public aprobar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.solicitudSC = this.data
    this.servicioSolicitudSC.listarPorId(this.solicitudSC.id).subscribe(resSolicitud=>{
      let solicitudSc : SolicitudSC2 = new SolicitudSC2();
      solicitudSc.id = resSolicitud.id
      solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
      var fechaActual = new Date(resSolicitud.fecha)
      fechaActual.setDate(fechaActual.getDate()+1)
      solicitudSc.fecha = fechaActual
      solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
      solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
      solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
      solicitudSc.incidente = resSolicitud.incidente
      solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
      solicitudSc.municipio = resSolicitud.municipio
      var fechavence = new Date(resSolicitud.vence)
      fechavence.setDate(fechavence.getDate()+1)
      solicitudSc.vence = fechavence
      solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
      this.servicioEstado.listarPorId(67).subscribe(resEstado=>{
        solicitudSc.idEstado = resEstado.id
        this.modificarSolicitudSc2(solicitudSc);
      })
    })
  }

  public modificarSolicitudSc2(solicitudSc: SolicitudSC2){
    this.servicioModificar.actualizarSolicitudSC(solicitudSc).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      if(solicitudSc.idEstado == 68){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Aún no se ha logrado solucionar!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(solicitudSc.idEstado == 67){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha logrado solucionar!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.remisionDecision.close()
      window.location.reload();
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
      this.remisionDecision.close()
      window.location.reload();
    })
  }

}
