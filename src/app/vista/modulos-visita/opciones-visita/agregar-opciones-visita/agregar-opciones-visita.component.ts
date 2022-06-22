import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpcionesVisitaService } from 'src/app/servicios/opcionesVisita.service';
import Swal from 'sweetalert2';
import { opcionesVisita } from 'src/app/modelos/opcionesVisita';

@Component({
  selector: 'app-agregar-opciones-visita',
  templateUrl: './agregar-opciones-visita.component.html',
  styleUrls: ['./agregar-opciones-visita.component.css']
})
export class AgregarOpcionesVisitaComponent implements OnInit {
  public formOpcionVisita!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarOpcionesVisitaComponent>,
    private servicioOpcion: OpcionesVisitaService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formOpcionVisita = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  public guardar(){
    let opcionVisita : opcionesVisita = new opcionesVisita();
    opcionVisita.descripcion = this.formOpcionVisita.value.descripcion;
    this.servicioOpcion.registrar(opcionVisita).subscribe( res => {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Se registro correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.dialogRef.close();
        }
      }
      );
    })
  }
}
