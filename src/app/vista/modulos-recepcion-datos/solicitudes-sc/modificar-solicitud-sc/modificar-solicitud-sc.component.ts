import { SolicitudSC2 } from './../../../../modelos/modelos2/solicitudSC2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModificarService } from './../../../../servicios/modificar.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { SolicitudSCService } from './../../../../servicios/solicitudSC.service';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-solicitud-sc',
  templateUrl: './modificar-solicitud-sc.component.html',
  styleUrls: ['./modificar-solicitud-sc.component.css']
})
export class ModificarSolicitudScComponent implements OnInit {

  public fecha: Date = new Date;
  public formSolicitud!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicioSolicitudSc: SolicitudSCService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public prorroga: MatDialogRef<ModificarSolicitudScComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      incidente: [null,Validators.required]
    });
  }

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var incidente = this.formSolicitud.controls['incidente'].value;
    if(incidente == "" || incidente == null){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      let solicitudSc : SolicitudSC2 = new SolicitudSC2();
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        solicitudSc.id = resSolicitud.id
        console.log(resSolicitud)
        var fechaActual = new Date(resSolicitud.fecha)
        fechaActual.setDate(fechaActual.getDate()+1)
        solicitudSc.fecha = fechaActual
        var fechavence = new Date(resSolicitud.vence)
        fechavence.setDate(fechavence.getDate()+1)
        solicitudSc.vence = fechavence
        solicitudSc.municipio = resSolicitud.municipio
        solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
        solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
        solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
        solicitudSc.prorroga = resSolicitud.prorroga
        solicitudSc.personaAfectada = resSolicitud.personaAfectada
        solicitudSc.personaInvolucrada = resSolicitud.personaInvolucrada
        solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
        solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
        solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
        solicitudSc.incidente = incidente
        solicitudSc.idEstado = resSolicitud.idEstado.id
        this.modificarSolicitudSc(solicitudSc);
      })
    }
  }

  public modificarSolicitudSc(solicitud: SolicitudSC2){
    this.servicioModificar.actualizarSolicitudSC(solicitud).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agrego el incidente!',
        showConfirmButton: false,
        timer: 1500
      })
      this.prorroga.close();
      window.location.reload();
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar el incidente!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
