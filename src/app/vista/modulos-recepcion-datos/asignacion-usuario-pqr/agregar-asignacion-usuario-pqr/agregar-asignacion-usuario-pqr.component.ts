import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agregar-asignacion-usuario-pqr',
  templateUrl: './agregar-asignacion-usuario-pqr.component.html',
  styleUrls: ['./agregar-asignacion-usuario-pqr.component.css']
})
export class AgregarAsignacionUsuarioPqrComponent implements OnInit {
  public formUsuarioPqr !: FormGroup;
  public listarUsuario: any = [];
  public estadosDisponibles:any = [];
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAsignacionUsuarioPqrComponent>,
    private router: Router,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
    private servicioUsuario: UsuarioService,
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.listarUsuarios();
  }

  public crearFormulario(){
    this.formUsuarioPqr = this.fb.group({
      area: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });
  }

  public listarUsuarios(){
    this.servicioUsuario.listarTodos().subscribe(
      (res: any) => {
        this.listarUsuario = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public guardar(){
    if (this.formUsuarioPqr.valid) {
      this.servicioUsuario.listarPorId(Number(this.formUsuarioPqr.value.idUsuario)).subscribe(res=>{
        this.formUsuarioPqr.value.idUsuario = res
        console.log(this.formUsuarioPqr.value)
        this.servicioUsuarioPqr.registrar(this.formUsuarioPqr.value).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario asignado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload()
          },
          (err: any) => {
            console.log(err);
          }
        );
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor diligencie todos los campos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
