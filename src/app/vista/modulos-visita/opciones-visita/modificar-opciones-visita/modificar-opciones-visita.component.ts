import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OpcionesVisitaService } from './../../../../servicios/opcionesVisita.service';
import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-opciones-visita',
  templateUrl: './modificar-opciones-visita.component.html',
  styleUrls: ['./modificar-opciones-visita.component.css']
})
export class ModificarOpcionesVisitaComponent implements OnInit {
  public formOpcionVisita!: FormGroup;
  color = ('primary');
  public idOpcion :any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioOpcionVisita: OpcionesVisitaService,
    public dialogRef: MatDialogRef<ModificarOpcionesVisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaridOpcionesVisita();
  }
  private crearFormulario() {
    this.formOpcionVisita = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listaridOpcionesVisita(){
    this.idOpcion = this.data
    this.servicioOpcionVisita.listarPorId(this.idOpcion).subscribe(res => {
      this.formOpcionVisita.setValue(res);
    })
  }

  public guardar(){
    let opcionVisita : OpcionesVisita = new OpcionesVisita();
    opcionVisita.id = this.formOpcionVisita.value.id;
    opcionVisita.descripcion = this.formOpcionVisita.value.descripcion;
    this.servicioOpcionVisita.actualizar(opcionVisita).subscribe(res => {
      Swal.fire({
        title: 'Actualizado',
        text: 'Se actualizó correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.dialogRef.close();
        }
      })
    })
  }
}
