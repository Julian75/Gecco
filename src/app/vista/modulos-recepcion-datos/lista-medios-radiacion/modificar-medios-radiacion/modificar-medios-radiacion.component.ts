import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MediosRadiacionService } from 'src/app/servicios/medioRadiacion.service';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-medios-radiacion',
  templateUrl: './modificar-medios-radiacion.component.html',
  styleUrls: ['./modificar-medios-radiacion.component.css']
})
export class ModificarMediosRadiacionComponent implements OnInit {
  public formMedioRadiacion!: FormGroup;
  color = ('primary');
  constructor(
    public dialogRef: MatDialogRef<ModificarMediosRadiacionComponent>,
    private servicioMediosRadiacion: MediosRadiacionService,
    private servicioModificar: ModificarService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,

  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidMediosRadiacion();
  }

  crearFormulario(){
    this.formMedioRadiacion = this.fb.group({
      id: [this.data],
      descripcion: ['', Validators.required],
    })
  }

  listarporidMediosRadiacion(){
    this.servicioMediosRadiacion.listarPorId(Number(this.data)).subscribe(
      (data) => {
        this.formMedioRadiacion.setValue({
          id: data.id,
          descripcion: data.descripcion,
        })
      }
    )
  }
  guardar(){
    if(this.formMedioRadiacion.valid){
      console.log(this.formMedioRadiacion.value);
      this.servicioModificar.actualizarMediosRadiacion(this.formMedioRadiacion.value).subscribe(
        (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Medio de radiación modificado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
        }
      )
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos vacíos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
