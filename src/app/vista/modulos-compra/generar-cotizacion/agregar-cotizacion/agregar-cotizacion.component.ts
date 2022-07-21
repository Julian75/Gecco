import { Solicitud } from './../../../../modelos/solicitud';
import { CotizacionService } from './../../../../servicios/cotizacion.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from './../../../../servicios/estado.service';
import { Cotizacion } from './../../../../modelos/cotizacion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrls: ['./agregar-cotizacion.component.css']
})
export class AgregarCotizacionComponent implements OnInit {

  color = ('primary');
  public formCotizacion!: FormGroup;

  constructor(
    private servicioEstado : EstadoService,
    private fb: FormBuilder,
    private servicioSolicitud : SolicitudService,
    private servicioCotizacion : CotizacionService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<AgregarCotizacionComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario() {
    this.formCotizacion = this.fb.group({
      id: 0,
      estado: [null,Validators.required],
      archivoPDF: [null,Validators.required],
      solicitud: [null,Validators.required],
    });
  }

  public guardar(){
    let cotizacion : Cotizacion = new Cotizacion();
    cotizacion.archivoPdf = "nel"
    this.servicioEstado.listarPorId(31).subscribe(resEstado=>{
      cotizacion.idEstado = resEstado
      this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        cotizacion.idSolicitud = resSolicitud
        this.registrarCotizacion(cotizacion, cotizacion.idSolicitud)
      })
    })
  }

  public registrarCotizacion(cotizacion: Cotizacion, idSolicitud:any){
    this.servicioCotizacion.registrar(cotizacion).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cotización Registrada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.actualizarSolicitud(idSolicitud)
      this.dialogRef.close();
      window.location.reload();

    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public actualizarSolicitud(idSolicitud: any){
    let solicitud : Solicitud = new Solicitud();
    solicitud.id=Number(idSolicitud.id);
    this.servicioSolicitud.listarPorId(solicitud.id).subscribe(resSolicitud=>{
      solicitud.fecha = resSolicitud.fecha
      solicitud.idUsuario = resSolicitud.idUsuario
      this.servicioEstado.listarPorId(31).subscribe(resEstado=>{
        solicitud.idEstado = resEstado
        this.actualizarSolic(solicitud)
      })
    })
  }

  public actualizarSolic(solicitud: Solicitud){
    this.servicioSolicitud.actualizar(solicitud).subscribe(res => {
      console.log("Se modifico.")
    }, error => {
      console.log("No se modifico")
    });
  }

}
