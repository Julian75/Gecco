import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-agregar-configuracion',
  templateUrl: './agregar-configuracion.component.html',
  styleUrls: ['./agregar-configuracion.component.css']
})
export class AgregarConfiguracionComponent implements OnInit {
  public formConfiguracion!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioConfiguracion: ConfiguracionService,
    public dialogRef: MatDialogRef<AgregarConfiguracionComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formConfiguracion = this.fb.group({
      id:0,
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  public guardar(){
    this.servicioConfiguracion.registrar(this.formConfiguracion.value).subscribe( res => {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Se registro correctamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.value) {
          this.dialogRef.close();
          window.location.reload();
        }
      });
    })

  }
}
