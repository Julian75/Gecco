import { AreaService } from './../../../../servicios/area.service';
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
  public listaAreas:any = [];
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAsignacionUsuarioPqrComponent>,
    private router: Router,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
    private servicioUsuario: UsuarioService,
    private servicioArea: AreaService,
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarAreas();
  }

  public crearFormulario(){
    this.formUsuarioPqr = this.fb.group({
      idArea: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });
  }

  public listarAreas() {
    this.servicioArea.listarTodos().subscribe(resAreas=>{
      this.listaAreas = resAreas
      console.log(this.listaAreas)
    })
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

  existeUs: boolean = false
  listaUsuaExis: any = []
  public guardar(){
    this.listaUsuaExis = []
    console.log(this.formUsuarioPqr.value.idUsuario)
    console.log(this.formUsuarioPqr.value.idArea)
    if (this.formUsuarioPqr.valid) {
      this.servicioUsuario.listarPorId(Number(this.formUsuarioPqr.value.idUsuario)).subscribe(res=>{
        this.formUsuarioPqr.value.idUsuario = res
        this.servicioArea.listarPorId(Number(this.formUsuarioPqr.value.idArea)).subscribe(resArea=>{
          this.formUsuarioPqr.value.idArea = resArea
          this.servicioUsuarioPqr.listarTodos().subscribe(resUsuariosPQRS=>{
            resUsuariosPQRS.forEach(elementUsuPQRS => {
              if(this.formUsuarioPqr.value.idUsuario.id == elementUsuPQRS.idUsuario.id){
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
            }
          })
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
