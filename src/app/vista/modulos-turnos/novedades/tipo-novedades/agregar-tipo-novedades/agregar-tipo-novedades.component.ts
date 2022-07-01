import { TipoNovedades } from './../../../../../modelos/tipoNovedades';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoNovedadesService } from 'src/app/servicios/tipoNovedades.Service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-tipo-novedades',
  templateUrl: './agregar-tipo-novedades.component.html',
  styleUrls: ['./agregar-tipo-novedades.component.css']
})
export class AgregarTipoNovedadesComponent implements OnInit {
  public formTipoNovedades!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTipoNovedadesComponent>,
    private servicioTipoNovedades: TipoNovedadesService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.formTipoNovedades = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  public guardar() {
    let tipoNovedades : TipoNovedades = new TipoNovedades();
    tipoNovedades.descripcion=this.formTipoNovedades.controls['descripcion'].value;
    tipoNovedades.observacion=this.formTipoNovedades.controls['observacion'].value;
    if(tipoNovedades.descripcion==null && tipoNovedades.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.registrarTipoNovedades(tipoNovedades);
    }

  }

  public registrarTipoNovedades(tipoNovedades: TipoNovedades) {
    this.servicioTipoNovedades.registrar(tipoNovedades).subscribe(res=>{
      console.log(tipoNovedades)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Novedad Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
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

}
