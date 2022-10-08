import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';
import { TipoNecesidad } from 'src/app/modelos/tipoNecesidad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-necesidades',
  templateUrl: './agregar-tipo-necesidades.component.html',
  styleUrls: ['./agregar-tipo-necesidades.component.css']
})
export class AgregarTipoNecesidadesComponent implements OnInit {

  public formTipoNecesidad!: FormGroup;
  public listarTipoNecesidad: any = [];
  color = ('primary')

  constructor(
    private fb: FormBuilder,
    private servicioTipoNecesidad: TipoNecesidadService,
    public dialogRef: MatDialogRef<AgregarTipoNecesidadesComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public idModulo: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formTipoNecesidad = this.fb.group({
      id: 0,
      descripcion: [null, Validators.required],
    });
  }

  public guardar(){
    let tipoNecesidad : TipoNecesidad = new TipoNecesidad();
    const campo = this.formTipoNecesidad.controls['descripcion'].value
    tipoNecesidad.descripcion = campo;
    this.servicioTipoNecesidad.listarTodos().subscribe(res => {
      this.listarTipoNecesidad = res;
      if(campo == null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo no puede estar vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        for (let i = 0; i < this.listarTipoNecesidad.length; i++) {
          if (this.listarTipoNecesidad[i].descripcion.toLowerCase() == campo.toLowerCase()) {
            Swal.fire({
              icon: 'error',
              title: 'Tipo de Necesidad Existente',
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload();
          }
        }
        this.servicioTipoNecesidad.registrar(tipoNecesidad).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Tipo de Necesidad Registrada',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        });
      }
    });
  }
}
