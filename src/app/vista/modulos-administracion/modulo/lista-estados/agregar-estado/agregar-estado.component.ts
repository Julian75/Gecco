import { ModuloService } from 'src/app/servicios/modulo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estado } from 'src/app/modelos/estado';
@Component({
  selector: 'app-agregar-estado',
  templateUrl: './agregar-estado.component.html',
  styleUrls: ['./agregar-estado.component.css']
})
export class AgregarEstadoComponent implements OnInit {
  public formEstado!: FormGroup;
  public listarEstado: any = [];
  public listarEstadosModulo: any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioModulo: ModuloService,
    public dialogRef: MatDialogRef<AgregarEstadoComponent>,
    private servicioEstado : EstadoService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public idModulo: MatDialog,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formEstado = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      observacion: ['',Validators.required],
    });
  }

  public guardar() {
    let estado : Estado = new Estado();
    estado.descripcion=this.formEstado.controls['descripcion'].value;
    estado.observacion = this.formEstado.controls['observacion'].value;
    const idModulo = Number(this.idModulo)
    this.servicioModulo.listarPorId(idModulo).subscribe(res=>{
      estado.idModulo = res
      if(estado.descripcion==null || estado.descripcion=="" || estado.idModulo==undefined || estado.idModulo==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.registrarEstado(estado);
      }
    })
  }

  public registrarEstado(estado: Estado) {
    this.servicioEstado.registrar(estado).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();

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
