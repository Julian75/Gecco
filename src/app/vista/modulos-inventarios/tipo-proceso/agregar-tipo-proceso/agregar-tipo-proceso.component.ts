import { TipoProcesoService } from './../../../../servicios/tipoProceso.service';
import { TipoProceso } from './../../../../modelos/tipoProceso';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-proceso',
  templateUrl: './agregar-tipo-proceso.component.html',
  styleUrls: ['./agregar-tipo-proceso.component.css']
})
export class AgregarTipoProcesoComponent implements OnInit {
  public formTipoProceso!: FormGroup;
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTipoProcesoComponent>,
    private servicioTipoProceso: TipoProcesoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTipoProceso = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required]
    });
  }


  public guardar() {
    this.encontrados = [];
    let tipoProceso : TipoProceso = new TipoProceso();
    if(this.formTipoProceso.valid){
      document.getElementById("snipper").setAttribute("style", "display: block;")
      tipoProceso.descripcion=this.formTipoProceso.controls['descripcion'].value;
      this.servicioTipoProceso.listarTodos().subscribe(resTipoProceso => {
        resTipoProceso.forEach(element => {
          if(element.descripcion.toLowerCase() == this.formTipoProceso.value.descripcion.toLowerCase()){
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
            title: 'El tipo de proceso ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.registrarTipoProceso(tipoProceso);
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

  public registrarTipoProceso(tipoProceso: TipoProceso) {
    this.servicioTipoProceso.registrar(tipoProceso).subscribe(res=>{
      document.getElementById("snipper").setAttribute("style", "display: none;")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Proceso Registrado!',
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
