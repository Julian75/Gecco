import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { Configuracion } from 'src/app/modelos/configuracion';

@Component({
  selector: 'app-modificar-tabla-configuracion',
  templateUrl: './modificar-tabla-configuracion.component.html',
  styleUrls: ['./modificar-tabla-configuracion.component.css']
})
export class ModificarTablaConfiguracionComponent implements OnInit {

  public formConfiguracion!: FormGroup;
  public id:any;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private servicioConfiguracion: ConfiguracionService,
    public dialogRef: MatDialogRef<ModificarTablaConfiguracionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidConfiguracion();
  }

  private crearFormulario(){
    this.formConfiguracion = this.fb.group({
      id:[''],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  public listarporidConfiguracion() {
    this.id = this.data;
    console.log(this.id);
    this.servicioConfiguracion.listarPorId(this.id).subscribe(res => {
      this.formConfiguracion.setValue(res);
    })
  }

  public guardar(){
    let configuracion : Configuracion = new Configuracion();
    configuracion.id=Number(this.data);
    const descripcion = this.formConfiguracion.controls['descripcion'].value;
    const nombre = this.formConfiguracion.controls['nombre'].value;
    const valor = this.formConfiguracion.controls['valor'].value;
    this.servicioConfiguracion.listarPorId(configuracion.id).subscribe(res=>{
      if(descripcion == res.descripcion && nombre == res.nombre && valor == res.valor){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hubieron cambios!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(descripcion==null || descripcion=="" || nombre==null || nombre=="" || valor==null || valor==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.servicioConfiguracion.actualizar(this.formConfiguracion.value).subscribe(
          (data) => {
            Swal.fire({
              title: 'Configuración modificada',
              text: 'La configuración se modificó correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.dialogRef.close();
                window.location.reload();
              }
            }
            );
          }
        );
      }
    })
  }
}
