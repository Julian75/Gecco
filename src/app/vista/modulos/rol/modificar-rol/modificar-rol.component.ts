import { EstadoService } from './../../../../servicios/estado.service';
import { Estado } from './../../../../modelos/estado';
import { RolService } from './../../../../servicios/rol.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rol } from './../../../../modelos/rol';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.component.html',
  styleUrls: ['./modificar-rol.component.css']
})
export class ModificarRolComponent implements OnInit {
  public formRol!: FormGroup;
  public idRol : any;
  public listarRol : any = [];
  public listarEstado : any = [];
  color = ('primary');

  constructor(
    private servicioRol: RolService,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<ModificarRolComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidRol();
    this.listaEstado();
  }

  private crearFormulario() {
    this.formRol = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      this.listarEstado = res;
  });}

  public listarporidRol() {
    this.idRol = this.data;
    this.servicioRol.listarPorId(this.idRol).subscribe(res => {
      this.listarRol = res;
      this.formRol.controls['id'].setValue(this.listarRol.id);
      this.formRol.controls['descripcion'].setValue(this.listarRol.descripcion);
      this.formRol.controls['estado'].setValue(this.listarRol.idEstado.id);
    })
  }

  public guardar() {
    let rol : Rol = new Rol();
    rol.id=Number(this.data);
    rol.descripcion=this.formRol.controls['descripcion'].value;
    const idEstado = this.formRol.controls['estado'].value;
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listarEstado = res;
      rol.idEstado= this.listarEstado

      if(rol.descripcion==null || rol.descripcion=="" || rol.idEstado==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.actualizarRol(rol);
      }
    })
  }

  public actualizarRol(rol: Rol) {
    this.servicioRol.actualizar(rol).subscribe(res => {
      console.log("Rol actualizado")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Rol modificado!',
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
