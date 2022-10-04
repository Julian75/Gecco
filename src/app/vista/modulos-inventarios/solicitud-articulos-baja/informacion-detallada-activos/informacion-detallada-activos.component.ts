import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-informacion-detallada-activos',
  templateUrl: './informacion-detallada-activos.component.html',
  styleUrls: ['./informacion-detallada-activos.component.css']
})
export class InformacionDetalladaActivosComponent implements OnInit {

  public formInfo!: FormGroup;
  public datos:any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.llenarDatos();
  }

  private crearFormulario() {
    this.formInfo = this.fb.group({
      id: 0,
      activo: [null,Validators.required],
      codigo: [null,Validators.required],
      marca: [null,Validators.required],
      placa: [null,Validators.required],
      serial: [null,Validators.required],
      categoria: [null,Validators.required],
    });
  }

  public llenarDatos(){
    console.log(this.data)
    this.datos = this.data
    this.formInfo.controls['activo'].setValue(this.datos.id_articulo.descripcion);
    this.formInfo.controls['codigo'].setValue(this.datos.idDetalleArticulo.codigoUnico);
    this.formInfo.controls['marca'].setValue(this.datos.idDetalleArticulo.marca);
    this.formInfo.controls['placa'].setValue(this.datos.idDetalleArticulo.placa);
    this.formInfo.controls['serial'].setValue(this.datos.idDetalleArticulo.serial);
    this.formInfo.controls['categoria'].setValue(this.datos.id_articulo.idCategoria.descripcion);
  }

  public guardar(){
    
  }
}
