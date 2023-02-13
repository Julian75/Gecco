import { AsignarTurno } from './../../../../modelos/asignarTurno';
import { ModificarService } from './../../../../servicios/modificar.service';
import { AsignarTurnoService } from './../../../../servicios/asignarTurno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-porcentaje-turno',
  templateUrl: './modificar-porcentaje-turno.component.html',
  styleUrls: ['./modificar-porcentaje-turno.component.css']
})
export class ModificarPorcentajeTurnoComponent implements OnInit {

  public formPorcentaje!: FormGroup;
  public TurnoAsignado: any = [];
  color = ('primary');

  constructor(
    private servicioAsignarTurno: AsignarTurnoService,
    private servicioModificar: ModificarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModificarPorcentajeTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.establecerValor();
  }

  private crearFormulario() {
    this.formPorcentaje = this.fb.group({
      id: [''],
      porcentaje: [null,Validators.required],
    });
  }

  public guardar(){
    this.TurnoAsignado = this.data
    document.getElementById("snipper2").setAttribute("style", "display: block")
    var porcentaje = this.formPorcentaje.controls['porcentaje'].value
    if(porcentaje == null || porcentaje == undefined){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo no puede estar vacio!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper2").setAttribute("style", "display: none")
    }else if(porcentaje == 0 || porcentaje > 100){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El valor digitado no es valido tiene que estar ente 1 y 100!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper2").setAttribute("style", "display: none")
    }else if(porcentaje == this.TurnoAsignado.porcentaje){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No hubieron cambio!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper2").setAttribute("style", "display: none")
      this.dialogRef.close();
    }else{
      let asignarTurno : AsignarTurno = new AsignarTurno();
      asignarTurno.id = this.TurnoAsignado.id
      asignarTurno.idEstado = this.TurnoAsignado.idEstado.id
      asignarTurno.idOficina = this.TurnoAsignado.idOficina
      asignarTurno.idSitioVenta = this.TurnoAsignado.idSitioVenta
      asignarTurno.idTurnos = this.TurnoAsignado.idTurnos.id
      asignarTurno.nombreOficina = this.TurnoAsignado.nombreOficina
      asignarTurno.nombreSitioVenta = this.TurnoAsignado.nombreSitioVenta
      asignarTurno.porcentaje = porcentaje
      this.modificarAsignarTurno(asignarTurno);
    }
  }

  public modificarAsignarTurno(asignarTurno){
    this.servicioModificar.actualizarAsignarTurnoPuntoVenta(asignarTurno).subscribe(resAsignarTurno=>{
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Se modifico correctamente el porcentaje!",
          showConfirmButton: false,
          timer: 2500
      })
      document.getElementById("snipper2").setAttribute("style", "display: none")
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar el porcentaje!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper2").setAttribute("style", "display: none")
      window.location.reload();
    })
  }

  public establecerValor(){
    this.TurnoAsignado = this.data
    this.formPorcentaje.controls['porcentaje'].setValue(this.TurnoAsignado.porcentaje)
  }

  public cerrarModal(){
    this.dialogRef.close();
  }
}
