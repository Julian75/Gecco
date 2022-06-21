import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Jerarquia } from './../../../../modelos/jerarquia';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-jerarquia',
  templateUrl: './agregar-jerarquia.component.html',
  styleUrls: ['./agregar-jerarquia.component.css']
})
export class AgregarJerarquiaComponent implements OnInit {
  public formJerarquia!: FormGroup;
  public listarJerarquia: any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioJerarquia: JerarquiaService,
    public dialogRef: MatDialogRef<AgregarJerarquiaComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public idModulo: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTodos();
  }

  private crearFormulario(){
    this.formJerarquia = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }
  public listarTodos(){
    this.servicioJerarquia.listarTodos().subscribe(res => {
      this.listarJerarquia = res;
    });
  }
  public guardar(){
    let jerarquia : Jerarquia = new Jerarquia();
    const campo = this.formJerarquia.controls['descripcion'].value
    jerarquia.descripcion = campo;
    this.servicioJerarquia.listarTodos().subscribe(res => {
      this.listarJerarquia = res;
      for (let i = 0; i < this.listarJerarquia.length; i++) {
        if (this.listarJerarquia[i].descripcion == campo) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La jerarquia ya existe',
          });
          return;
        }
      }
      this.servicioJerarquia.registrar(jerarquia).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'La jerarquia '+jerarquia.descripcion+' se guardo correctamente',
        });
        this.dialogRef.close();
      });
    });
  }
}
    // if(jerarquia.descripcion == null || jerarquia.descripcion == "" ){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Debe ingresar una descripcion válida',
    //   })
    // }else{
    //   this.servicioJerarquia.registrar(jerarquia).subscribe(res => {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Guardado',
    //       text: 'La jerarquia '+jerarquia.descripcion+' se guardo correctamente',
    //     })
    //     this.dialogRef.close();
    //   })
    // }

