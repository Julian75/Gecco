import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventarioService } from 'src/app/servicios/inventario.service';

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
    public dialogRef: MatDialogRef<InformacionDetalladaActivosComponent>,
    private servicioInventario: InventarioService,
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
      marca: [null,Validators.required],
      placa: [null,Validators.required],
      serial: [null,Validators.required],
      categoria: [null,Validators.required],
    });
  }

  public llenarDatos(){
    this.datos = this.data
    this.servicioInventario.listarPorId(this.datos.id).subscribe(resInventario=>{
      this.formInfo.controls['activo'].setValue(resInventario.idDetalleArticulo.idArticulo.descripcion);
      this.formInfo.controls['marca'].setValue(resInventario.idDetalleArticulo.marca);
      this.formInfo.controls['placa'].setValue(resInventario.idDetalleArticulo.placa);
      this.formInfo.controls['serial'].setValue(resInventario.idDetalleArticulo.serial);
      this.formInfo.controls['categoria'].setValue(resInventario.idDetalleArticulo.idArticulo.idCategoria.descripcion);
    })
  }

  public guardar(){
    localStorage.setItem("valido", "true")
    this.dialogRef.close();
  }
}
