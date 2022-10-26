import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-asignar-proceso-usuario',
  templateUrl: './modificar-asignar-proceso-usuario.component.html',
  styleUrls: ['./modificar-asignar-proceso-usuario.component.css']
})
export class ModificarAsignarProcesoUsuarioComponent implements OnInit {
  public formAsignacionProcesoUsuario!: FormGroup;
  public listaUsuarios: any = []
  public listaProceso: any = []
  public id: any;
  public idTipoProceso: any;
  constructor(
    private serviceUsuario: UsuarioService,
    private serviceTipoProceso: TipoProcesoService,
    private serviceAsignacionProcesoUsuario: AsignacionProcesoService,
    private serviceModificar:ModificarService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarPorIdUsuariosYProceso();
    this.listarTipoProcesos();
  }

  private crearFormulario() {
    this.formAsignacionProcesoUsuario = this.fb.group({
      id: [this.data],
      idUsuario: ['', Validators.required],
      idTiposProcesos: ['', Validators.required],
    });
  }

  listadoProcesoUsuario: any = [];
  public listarPorIdUsuariosYProceso(){
    console.log(this.data);
    this.serviceAsignacionProcesoUsuario.listarPorId(Number(this.data)).subscribe( data => {
      console.log(data);
      this.formAsignacionProcesoUsuario.patchValue({
        idUsuario: data.idUsuario,
        idTiposProcesos: data.idTiposProcesos
      });
    })
  }
  public listarUsuarios(){
    this.serviceUsuario.listarTodos().subscribe( data => {
      this.listaUsuarios = data;
    })
  }

  public listarTipoProcesos(){
    this.serviceTipoProceso.listarTodos().subscribe( data => {
      this.listaProceso = data;
    })
  }
  public guardar(){
    document.getElementById("snipper").setAttribute("style", "display: block;")
    if(this.formAsignacionProcesoUsuario.valid){
      this.formAsignacionProcesoUsuario.value.idUsuario = Number(this.formAsignacionProcesoUsuario.value.idUsuario.id);
      this.serviceUsuario.listarPorId(this.formAsignacionProcesoUsuario.value.idUsuario).subscribe( usuario => {
        this.formAsignacionProcesoUsuario.value.idUsuario = usuario.id;
        this.formAsignacionProcesoUsuario.value.idTiposProcesos = Number(this.formAsignacionProcesoUsuario.value.idTiposProcesos.id);
        this.serviceTipoProceso.listarPorId(this.formAsignacionProcesoUsuario.value.idTiposProcesos).subscribe( TipoProceso => {
          this.formAsignacionProcesoUsuario.value.idTiposProcesos = TipoProceso.id;
          this.serviceAsignacionProcesoUsuario.listarPorId(Number(this.data)).subscribe( asignacion => {
            if( this.formAsignacionProcesoUsuario.value.idUsuario == asignacion.idUsuario.id && this.formAsignacionProcesoUsuario.value.idTiposProcesos == asignacion.idTiposProcesos.id){
              console.log(this.formAsignacionProcesoUsuario.value);
              Swal.fire({
                icon: 'success',
                text: 'No hubieron cambios',
                showConfirmButton: false,
                timer: 1500
              })
              document.getElementById("snipper").setAttribute("style", "display: none;")
              window.location.reload();
              console.log("No hubieron cambios");
            }else{
                this.serviceAsignacionProcesoUsuario.listarTodos().subscribe( data => {
                  this.listadoProcesoUsuario = data;
                  let contador = 0;
                  for(let i = 0; i < this.listadoProcesoUsuario.length; i++){
                    if(this.listadoProcesoUsuario[i].idUsuario.id == this.formAsignacionProcesoUsuario.value.idUsuario ){
                      contador++;
                    }
                  }
                if(contador == 0){
                  console.log(this.formAsignacionProcesoUsuario.value);
                  this.serviceModificar.actualizarAsignacionProceso(this.formAsignacionProcesoUsuario.value).subscribe( data => {
                    Swal.fire({
                      icon: 'success',
                      text: 'Se modificó correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    document.getElementById("snipper").setAttribute("style", "display: none;")
                    window.location.reload();
                  })
                }else{
                  Swal.fire({
                    icon: 'error',
                    text: 'Ya existe un proceso asignado a este usuario',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  document.getElementById("snipper").setAttribute("style", "display: none;")
                }
              })
            }
          })
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        text: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;")
    }
  }

  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }
}
