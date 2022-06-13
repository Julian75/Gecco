import { EstadoService } from './../../../../servicios/estado.service';
import { Rol } from './../../../../modelos/rol';
import { Estado } from './../../../../modelos/estado';
import { RolService } from './../../../../servicios/rol.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {
  public formRol!: FormGroup;
  public listarEstado: any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRolComponent>,
    private servicioRol: RolService,
    private servicioEstado : EstadoService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
  }

  private crearFormulario() {
    this.formRol = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      this.listarEstado = res;
  });}

  public guardar() {
    let rol : Rol = new Rol();
    rol.descripcion=this.formRol.controls['descripcion'].value;
    const idEstado = this.formRol.controls['estado'].value;
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listarEstado = res;
      rol.idEstado= this.listarEstado
      if(rol.descripcion==null || rol.descripcion==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.registrarRol(rol);
      }
    })

  }

  public registrarRol(rol: Rol) {
    this.servicioRol.registrar(rol).subscribe(res=>{
      console.log(rol)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modulo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();

    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
