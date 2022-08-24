import { AreaService } from './../../../../servicios/area.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-asignacion-usuario-pqr',
  templateUrl: './modificar-asignacion-usuario-pqr.component.html',
  styleUrls: ['./modificar-asignacion-usuario-pqr.component.css']
})
export class ModificarAsignacionUsuarioPqrComponent implements OnInit {
  public formUsuarioPqr!: FormGroup;
  color = ('primary');
  public listarUsuario: any = []
  public listaAreas: any = []
  constructor(
    public dialogRef: MatDialogRef<ModificarAsignacionUsuarioPqrComponent>,
    private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private servicioModificar: ModificarService,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
    private servicioArea: AreaService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarPorIdUsuario();
    this.listarAreas();
  }

  existeUs: boolean = false
  listaUsuaExis: any = []
  public guardar(){
    this.listaUsuaExis = []
    if(this.formUsuarioPqr.valid){
      this.servicioUsuarioPqr.listarPorId(Number(this.data)).subscribe(
        (res) => {
          if (this.formUsuarioPqr.value.idArea == res.idArea.id && this.formUsuarioPqr.value.idUsuario == res.idUsuario.id) {
            this.formUsuarioPqr.value.idUsuario = res.idUsuario.id
            this.servicioModificar.actualizarAsignacionUsuariosPQRS(this.formUsuarioPqr.value).subscribe(
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
              this.formUsuarioPqr.value.idUsuario = resUsu.id
              this.servicioArea.listarPorId(Number(this.formUsuarioPqr.value.idArea)).subscribe(resArea=>{
                this.formUsuarioPqr.value.idArea = resArea.id
                this.servicioUsuarioPqr.listarTodos().subscribe(resUsuariosPQRS=>{
                  resUsuariosPQRS.forEach(elementUsuPQRS => {
                    if(this.formUsuarioPqr.value.idArea == elementUsuPQRS.idArea.id  && this.formUsuarioPqr.value.idUsuario == elementUsuPQRS.idUsuario.id){
                      this.existeUs = true
                    }else{
                      this.existeUs = false
                    }
                    this.listaUsuaExis.push(this.existeUs)
                  });
                  const existe = this.listaUsuaExis.includes( true );
                  if(existe == true){
                    Swal.fire({
                      icon: 'error',
                      title: 'Esa asignación ya existe!',
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }else{
                    this.servicioModificar.actualizarAsignacionUsuariosPQRS(this.formUsuarioPqr.value).subscribe(
                      (res: any) => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Se modifico la asignación!',
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
                  }
                })
              })
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
      idArea: [null,Validators.required],
      idUsuario: [null,Validators.required],
    });
  }

  public listarAreas() {
    this.servicioArea.listarTodos().subscribe(resAreas=>{
      this.listaAreas = resAreas
    })
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
          idArea: res.idArea.id,
          idUsuario: res.idUsuario.id ,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
