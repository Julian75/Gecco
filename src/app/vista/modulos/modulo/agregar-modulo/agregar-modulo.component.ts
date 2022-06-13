import { Modulo } from './../../../../modelos/modulo';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from 'src/app/servicios/modulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-modulo',
  templateUrl: './agregar-modulo.component.html',
  styleUrls: ['./agregar-modulo.component.css']
})
export class AgregarModuloComponent implements OnInit {
  public formModulo!: FormGroup;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarModuloComponent>,
    private servicioModulo: ModuloService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formModulo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  public guardar() {
    let modulo : Modulo = new Modulo();
    modulo.descripcion=this.formModulo.controls['descripcion'].value;
    if(modulo.descripcion==null || modulo.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.registrarModulo(modulo);
    }
  }

  public registrarModulo(modulo: Modulo) {
    this.servicioModulo.registrar(modulo).subscribe(res=>{
      console.log(modulo)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modulo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();

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
