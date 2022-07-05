import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ElementosVisitaService } from 'src/app/servicios/ElementosVisita.service';
@Component({
  selector: 'app-modificar-elementos-visita',
  templateUrl: './modificar-elementos-visita.component.html',
  styleUrls: ['./modificar-elementos-visita.component.css']
})
export class ModificarElementosVisitaComponent implements OnInit {
  public formElementoVisita!: FormGroup;
  color = ('primary');
  public idElementoVisita: any;

  constructor(
    public dialogRef: MatDialogRef<ModificarElementosVisitaComponent>,
    private fb: FormBuilder,
    private servicioElementoVisita: ElementosVisitaService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPorIdElementos();
  }
  private crearFormulario(){
    this.formElementoVisita = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
    });
  }
  public listarPorIdElementos(){
    this.idElementoVisita = this.data;
    this.servicioElementoVisita.listarPorId(this.idElementoVisita).subscribe(res => {
      this.formElementoVisita.setValue(res);
    })

  }
  public guardar(){
    if (this.formElementoVisita.valid) {
      this.servicioElementoVisita.registrar(this.formElementoVisita.value).subscribe(res => {
        Swal.fire({
          title: 'Modificado',
          text: 'Se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
            this.dialogRef.close();
            window.location.reload();
          }
        })
      }
      )
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Faltan datos',
        icon: 'error',
        confirmButtonText: 'Ok'
      }
      )
    }

  }
}
