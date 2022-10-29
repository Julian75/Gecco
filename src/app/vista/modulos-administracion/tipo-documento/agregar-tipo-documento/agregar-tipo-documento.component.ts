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
  public encontrados: any = [];
  public encontrado = false;
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
    this.encontrados = [];
    let tipoDocumento : TipoDocumento = new TipoDocumento();
    const idEstado = this.formTipoDocumento.controls['estado'].value;
    if(this.formTipoDocumento.valid){
      tipoDocumento.descripcion=this.formTipoDocumento.controls['descripcion'].value;
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        this.listarEstado = res;
        tipoDocumento.idEstado= this.listarEstado
        this.servicioTipoDocumento.listarTodos().subscribe(resTipoDocumento => {
          resTipoDocumento.forEach(element => {
            if(element.descripcion.toLowerCase() == this.formTipoDocumento.value.descripcion.toLowerCase()){
              this.encontrado = true;
            }else{
              this.encontrado = false;
            }
            this.encontrados.push(this.encontrado);
          })
          const existe = this.encontrados.includes(true);
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'El tipo de documento ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.registrarTipoDocumento(tipoDocumento);
          }
        });
      })
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

  public registrarTipoDocumento(tipoDocumento: TipoDocumento) {
    this.servicioTipoDocumento.registrar(tipoDocumento).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Documento Registrado!',
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
