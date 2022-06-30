import { TipoDocumento } from './../../../../modelos/tipoDocumento';
import { Component, OnInit } from '@angular/core';
import { EstadoService } from './../../../../servicios/estado.service';
import { Estado } from './../../../../modelos/estado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tipo-documento',
  templateUrl: './agregar-tipo-documento.component.html',
  styleUrls: ['./agregar-tipo-documento.component.css']
})
export class AgregarTipoDocumentoComponent implements OnInit {
  public formTipoDocumento!: FormGroup;
  public listarEstado: any = [];
  public estadosDisponibles:any = [];
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTipoDocumentoComponent>,
    private servicioEstado : EstadoService,
    private servicioTipoDocumento: TipoDocumentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      // this.listarEstado = res;
      res.forEach(element => {
        if(element.idModulo.id == 4){
          this.estadosDisponibles.push(element)
          console.log(this.estadosDisponibles)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  private crearFormulario() {
    this.formTipoDocumento = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required]
    });
  }

  public guardar() {
    let tipoDocumento : TipoDocumento = new TipoDocumento();
    tipoDocumento.descripcion=this.formTipoDocumento.controls['descripcion'].value;
    const idEstado = this.formTipoDocumento.controls['estado'].value;
    console.log(idEstado)
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listarEstado = res;
      tipoDocumento.idEstado= this.listarEstado
      if(tipoDocumento.descripcion==null || tipoDocumento.descripcion==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.registrarTipoDocumento(tipoDocumento);
      }
    })
  }

  public registrarTipoDocumento(tipoDocumento: TipoDocumento) {
    this.servicioTipoDocumento.registrar(tipoDocumento).subscribe(res=>{
      console.log(tipoDocumento)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Documento Registrado!',
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
