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
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formEstado = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      observacion: ['',Validators.required],
    });
  }

  public listaModulo() {
    this.servicioModulo.listarTodos().subscribe(res => {
      this.listarModulo = res;
  });}

  public listarporidEstado() {
    this.idEstado = this.estado;
    this.servicioEstado.listarPorId(this.idEstado).subscribe(res => {
      this.listarEstadosModulo = res;
      this.formEstado.controls['id'].setValue(this.listarEstadosModulo.id);
      this.formEstado.controls['descripcion'].setValue(this.listarEstadosModulo.descripcion);
      this.formEstado.controls['observacion'].setValue(this.listarEstadosModulo.observacion);
      this.formEstado.controls['modulo'].setValue(this.listarEstadosModulo.idModulo.id);
    });
  }

  public guardar() {
    let esta : Estado = new Estado();
    esta.id=Number(this.estado);
    esta.descripcion=this.formEstado.controls['descripcion'].value;
    esta.observacion=this.formEstado.controls['observacion'].value;
    this.servicioEstado.listarPorId(esta.id).subscribe(res=>{
      esta.idModulo = res.idModulo
      if(esta.descripcion == res.descripcion && esta.observacion == res.observacion){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No hubo modificacion!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(esta.descripcion == "" || esta.descripcion==null || esta.id == null || esta.id == undefined){
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
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
