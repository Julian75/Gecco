import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuloService } from './../../../../../servicios/modulo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AgregarEstadoComponent } from '../agregar-estado/agregar-estado.component';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Estado } from 'src/app/modelos/estado';
@Component({
  selector: 'app-modificar-estado',
  templateUrl: './modificar-estado.component.html',
  styleUrls: ['./modificar-estado.component.css']
})
export class ModificarEstadoComponent implements OnInit {
   public formEstado!: FormGroup;
   public idEstado : any;
   public listarModulo: any = [];
   public listarEstadosModulo: any = [];
   color = ('primary');
  constructor(
     private fb: FormBuilder,
     private servicioModulo: ModuloService,
     public dialogRef: MatDialogRef<AgregarEstadoComponent>,
     private servicioEstado : EstadoService,
     private route: ActivatedRoute,
     @Inject(MAT_DIALOG_DATA) public estado: MatDialog,
  ) { }

  ngOnInit(): void {this.crearFormulario();
    this.listarporidEstado();
    this.listaModulo();
  }

  private crearFormulario() {
    this.formEstado = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      modulo: [null,Validators.required],
    });
  }

  public listaModulo() {
    this.servicioModulo.listarTodos().subscribe(res => {
      this.listarModulo = res;
  });}

  public listarporidEstado() {
    this.idEstado = this.estado;
    console.log(this.idEstado)
    this.servicioEstado.listarPorId(this.idEstado).subscribe(res => {
      this.listarEstadosModulo = res;
      this.formEstado.controls['id'].setValue(this.listarEstadosModulo.id);
      this.formEstado.controls['descripcion'].setValue(this.listarEstadosModulo.descripcion);
      this.formEstado.controls['modulo'].setValue(this.listarEstadosModulo.idModulo.id);
    });
  }

  public guardar() {
    let esta : Estado = new Estado();
    esta.id=Number(this.estado);
    esta.descripcion=this.formEstado.controls['descripcion'].value;
    const idModulo = this.formEstado.controls['modulo'].value;
    this.servicioEstado.listarPorId(idModulo).subscribe(res => {
      this.listarModulo = res;
      esta.idModulo= this.listarModulo

      if(esta.descripcion==null || esta.descripcion=="" || esta.id==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.actualizarEstado(esta);
      }
    })
  }

  public actualizarEstado(esta: Estado) {
    this.servicioEstado.actualizar(esta).subscribe(res => {
      console.log("Rol actualizado")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado modificado!',
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
