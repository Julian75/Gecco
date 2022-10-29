import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-asignar-proceso-usuario',
  templateUrl: './agregar-asignar-proceso-usuario.component.html',
  styleUrls: ['./agregar-asignar-proceso-usuario.component.css']
})
export class AgregarAsignarProcesoUsuarioComponent implements OnInit {
  public formAsignacionProcesoUsuario!: FormGroup;
  public listaUsuarios: any = [];
  public listaProceso: any = [];
  public validar:any = [];
  color = ('primary');
  constructor(
    private serviceUsuario: UsuarioService,
    private serviceTipoProceso: TipoProcesoService,
    private serviceAsignacionProcesoUsuario: AsignacionProcesoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarTipoProcesos();
  }

  private crearFormulario() {
    this.formAsignacionProcesoUsuario = this.formBuilder.group({
      idUsuario: ['', Validators.required],
      idTiposProcesos: ['', Validators.required],
    });
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
  iguales =false
  public guardar(){
    document.getElementById("snipper").setAttribute("style", "display: block;")
    this.validar = [];
    if(this.formAsignacionProcesoUsuario.valid){
      this.serviceUsuario.listarPorId(this.formAsignacionProcesoUsuario.value.idUsuario).subscribe( data => {
        this.formAsignacionProcesoUsuario.value.idUsuario = data;
        this.serviceTipoProceso.listarPorId(this.formAsignacionProcesoUsuario.value.idTiposProcesos).subscribe( data => {
          this.formAsignacionProcesoUsuario.value.idTiposProcesos = data;
          this.serviceAsignacionProcesoUsuario.listarTodos().subscribe( data => {
            data.forEach((element: any) => {
              if(element.idUsuario.id == this.formAsignacionProcesoUsuario.value.idUsuario.id ){
                this.iguales = true;
              }else{
                this.iguales = false;
              }
              this.validar.push(this.iguales);
            })
            const validar = this.validar.find((element: any) => element == true);
            if(validar == true){
              Swal.fire({
                icon: 'error',
                title: 'El usuario ya tiene asignado esta asignación!',
                showConfirmButton: false,
                timer: 1500
              })
              document.getElementById("snipper").setAttribute("style", "display: none;")
            }else{
              this.serviceAsignacionProcesoUsuario.registrar(this.formAsignacionProcesoUsuario.value).subscribe( data => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Asignación de proceso a usuario guardada correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })
                document.getElementById("snipper").setAttribute("style", "display: none;")
                window.location.reload();
              })
            }
          })
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;")
    }

  }

}

