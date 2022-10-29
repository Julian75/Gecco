import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SolicitudSC2 } from 'src/app/modelos/modelos2/solicitudSC2';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-prorroga',
  templateUrl: './prorroga.component.html',
  styleUrls: ['./prorroga.component.css']
})
export class ProrrogaComponent implements OnInit {

  public fecha: Date = new Date;
  public formSolicitud!: FormGroup;
  public fechaActual: any;

  constructor(
    private fb: FormBuilder,
    private servicioSolicitudSc: SolicitudSCService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public prorroga: MatDialogRef<ProrrogaComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      vence: [null,Validators.required]
    });
  }

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var vencimiento = this.formSolicitud.controls['vence'].value;
    var fechaVencimiento = new Date(vencimiento)
    this.fechaActual = this.fecha.getFullYear() + "-"+ (this.fecha.getMonth()+1)+ "-" +this.fecha.getDate();
    var fechaVencimiento2 = fechaVencimiento.getFullYear() + "-"+ (fechaVencimiento.getMonth()+1)+ "-" +(fechaVencimiento.getDate()+1);
    if(vencimiento == null){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
      this.prorroga.close();
      window.location.reload();
    }else{
      if (new Date(fechaVencimiento2) < new Date(this.fechaActual)) {
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'La fecha de vencimiento no puede ser menor a la fecha actual!',
          showConfirmButton: false,
          timer: 2500
        })
        this.prorroga.close();
        window.location.reload();
      }else{
        let solicitudSc : SolicitudSC2 = new SolicitudSC2();
        this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
          solicitudSc.id = resSolicitud.id
          var fechaActual = new Date(resSolicitud.fecha)
          fechaActual.setDate(fechaActual.getDate()+1)
          solicitudSc.fecha = fechaActual
          solicitudSc.vence = new Date(fechaVencimiento2)
          solicitudSc.municipio = resSolicitud.municipio
          solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
          solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
          solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
          solicitudSc.prorroga = "Si"
          solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
          solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
          solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
          solicitudSc.personaAfectada = resSolicitud.personaAfectada
          solicitudSc.personaInvolucrada = resSolicitud.personaInvolucrada
          solicitudSc.incidente = resSolicitud.incidente
          solicitudSc.idEstado = resSolicitud.idEstado.id
          this.modificarSolicitudSc(solicitudSc);
        })
      }
    }
  }

  public modificarSolicitudSc(solicitud: SolicitudSC2){
    this.servicioModificar.actualizarSolicitudSC(solicitud).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Prorroga Realizada!',
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
        title: 'Hubo un error al realizar la prorrogae!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
