import { TipoActivo } from './../../../../../modelos/tipoActivo';
import { Router } from '@angular/router';
import { TipoActivoService } from './../../../../../servicios/tipoActivo.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-activo',
  templateUrl: './agregar-tipo-activo.component.html',
  styleUrls: ['./agregar-tipo-activo.component.css']
})
export class AgregarTipoActivoComponent implements OnInit {
  public formTipoActivo!: FormGroup;
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTipoActivoComponent>,
    private servicioTipoActivo: TipoActivoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTipoActivo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required]
    });
  }


  public guardar() {
    this.encontrados = [];
    let tipoActivo : TipoActivo = new TipoActivo();
    if(this.formTipoActivo.valid){
      document.getElementById("snipper").setAttribute("style", "display: block;")
      tipoActivo.descripcion=this.formTipoActivo.controls['descripcion'].value;
      this.servicioTipoActivo.listarTodos().subscribe(resTipoProceso => {
        resTipoProceso.forEach(element => {
          if(element.descripcion.toLowerCase() == this.formTipoActivo.value.descripcion.toLowerCase()){
            this.encontrado = true;
          }else{
            this.encontrado = false;
          }
          this.encontrados.push(this.encontrado);
        })
        const existe = this.encontrados.includes(true);
        if(existe == true){
          document.getElementById("snipper").setAttribute("style", "display: none;")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El tipo de activo ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.registrarTipoActivo(tipoActivo);
        }
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarTipoActivo(tipoActivo: TipoActivo) {
    this.servicioTipoActivo.registrar(tipoActivo).subscribe(res=>{
      document.getElementById("snipper").setAttribute("style", "display: none;")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Activo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      document.getElementById("snipper").setAttribute("style", "display: none;")
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
