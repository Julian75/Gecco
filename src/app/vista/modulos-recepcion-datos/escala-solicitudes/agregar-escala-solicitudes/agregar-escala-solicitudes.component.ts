import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';

@Component({
  selector: 'app-agregar-escala-solicitudes',
  templateUrl: './agregar-escala-solicitudes.component.html',
  styleUrls: ['./agregar-escala-solicitudes.component.css']
})
export class AgregarEscalaSolicitudesComponent implements OnInit {
  public formTipoServicio!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioEscalaSolicitudes : EscalaSolicitudesService,
    public dialogRef: MatDialogRef<AgregarEscalaSolicitudesComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTipoServicio = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  public guardar(){
    if(this.formTipoServicio.valid){
      this.servicioEscalaSolicitudes.registrar(this.formTipoServicio.value).subscribe( data =>{
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close();
        window.location.reload();
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete los campos obligatorios',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
