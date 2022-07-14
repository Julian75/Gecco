import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { EliminacionTurnoVendedor } from './../../../../modelos/eliminacionTurnoVendedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EliminacionTurnoVendedorService } from 'src/app/servicios/EliminacionTurnoVendedor.service';
import Swal from 'sweetalert2';
import { AsignarTurnoVendedor } from 'src/app/modelos/asignarTurnoVendedor';

@Component({
  selector: 'app-solicitud-eliminar-turno-vendedor',
  templateUrl: './solicitud-eliminar-turno-vendedor.component.html',
  styleUrls: ['./solicitud-eliminar-turno-vendedor.component.css']
})
export class SolicitudEliminarTurnoVendedorComponent implements OnInit {

  public formSolicitudTurnoVendedor!: FormGroup;
  public id:any;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public servicioUsuario: UsuarioService,
    public servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    public servicioEliminacion: EliminacionTurnoVendedorService,
    public dialogRef: MatDialogRef<SolicitudEliminarTurnoVendedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario(){
    this.formSolicitudTurnoVendedor = this.fb.group({
      id:0,
      observacion: ['', Validators.required],
    });
  }

  public guardar(){
    let eliminacionTurnVen : EliminacionTurnoVendedor = new EliminacionTurnoVendedor();
    const observacion = this.formSolicitudTurnoVendedor.controls['observacion'].value;
    if (observacion != null || observacion != "") {
      eliminacionTurnVen.observacion = observacion
      eliminacionTurnVen.estado = "Pendiente"
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(res => {
        eliminacionTurnVen.idUsuario = res
        this.servicioAsignarTurnoVendedor.listarPorId(Number(this.data)).subscribe(res => {
          eliminacionTurnVen.idAsignarTurnoVendedor = res
          this.registrarEliminacion(eliminacionTurnVen)
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campo Vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarEliminacion(eliminacionTurnoVendedor: EliminacionTurnoVendedor){
    this.servicioEliminacion.registrar(eliminacionTurnoVendedor).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha solicitado el permiso para la eliminacion!',
        showConfirmButton: false,
        timer: 1500
      })
      this.actualizarAsignarTurnoVendedor(eliminacionTurnoVendedor.idAsignarTurnoVendedor.id)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public actualizarAsignarTurnoVendedor(id: number){
    let asignarTurnoVendedor : AsignarTurnoVendedor = new AsignarTurnoVendedor();
    this.servicioAsignarTurnoVendedor.listarPorId(id).subscribe(res => {
      asignarTurnoVendedor.id = id
      asignarTurnoVendedor.fechaFinal = res.fechaFinal
      asignarTurnoVendedor.fechaInicio = res.fechaInicio
      asignarTurnoVendedor.idOficina = res.idOficina
      asignarTurnoVendedor.idSitioVenta = res.idSitioVenta
      asignarTurnoVendedor.idTurno = res.idTurno
      asignarTurnoVendedor.idVendedor = res.idVendedor
      asignarTurnoVendedor.ideSubzona = res.ideSubzona
      asignarTurnoVendedor.nombreOficina = res.nombreOficina
      asignarTurnoVendedor.nombreSitioVenta = res.nombreSitioVenta
      asignarTurnoVendedor.nombreVendedor = res.nombreVendedor
      asignarTurnoVendedor.estado = "Pendiente"
      this.actualizadoAsignarTurnoVendedor(asignarTurnoVendedor)
    })
  }

  public actualizadoAsignarTurnoVendedor(asignarTurnoVendedor: AsignarTurnoVendedor){
    this.servicioAsignarTurnoVendedor.actualizar(asignarTurnoVendedor).subscribe(res => {
      window.location.reload();
      this.crearFormulario()
    });
  }
}
