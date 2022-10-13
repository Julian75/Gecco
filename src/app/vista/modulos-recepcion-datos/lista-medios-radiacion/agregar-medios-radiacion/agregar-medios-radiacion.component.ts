import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { MediosRadiacionService } from 'src/app/servicios/medioRadiacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-medios-radiacion',
  templateUrl: './agregar-medios-radiacion.component.html',
  styleUrls: ['./agregar-medios-radiacion.component.css']
})
export class AgregarMediosRadiacionComponent implements OnInit {
  public formMedioRadiacion!: FormGroup;
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');
  constructor(
    private servicioMediosRadiacion: MediosRadiacionService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMediosRadiacionComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formMedioRadiacion = this.formBuilder.group({
      id: [''],
      descripcion: ['', [Validators.required]],
    });
  }
  guardar(){
    if(this.formMedioRadiacion.valid){
      this.servicioMediosRadiacion.registrar(this.formMedioRadiacion.value).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Medio de radiación guardado',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar el medio de radiación',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
