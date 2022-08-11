import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
@Component({
  selector: 'app-agregar-motivo-solicitud',
  templateUrl: './agregar-motivo-solicitud.component.html',
  styleUrls: ['./agregar-motivo-solicitud.component.css']
})
export class AgregarMotivoSolicitudComponent implements OnInit {
  public formMotivoSolicitud!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioMotivoSolicitud : MotivoSolicitudService,
    public dialogRef: MatDialogRef<AgregarMotivoSolicitudComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formMotivoSolicitud = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  public guardar(){
    if(this.formMotivoSolicitud.valid){
      this.servicioMotivoSolicitud.registrar(this.formMotivoSolicitud.value).subscribe( data =>{
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
