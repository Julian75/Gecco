import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';

@Component({
  selector: 'app-modificar-asignacion-usuario-pqr',
  templateUrl: './modificar-asignacion-usuario-pqr.component.html',
  styleUrls: ['./modificar-asignacion-usuario-pqr.component.css']
})
export class ModificarAsignacionUsuarioPqrComponent implements OnInit {
  public formUsuarioPqr!: FormGroup;
  color = ('primary');
  public listarUsuario: any = []
  constructor(
    public dialogRef: MatDialogRef<ModificarAsignacionUsuarioPqrComponent>,
    private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit() {
    this.crearFormulario()
    this.listarUsuarios()
    this.listarPorIdUsuario()
  }

  public guardar(){
    if(this.formUsuarioPqr.valid){
      this.servicioUsuarioPqr.listarPorId(Number(this.data)).subscribe(
        (res) => {
          if (this.formUsuarioPqr.value.area == res.area && this.formUsuarioPqr.value.idUsuario == res.idUsuario.id) {
            this.formUsuarioPqr.value.idUsuario = res.idUsuario
            this.servicioUsuarioPqr.actualizar(this.formUsuarioPqr.value).subscribe(
              (res) => {
                Swal.fire({
                  icon: 'success',
                  title: 'No hubieron cambios, pero se modificó correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dialogRef.close();
                window.location.reload();
              },
              (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo salió mal!',
                })
              }
            );
          } else {
            this.servicioUsuario.listarPorId(Number(this.formUsuarioPqr.value.idUsuario)).subscribe( resUsu=>{
              this.formUsuarioPqr.value.idUsuario = resUsu
              console.log(this.formUsuarioPqr.value);
              this.servicioUsuarioPqr.actualizar(this.formUsuarioPqr.value).subscribe(
                (res) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Asignación de usuario actualizada',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.dialogRef.close();
                  window.location.reload();
                },
                (err) => {
                  console.log(err);
                }
              );
            })
          }
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Debe llenar todos los campos',
      })
    }

  }

  private crearFormulario() {
    this.formUsuarioPqr = this.fb.group({
      id: [''],
      area: [null,Validators.required],
      idUsuario: [null,Validators.required],
    });
  }

  public listarUsuarios() {
    this.servicioUsuario.listarTodos().subscribe(
      (res) => {
        this.listarUsuario = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public listarPorIdUsuario(){
    this.servicioUsuarioPqr.listarPorId(Number(this.data)).subscribe(
      (res) => {
        this.formUsuarioPqr.setValue({
          id: res.id,
          area: res.area,
          idUsuario: res.idUsuario.id ,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
