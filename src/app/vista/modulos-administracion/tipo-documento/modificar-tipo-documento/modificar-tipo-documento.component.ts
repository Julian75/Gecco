import { TipoDocumento } from './../../../../modelos/tipoDocumento';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDocumentoService } from './../../../../servicios/tipoDocumento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-tipo-documento',
  templateUrl: './modificar-tipo-documento.component.html',
  styleUrls: ['./modificar-tipo-documento.component.css']
})
export class ModificarTipoDocumentoComponent implements OnInit {
  public formTipoDocumento!: FormGroup;
  color = ('primary');
  public idTipoDocumento: any;
  public listaTiposDocumentos: any = [];  // lista de modulos

  constructor(
    private servicioTipoDocumento: TipoDocumentoService,
    public dialogRef: MatDialogRef<ModificarTipoDocumentoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoDocumento();
  }

  private crearFormulario() {
    this.formTipoDocumento = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listarporidTipoDocumento() {
    this.idTipoDocumento = this.data;
    this.servicioTipoDocumento.listarPorId(this.idTipoDocumento).subscribe(res => {
      this.listaTiposDocumentos = res;
      this.formTipoDocumento.controls['id'].setValue(this.listaTiposDocumentos.id);
      this.formTipoDocumento.controls['descripcion'].setValue(this.listaTiposDocumentos.descripcion);
    })
  }

  public guardar() {
    let tipoDocumento : TipoDocumento = new TipoDocumento();
    tipoDocumento.id=Number(this.data);
    tipoDocumento.descripcion=this.formTipoDocumento.controls['descripcion'].value;
    if(tipoDocumento.descripcion==null || tipoDocumento.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.actualizarTipoDocumento(tipoDocumento);
    }
  }

  public actualizarTipoDocumento(tipoDocumento: TipoDocumento) {
    this.servicioTipoDocumento.actualizar(tipoDocumento).subscribe(res => {
      console.log("Tipo Documento actualizado")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Documento modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }

}
